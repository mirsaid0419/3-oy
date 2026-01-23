import { Schema, model } from "mongoose";

const UsersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email kiritishda hatolik",
      ],
    },

    password: {
      type: String,
      required: true,
      match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    },

    role: {
      type: String,
      enum: ["ADMIN", "STUDENT", "TEACHER"],
      default: "STUDENT",
    },

    fullName: { type: String, required: true },
    age: { type: Number, min: 7, max: 100, required: true },
    avatar: { type: String, default: "avatar.jpg" },
  },

  {
    timestamps: true,
  }
);

const StudentsSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    phone: {
      type: String,
      match: /^(\+998|998|0)?[1-9][0-9]{8}$/,
      required: true,
    },
    group: { type: Schema.Types.ObjectId, ref: "Groups", required: true },
  },
  {
    timestamps: true,
  }
);

const CoursesSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    duration_month: { type: Number, required: true },
    duration_hours: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const GroupsSchema = new Schema(
  {
    name: { type: String, required: true },
    course_id: { type: Schema.Types.ObjectId, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    start_date: { type: Date, default: Date.now() },
    end_date: { type: Date },
  },
  { timestamps: true }
);

const User = model("Users", UsersSchema);
const Student = model("Students", StudentsSchema);
const Cours = model("Courses", CoursesSchema);
const Group = model("Groups", GroupsSchema);

export { User, Student, Cours, Group };
