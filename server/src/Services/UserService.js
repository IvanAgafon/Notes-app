const { User } = require('../../db/models');
class UserService {
  static getAll() {
    return User.findAll({ attributes: { exclude: ['hashedPass'] } });
  }

  static getById(id) {
    return User.findByPk(id);
  }

  static async createUser(name, email, hashedPass) {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, hashedPass },
    });
    const userWithoutPass = created ? await this.getById(user.id) : user;
    return [userWithoutPass, created];
  }

  static updateUser(user, newValues) {
    const { name, hashedPass } = newValues;
    if (name) {
      if (hashedPass) {
        return user.update({ name, hashedPass });
      }
      return user.update({ name });
    }
    return user.update({ hashedPass });
  }

  static deleteUser(user) {
    return user.destroy();
  }
}

module.exports = UserService;
