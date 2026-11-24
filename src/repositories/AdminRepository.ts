import { Admin } from "../models/Admin";

export class AdminRepository {
  async findByEmail(email: string) {
    const admin = await Admin.findOne({ where: { email }, raw: true });
    return admin as any;
  }
}
