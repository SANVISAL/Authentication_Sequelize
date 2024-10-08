import express from "express";

const router = express.Router();

router.use("/users", require("./user.routes"));
router.use("/refresh-tokens", require("./refresh-token.route"));

export default router;
