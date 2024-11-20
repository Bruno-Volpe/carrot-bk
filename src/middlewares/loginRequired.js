import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = jwt.verify(token, "process.env.SECRET");
    const { id } = decoded;
    req.body.user_id = id;
    next();
  } catch (e) {
    return res.status(401).json({
      error: 'Please authenticate'
    });
  }
}