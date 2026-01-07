import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import PaymentType from "@/models/PaymentType";
import { paymentTypeSchema } from "@/lib/validations/paymentType";

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const paymentTypes = await PaymentType.find({ isActive: true }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ success: true, data: paymentTypes });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch payment types" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const body = await request.json();
    const validatedData = paymentTypeSchema.parse(body);

    const paymentType = await PaymentType.create(validatedData);

    return NextResponse.json(
      { success: true, data: paymentType },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create payment type" },
      { status: 500 }
    );
  }
}
