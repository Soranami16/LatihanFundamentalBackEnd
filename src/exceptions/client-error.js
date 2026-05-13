class ClientError extends Error {
  constructor(mesage, statusCode = 400) {
    super(message);
    this.name = 'ClientError';
    this.statusCode = statusCode;
  }
}

export default ClientError;