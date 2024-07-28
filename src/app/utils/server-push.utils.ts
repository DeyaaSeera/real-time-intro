import { clients } from "./server-client.utils"; // Import the set of clients

export interface ServerSentEvent {
  type: string;
  data?: any;
  id?: number;
}

export const createServerSentEvent = (event: ServerSentEvent) => {
  const eventData = `data: ${JSON.stringify(event)}\n\n`;
  const encoder = new TextEncoder();

  clients.forEach((writer) => {
    writer.write(encoder.encode(eventData));
  });
};
