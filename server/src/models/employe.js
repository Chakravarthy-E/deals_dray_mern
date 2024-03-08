const { Schema, model, default: mongoose } = require("mongoose");

const EmployeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    employeeID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
