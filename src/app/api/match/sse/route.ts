import { NextRequest, NextResponse } from "next/server";
import { addClient, removeClient } from "../../../utils/server-client.utils";

export async function GET(request: NextRequest) {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  addClient(writer);

  const encoder = new TextEncoder();

  writer.write(encoder.encode("retry: 10000\n\n"));

  request.signal.addEventListener("abort", () => {
    removeClient(writer);
    writer.close();
  });

  return new NextResponse(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
