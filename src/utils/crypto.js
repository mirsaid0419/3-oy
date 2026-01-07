import { hash, compare } from "bcryptjs";
class Crypto {
  async encrypt(data) {
    return await hash(data, 7);
  }
  async decrypt(data, encryptData) {
    return compare(data, encryptData);
  }
}
export default new Crypto();
