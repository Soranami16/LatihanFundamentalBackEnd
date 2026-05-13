export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  });
 
  if (error) return next(error);
  req.validated = value;
  next();
};

export const validateQuery = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
    convert: false // <--- WAJIB TAMBAHKAN INI
  });

  if (error) {
    // Jika ada error, kita kirim respon 400 secara manual di sini
    return res.status(400).json({
      code: 400,
      status: 'failed',
      message: error.details[0].message
    });
  }
  
  req.query = value;
  next();
};
 

// Middleware untuk memvalidasi req.body menggunakan Joi.
// Jika validasi gagal, error diteruskan ke error handler.
// Jika berhasil, data valid disimpan di req.validated.