import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
import config from "../config/config.js";
async function hashed(data) {
  return sign(data, config.JWT_SECRET_KEY, {
    expiresIn: config.JWT_SECRET_TIME,
  });
}

async function openHash(data) {
  return verify(data,config.JWT_SECRET_KEY);
}

export { hashed, openHash };
