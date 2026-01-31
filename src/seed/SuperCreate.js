import config from "../config/config.js";
import { connectDb } from "../db/connect.js";
import { Permision, Staff } from "../models/models.js";
import { cript } from "../utils/brypt.js";

const createSuperAdmin = async () => {
  try {
    await connectDb();
    const password = await cript(config.SUPER_PASSWORD);
    const result = await Staff.create({
      branch: null,
      user_name: config.SUPER_NAME,
      password: password,
      birth_date: new Date("2002-04-19"),
      gender: "male",
      role: "SuperAdmin",
      email: "mirsaidabduqulov@gmail.com",
    });
    await Permision.create({
      staff_id: result._id,
      permissionsModel: "Staffs",
      actions: { read: true, create: true, update: true, delete: true },
    });
    await Permision.create({
      staff_id: result._id,
      permissionsModel: "Branches",
      actions: { read: true, create: true, update: true, delete: true },
    });
    await Permision.create({
      staff_id: result._id,
      permissionsModel: "Transports",
      actions: { read: true, create: true, update: true, delete: true },
    });
    await Permision.create({
      staff_id: result._id,
      permissionsModel: "Permissions",
      actions: { read: true, create: true, update: true, delete: true },
    });
    const allPermissions =await Permision.find({ staff_id: result._id });
    console.log(result);
    console.log(allPermissions);
    process.exit(0)
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
};
await createSuperAdmin();
