import response from '../utils/response.js';
import { ClientError } from '../exceptions/index.js';
 
const ErrorHandler = (err, req, res, next) => {
  // Handle ClientError and its subclasses (InvariantError, NotFoundError)
  if (err instanceof ClientError) {
    return response(res, err.statusCode, err.message, null);
  }
  // Handle Joi validation errors
  if (err.isJoi) {
    return response(res, 400, err.details[0].message, null);
  }
  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';
  console.error('Unhandled error:', err);
  return response(res, status, message, null);
};
 
export default ErrorHandler;

//Jika error merupakan turunan ClientError, akan dikembalikan status dan pesan sesuai error tersebut. Selain itu, sistem akan menggunakan status code yang tersedia atau default-nya 500 dengan pesan “Internal Server Error”, sekaligus mencatat detail error di console untuk debugging.