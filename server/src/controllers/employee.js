const Employee = require("../models/employe");

const createEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, course, image, createdAt } =
    req.body;
  if (!name || !email || !mobile || !designation || !gender || !course) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  const existingEmail = await Employee.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ message: "Email Already Exist" });
  }

  const mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(mobile)) {
    return res.status(400).json({ message: "Invalid mobile number format" });
  }

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
    createdAt,
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
      createdAt,
    },
  });
};

const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ employee });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEmployees = async (req, res) => {
  const list = await Employee.find().populate("employeeID");
  const employees = list.map((item) => {
    return {
      id: item._id,
      name: item.name,
      email: item.email,
      mobile: item.mobile,
      designation: item.designation,
      gender: item.gender,
      course: item.course,
      image: item.image,
      createdAt: item.createdAt,
    };
  });
  res.json({ employees });
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee Id Not Found" });
    }

    res.json({
      message: "Employee successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, designation, gender, course, image } = req.body;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    if (name) employee.name = name;
    if (email) employee.email = email;
    if (mobile) employee.mobile = mobile;
    if (designation) employee.designation = designation;
    if (gender) employee.gender = gender;
    if (course) employee.course = course;
    if (image) employee.image = image;

    await employee.save();
    res.json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createEmployee,
  updateEmployee,
  getEmployees,
  getEmployeeById,
  deleteEmployee,
};
