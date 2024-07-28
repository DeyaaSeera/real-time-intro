export const clients = new Set<WritableStreamDefaultWriter>();

export const addClient = (writer: WritableStreamDefaultWriter) => {
  clients.add(writer);
};

export const removeClient = (writer: WritableStreamDefaultWriter) => {
  clients.delete(writer);
};
