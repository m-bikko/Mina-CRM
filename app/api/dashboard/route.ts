import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Product from "@/models/Product";
import Sale from "@/models/Sale";
import InventoryBatch from "@/models/InventoryBatch";
import FinancialStats from "@/models/FinancialStats";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "week";

    const financialStats = await FinancialStats.findOne();
    const balance = financialStats?.currentBalance || 0;

    const taxPayableResult = await Sale.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$taxAmount" },
        },
      },
    ]);
    const taxPayable = taxPayableResult[0]?.total || 0;

    // Стоимость товаров на складе по себестоимости (из партий)
    const inventoryCostResult = await InventoryBatch.aggregate([
      {
        $match: { remainingQuantity: { $gt: 0 } },
      },
      {
        $project: {
          value: {
            $multiply: ["$remainingQuantity", "$costPrice"],
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$value" },
        },
      },
    ]);
    const inventoryCost = inventoryCostResult[0]?.total || 0;

    // Стоимость товаров на складе по ценам продажи (для UI)
    const products = await Product.find({ isActive: true });
    let inventoryValue = 0;

    products.forEach((product) => {
      product.sizes.forEach((size) => {
        inventoryValue += product.price * size.quantity;
      });
    });

    // ПРАВИЛЬНЫЙ расчет капитала
    // Капитал = Баланс + Стоимость товаров на складе (по себестоимости)
    const capital = balance + inventoryCost;

    const daysAgo = period === "week" ? 7 : 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);
    startDate.setHours(0, 0, 0, 0);

    const salesChartRaw = await Sale.aggregate([
      {
        $match: {
          date: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
          total: { $sum: "$totalAmount" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Преобразуем в формат, ожидаемый фронтендом
    const salesChart = salesChartRaw.map((item) => ({
      date: item._id,
      amount: item.total,
    }));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const salesTodayResult = await Sale.aggregate([
      {
        $match: {
          date: { $gte: today },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const salesToday = {
      count: salesTodayResult[0]?.count || 0,
      amount: salesTodayResult[0]?.total || 0,
    };

    // Общая прибыль (сумма продаж - себестоимость - налог - комиссия банка)
    const profitResult = await Sale.aggregate([
      {
        $project: {
          profit: {
            $subtract: [
              "$totalAmount",
              {
                $add: [
                  { $ifNull: ["$totalCostPrice", 0] },
                  { $ifNull: ["$taxAmount", 0] },
                  { $ifNull: ["$bankCommissionAmount", 0] },
                ],
              },
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$profit" },
        },
      },
    ]);
    const totalProfit = profitResult[0]?.total || 0;

    return NextResponse.json({
      success: true,
      data: {
        balance,
        capital,
        taxPayable,
        salesChart,
        salesToday,
        inventoryValue,
        inventoryCost,
        totalProfit,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
