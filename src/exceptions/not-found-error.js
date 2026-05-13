import ClientError from '../exceptions/client-error.js';
 
class NotFoundError extends ClientError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}
 
export default NotFoundError;

//NotFoundError juga mewarisi ClientError dan digunakan untuk kesalahan client khususnya ketika resource yang diminta tidak ditemukan.