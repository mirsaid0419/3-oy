import { compare, hash } from "bcrypt";

async function cript(data) {
  return await hash(`${data}`, 10);
}
async function testCript(data, hashdata) {
  return await compare(`${data}`, hashdata);
}
export { cript, testCript };
