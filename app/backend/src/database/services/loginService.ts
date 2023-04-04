import Users from '../models/Users';
import ILogin from '../Interfaces/ILogin';

export default class LoginService {
  public model;

  constructor() {
    this.model = Users;
  }

  public async verifyLogin(user : ILogin): Promise<ILogin | null> {
    const result = await this.model.findOne({ where: { email: user.email } });
    return result;
  }
}
