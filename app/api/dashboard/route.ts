import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Product from "@/models/Product";
import Sale from "@/models/Sale";
import Supply from "@/models/Supply";
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

    // Стоимость товаров на складе по ценам продажи
    const products = await Product.find({ isActive: true });
    let inventoryValue = 0;

    products.forEach((product) => {
      product.sizes.forEach((size) => {
        inventoryValue += product.price * size.quantity;
      });
    });

    // Сумма затрат на закупы
    const supplyCostResult = await Supply.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalCost" },
        },
      },
    ]);
    const supplyCost = supplyCostResult[0]?.total || 0;

    // Капитал = Баланс + Потраченные деньги на закупы
    const capital = balance + supplyCost;

    const daysAgo = period === "week" ? 7 : 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);
    startDate.setHours(0, 0, 0, 0);

    const salesChart = await Sale.aggregate([
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
      total: salesTodayResult[0]?.total || 0,
    };

    return NextResponse.json({
      success: true,
      data: {
        balance,
        capital,
        taxPayable,
        salesChart,
        salesToday,
        inventoryValue,
        supplyCost,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
