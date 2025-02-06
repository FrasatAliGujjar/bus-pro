import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

// ===========================================================================

// POST API--
export async function POST(req) {

    const { Bid } = await req.json();

    const SeatData = await prisma.busSeats.create({
        data: {
            Bid,
        },
    });

    return NextResponse.json(SeatData, { status: 201 });

}


// ======================= DELETE  =======================
export async function DELETE(request) {

    const { id } = await request.json();

    await prisma.busSeats.delete({
        where: { Bid: id },
    });

    return NextResponse.json(
        { message: "Bus deleted successfully" },
        { status: 200 }
    );

}

// ======================= UPDATE  =======================


export async function PATCH(request) {
    try {
        const { slugBusId, falseSeats } = await request.json();


        const updatedUser = await prisma.busSeats.update({
            where: { Bid: slugBusId },
            data: falseSeats,
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update user", details: error.message },
            { status: 500 }
        );
    }
}

// ===========================================================================
