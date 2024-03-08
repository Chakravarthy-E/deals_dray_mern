const { response } = require("express");
const Employee = require("../models/employe");

const createEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, course, image } = req.body;

  const existingEmployee = await Employee.findOne({ email });
  if (existingEmployee) {
    return res.status(403).json({ message: "Employee already exists" });
  }
  const employee = await Employee.create({
    name,
    email,
    mobile,
    designation,
    gender,
    course,
    image,
  });
  res.status(201).json({
    employee: {
      id: employee._id,
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image,
    },
  });
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, designation, gender, course, image } = req.body;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.name = name;
    employee.email = email;
    employee.mobile = mobile;
    employee.designation = designation;
    employee.gender = gender;
    employee.course = course;
    employee.image = image;

    await employee.save();
    res.json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createEmployee, updateEmployee };
