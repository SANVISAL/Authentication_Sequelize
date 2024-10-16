import express from "express";

const router = express.Router();

router.use("/register", require("./auth.routes"));
router.use("/users", require("./user.routes"));
router.use("/refresh-tokens", require("./refresh-token.routes"));
router.use("/roles", require("./role.routes"));

export default router;
