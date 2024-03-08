const { Router } = require("express");
const {
  createEmployee,
  updateEmployee,
  getEmployees,
} = require("../controllers/employee");

const router = Router();

router.post("/create", createEmployee);
router.get("/", getEmployees);
router.put("/update/:id", updateEmployee);

module.exports = router;
