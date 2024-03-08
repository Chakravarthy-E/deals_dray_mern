const { create, signIn } = require("../controllers/auth");
const { Router } = require("express");


const router = Router();

router.post("/create", create);
router.post("/sign-in", signIn);

module.exports = router;
