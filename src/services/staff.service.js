import { Permision, Staff } from "../models/models.js";
import { cript, testCript } from "../utils/brypt.js";
import nodemailer from "nodemailer";
import { BadRequest, ConfliktError, NotFoundError } from "../utils/errors.js";
import { hashed } from "../utils/tokens.js";
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abduqulovMirsai0419@gmail.com",
    pass: "bogo zdlh ecfg wjtr",
  },
});
class StaffService {
  create = async (req) => {
    try {
      const password = await cript(req.body.password);
      const { branch, user_name, birth_date, gender, email, role } = req.body;
      const result = await Staff.create({
        branch,
        user_name,
        birth_date,
        gender,
        email,
        password,
        role,
      });
      await Permision.create({
        staff_id: result._id,
        permissionsModel: "Staffs",
        actions: { read: true },
      });
      await Permision.create({
        staff_id: result._id,
        permissionsModel: "Branches",
        actions:{read:true}
      });
      await Permision.create({
        staff_id: result._id,
        permissionsModel: "Transports",
        actions: { read: true },
      });
      await Permision.create({
        staff_id: result._id,
        permissionsModel: "Permissions",
        actions: { read: true },
      });
      const accesToken =await hashed({ id: result._id, role, user_name });
      return { status: 201, data: accesToken };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConfliktError("Bunday email yaratilgan");
      }
      throw error;
    }
  };
  getAll = async () => {
    try {
      const result = await Staff.find();
      return { status: 200, data: result };
    } catch (error) {
      throw error;
    }
  };
  getById = async (req) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new BadRequest("Id mavjud emas");
      }
      const result = await Staff.findById(id);
      if (!result) {
        throw new NotFoundError("Staff not found");
      }
      return { status: 200, data: result };
    } catch (error) {
      throw error;
    }
  };
  update = async (req) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new BadRequest("Id mavjud emas");
      }
      const result = await Staff.findByIdAndUpdate(id, req.body);
      if (!result) {
        throw new NotFoundError("Staff not found");
      }
      return { status: 200, data: result };
    } catch (error) {
      throw error;
    }
  };
  delete = async (req) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new BadRequest("Id mavjud emas");
      }
      const result = await Staff.findByIdAndDelete(id);
      if (!result) {
        throw new NotFoundError("Staff not found");
      }
      return { status: 200, data: "Staff success deleted" };
    } catch (error) {
      throw error;
    }
  };
  logIn = async (req) => {
    try {
      const { user_name, password } = req.body;
      const result = await Staff.findOne({ user_name });
      console.log(result)
      if (!result) {
        throw new BadRequest("User name or password error");
      }
      const existPass =await testCript(password, result.password);
      if (!existPass) {
        throw new BadRequest("User name or password error");
      }
      const accesToken =await hashed({ id: result._id, role:result.role, user_name });
      return { status: 200, data: accesToken };
    } catch (error) {
      throw error;
    }
  };
  otp = async (req) => {
    try {
      const { email } = req.body;
      const otp = Math.floor(100000 + Math.random() * 900000);
      let otps = JSON.parse(
        readFileSync(
          join(process.cwd(), "src", "logs", "otp.json"),
          "utf-8",
          (err) => {
            if (err) {
              err.status = 500;
              throw err;
            }
          }
        )
      );

      const expiredTime = Date.now() + 5 * 60 * 1000;
      otps.push({ email, otp, expiredTime });
      writeFileSync(
        join(process.cwd(), "src", "logs", "otp.json"),
        JSON.stringify(otps, null, 2),
        (err) => {
          if (err) {
            throw err;
          }
        }
      );
      await transport.sendMail({
        from: `'MIB' <abduqulovmirsai@gmail.com>`,
        to: email,
        subject: "tasdiqlash kodi",
        html: `<h2>${otp}</h2>`,
      });
      return { status: 200, message: "Habar yuborildi" };
    } catch (error) {
      err.status = 500;
      throw error;
    }
  };
}

export default new StaffService();
