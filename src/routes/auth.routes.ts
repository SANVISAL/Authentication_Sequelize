import { NextFunction, Request, Response, Router } from "express";
import { createUserSchema } from "../constant/user/user.validator";
import { container } from "../configs/inversify.config";
import { AuthController } from "../controller/auth.controller";
import { existedUser } from "../middleware/user-exsitd";
import { createValidator } from "express-joi-validation";

const router = Router();
const authController = container.get<AuthController>(AuthController);
const validator = createValidator({ passError: true });
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await validator.body(createUserSchema);
    await existedUser(req.body);
    console.log("Hello");
    await authController.register(req, res);
    // return user;
  } catch (error) {
    next(error);
  }
});

export = router;
