import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";



// ===========================================================================

// Get Api
export async function GET() {
    try {
        const data = await prisma.bus.findMany()
        return NextResponse.json(data)
    } catch (error) {
        // -------------------------------------------------
        return NextResponse.json(
            { error: 'Failed to fetch users', details: error.message },
            { status: 500 }
        )
    }
}


// ===============================================================================
// POST API--
export async function POST(req) {

    try {
        const {
            Bid,
            busname,
            busNo,
            busFare,
            dprtrCity,
            arvlCity,
            dprtrTme,
            img_url

        } = await req.json();

        const busData = await prisma.bus.create({
            data: {
                Bid,
                busname,
                busNo,
                busFare,
                dprtrCity,
                arvlCity,
                dprtrTme,
                img_url

            },
        });

        return NextResponse.json(busData, { status: 201 });
    } catch (error) {
        // Log error internally for server-side tracking, without exposing details
        console.error("Error adding Bus:", error);

        return NextResponse.json(
            { error: "Failed to add Bus. Please try again later." },
            { status: 500 }
        );
    }
}
// _______________________________________________________________________________


// ======================= DELETE  =======================
export async function DELETE(request) {

    const { id } = await request.json();

    await prisma.bus.delete({
        where: { Bid: id },
    });

    return NextResponse.json(
        { message: "User deleted successfully" },
        { status: 200 }
    );

}

// ======================= UPDATE  =======================
export async function PATCH(request) {
    try {
        const {
            id,
            busname,
            busNo,
            busFare,
            dprtrCity,
            arvlCity,
            dprtrTme,
        } =
            await request.json();


        const updatedUser = await prisma.bus.update({
            where: { Bid: id },

            data: {
                busname,
                busNo,
                busFare,
                dprtrCity,
                arvlCity,
                dprtrTme,
            },
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update user", details: error.message },
            { status: 500 }
        );
    }
}
