import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import PageVisit from "@/models/PageVisit";

// POST - Record a new page visit
export async function POST(): Promise<NextResponse> {
    try {
        await connectDB();

        const visit = new PageVisit({
            timestamp: new Date(),
        });

        await visit.save();

        return NextResponse.json({
            success: true,
            data: { id: visit._id },
        });
    } catch (error) {
        console.error("Error recording page visit:", error);
        return NextResponse.json(
            { success: false, error: "Failed to record page visit" },
            { status: 500 }
        );
    }
}

// GET - Fetch page visit statistics
export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const period = searchParams.get("period") || "week";

        // Calculate start date based on period
        let daysAgo: number;
        switch (period) {
            case "month":
                daysAgo = 30;
                break;
            case "all":
                daysAgo = 365 * 10; // 10 years back
                break;
            case "week":
            default:
                daysAgo = 7;
                break;
        }

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - daysAgo);
        startDate.setHours(0, 0, 0, 0);

        // Aggregate visits by date
        const visitsRaw = await PageVisit.aggregate([
            {
                $match: {
                    timestamp: { $gte: startDate },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);

        // Transform to format expected by frontend
        const visitsData = visitsRaw.map((item) => ({
            date: item._id,
            count: item.count,
        }));

        // Calculate total visits
        const totalVisits = visitsData.reduce((sum, item) => sum + item.count, 0);

        return NextResponse.json({
            success: true,
            data: {
                visits: visitsData,
                totalVisits,
            },
        });
    } catch (error) {
        console.error("Error fetching page visits:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch page visits" },
            { status: 500 }
        );
    }
}
