import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class TokenController {
  async create(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Missing credentials'],
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        errors: ['User doesn\'t exists.'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Invalid password.'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP_DATE,
    });

    return res.json({ token });
  }
}

export default new TokenController();
