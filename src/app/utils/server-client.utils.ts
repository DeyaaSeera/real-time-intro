import { NextApiResponse } from 'next';

interface Client {
  res: NextApiResponse;
}

export const clients = new Set<Client>();

export const addClient = (client: Client) => {
  clients.add(client);
};

export const removeClient = (client: Client) => {
  clients.delete(client);
};