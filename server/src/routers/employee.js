const { Router } = require("express");
const {
  createEmployee,
  updateEmployee,
  getEmployees,
  getEmployeeById,
  deleteEmployee,
} = require("../controllers/employee");

const router = Router();

router.post("/create", createEmployee);
router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
