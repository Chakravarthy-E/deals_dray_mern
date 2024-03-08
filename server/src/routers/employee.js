const { Router } = require("express");
const { createEmployee, updateEmployee } = require("../controllers/employee");

const router = Router();

router.post("/create", createEmployee);
router.put("/update/:id", updateEmployee);

module.exports = router;
