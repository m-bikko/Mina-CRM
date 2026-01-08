import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Supply from "@/models/Supply";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    await connectDB();
    const { id } = await params;

    const supply = await Supply.findById(id);

    if (!supply) {
      return NextResponse.json(
        { success: false, error: "Supply not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: supply });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch supply" },
      { status: 500 }
    );
  }
}
