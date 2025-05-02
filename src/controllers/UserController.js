import User from '../models/User.js';

class UserController {
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      const { id, nome, email } = user
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['User doesn\'t exists.'],
        });
      }

      const editedUser = await user.update(req.body);
      const { id, nome, email } = editedUser;

      return res.json({ id, nome, email });
    } catch (e) {
      return res.json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['User doesn\'t exists.'],
        });
      }

      await user.destroy();
      return res.json(null);
    } catch (e) {
      return res.json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
