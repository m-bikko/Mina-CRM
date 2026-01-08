import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Sale from "@/models/Sale";
import PaymentType from "@/models/PaymentType";
import FinancialStats from "@/models/FinancialStats";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(
  request: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const sale = await Sale.findById(id);
    if (!sale) {
      return NextResponse.json(
        { success: false, error: "Sale not found" },
        { status: 404 }
      );
    }

    const {
      deliveryType,
      deliveryAddress,
      deliveryCharge,
      postalCost,
      deliveryPaymentTypeId,
    } = body;

    // Получаем предыдущие значения для перерасчёта
    const prevDeliveryBalanceAmount = sale.deliveryBalanceAmount || 0;
    const prevDeliveryTaxAmount = sale.deliveryTaxAmount || 0;
    const prevPostalCost = sale.postalCost || 0;

    // Обновляем базовые поля
    sale.deliveryStatus = "shipped";
    sale.deliveryType = deliveryType;
    sale.deliveryAddress = deliveryAddress;

    let newDeliveryBalanceAmount = 0;
    let newDeliveryTaxAmount = 0;
    let newDeliveryBankCommissionAmount = 0;
    let newPostalCost = 0;

    if (deliveryType === "postal") {
      // Почтовая доставка - нужно рассчитать финансы
      const paymentType = await PaymentType.findById(deliveryPaymentTypeId);
      if (!paymentType) {
        return NextResponse.json(
          { success: false, error: "Payment type not found" },
          { status: 400 }
        );
      }

      const charge = deliveryCharge || 2000;
      const postal = postalCost || 0;
      const taxRate = paymentType.taxRate || 0;
      const bankCommissionRate = paymentType.bankCommissionRate || 0;

      // Расчёт комиссии банка и налога
      const bankCommission = Math.round(charge * bankCommissionRate) / 100;
      const tax = Math.round(charge * taxRate) / 100;

      // В баланс: оплата клиента - комиссия банка - стоимость почты
      // Налог НЕ вычитается из баланса, только накапливается
      newDeliveryBalanceAmount = charge - bankCommission - postal;
      newDeliveryTaxAmount = tax;
      newDeliveryBankCommissionAmount = bankCommission;
      newPostalCost = postal;

      sale.deliveryCharge = charge;
      sale.postalCost = postal;
      sale.deliveryPaymentType = paymentType._id;
      sale.deliveryPaymentTypeName = paymentType.name;
      sale.deliveryTaxRateSnapshot = taxRate;
      sale.deliveryBankCommissionRateSnapshot = bankCommissionRate;
      sale.deliveryTaxAmount = newDeliveryTaxAmount;
      sale.deliveryBankCommissionAmount = newDeliveryBankCommissionAmount;
      sale.deliveryBalanceAmount = newDeliveryBalanceAmount;
    } else {
      // Местная доставка - бесплатная, без финансовых операций
      sale.deliveryCharge = undefined;
      sale.postalCost = undefined;
      sale.deliveryPaymentType = undefined;
      sale.deliveryPaymentTypeName = undefined;
      sale.deliveryTaxRateSnapshot = undefined;
      sale.deliveryBankCommissionRateSnapshot = undefined;
      sale.deliveryTaxAmount = undefined;
      sale.deliveryBankCommissionAmount = undefined;
      sale.deliveryBalanceAmount = undefined;
    }

    await sale.save();

    // Обновляем баланс в FinancialStats
    // Разница: новое значение - старое значение
    const balanceDiff = newDeliveryBalanceAmount - prevDeliveryBalanceAmount;

    if (balanceDiff !== 0) {
      const financialStats = await FinancialStats.findOne();
      if (financialStats) {
        financialStats.currentBalance += balanceDiff;
        await financialStats.save();
      }
    }

    return NextResponse.json({ success: true, data: sale });
  } catch (error) {
    console.error("Error updating delivery:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update delivery" },
      { status: 500 }
    );
  }
}

// Удаление доставки (возврат к статусу "не прикреплена")
export async function DELETE(
  request: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    await connectDB();
    const { id } = await params;

    const sale = await Sale.findById(id);
    if (!sale) {
      return NextResponse.json(
        { success: false, error: "Sale not found" },
        { status: 404 }
      );
    }

    // Откатываем финансовые операции если была почтовая доставка
    if (sale.deliveryType === "postal" && sale.deliveryBalanceAmount) {
      const financialStats = await FinancialStats.findOne();
      if (financialStats) {
        financialStats.currentBalance -= sale.deliveryBalanceAmount;
        await financialStats.save();
      }
    }

    // Сбрасываем все поля доставки
    sale.deliveryStatus = "not_attached";
    sale.deliveryType = undefined;
    sale.deliveryAddress = undefined;
    sale.deliveryCharge = undefined;
    sale.postalCost = undefined;
    sale.deliveryPaymentType = undefined;
    sale.deliveryPaymentTypeName = undefined;
    sale.deliveryTaxRateSnapshot = undefined;
    sale.deliveryBankCommissionRateSnapshot = undefined;
    sale.deliveryTaxAmount = undefined;
    sale.deliveryBankCommissionAmount = undefined;
    sale.deliveryBalanceAmount = undefined;

    await sale.save();

    return NextResponse.json({ success: true, data: sale });
  } catch (error) {
    console.error("Error removing delivery:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove delivery" },
      { status: 500 }
    );
  }
}
