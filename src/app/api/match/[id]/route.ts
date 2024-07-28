import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createServerSentEvent } from "@/app/utils/server-push.utils";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const match = await prisma.match.findUnique({
    where: { id: Number(id) },
  });

  if (match) {
    const parsedMatch = {
      ...match,
      matchData: match.matchData ? JSON.parse(match.matchData) : null,
    };
    return NextResponse.json(parsedMatch);
  } else {
    return NextResponse.json({ error: "Match not found" }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await request.json();

  try {
    const updatedMatch = await prisma.match.update({
      where: { id: Number(id) },
      data: {
        startTime: data.startTime ? new Date(data.startTime) : undefined,
        endTime: data.endTime ? new Date(data.endTime) : undefined,
        isStarted: data.isStarted ?? undefined,
        isEnd: data.isEnd ?? undefined,
        matchData: data.matchData ? JSON.stringify(data.matchData) : undefined,
      },
    });

    const parsedUpdatedMatch = {
      ...updatedMatch,
      matchData: updatedMatch.matchData
        ? JSON.parse(updatedMatch.matchData)
        : null,
    };
    // Send event using socket io
    // const io = global.io;
    // // Emit event via Socket.IO
    // if (io) {
    //   io.emit("match-updated", parsedUpdatedMatch);
    // }

    // Send SSE to notify clients about the update
    // const event = {
    //   type: "match_update",
    //   data: parsedUpdatedMatch,
    // };
    // createServerSentEvent(event);

    return NextResponse.json(parsedUpdatedMatch);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string }; res: any }
) {
  const { id } = params;

  try {
    await prisma.match.delete({
      where: { id: Number(id) },
    });

    // Send event using socket io 
    // const io = global.io;
    // // Emit event via Socket.IO
    // if (io) {
    //   io.emit("match-deleted", { id: Number(id) });
    // }

    // Send SSE to notify clients about the deletion
    // const event = {
    //   type: "match_delete",
    //   id: Number(id),
    // };
    // createServerSentEvent(event);

    return NextResponse.json({ message: "Match deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
