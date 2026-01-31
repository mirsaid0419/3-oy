import { Schema, model } from "mongoose";

// branches
// 	name, time, address

const BranchSchema = new Schema(
  {
    name: { type: String, required: true, unique:true, trim:true },
    adres: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
BranchSchema.index({ name: 1 }, { unique: true });

const Branch = model("Branches", BranchSchema);

// transports
// 	branch, model, color, img, price, time

const TransportSchema = new Schema(
  {
    branch: { type: Schema.Types.ObjectId, ref: "Branches", required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Transport = model("Transports", TransportSchema);

//  staffs;
//  branch, username, password, birth - date, gender, email, role;

const StaffSchema = new Schema(
  {
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branches",
      required: function () {
        return this.role !== "SuperAdmin";
      },
    },
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    birth_date: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    role: {
      type: String,
      enum: ["Admin", "SuperAdmin", "Staff"],
      default: "Staff",
    },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
StaffSchema.index({ email: 1 }, { unique: true });

const Staff = model("Staffs", StaffSchema);

const PermissionActionsSchema = new Schema(
  {
    create: { type: Boolean, default: false },
    read: { type: Boolean, default: false },
    update: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
  },
  { _id: false }
);

// permissions;
// staff, permissionModel, permission(actions);

const PermisionSchema = new Schema({
  staff_id: {
    type: Schema.Types.ObjectId,
    ref: "Staffs",
    required: true,
  },
  permissionsModel: {
    type: String,
    enum: ["Transports", "Branches", "Staffs","Permissions"],
    required: true,
  },
  actions: PermissionActionsSchema
});
const Permision = model("Permission", PermisionSchema);


export { Permision, Staff, Transport, Branch };
