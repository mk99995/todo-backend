const { Router } = require("express");
const controller = require("./controllers");

const router = Router();

router.get("/users", controller.getUsers);
router.post("/signup", controller.addUser);
router.post("/signin", controller.login);
router.put("/changePassword", controller.changePassword);

module.exports = router;
