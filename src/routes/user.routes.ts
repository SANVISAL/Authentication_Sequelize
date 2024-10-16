import { Response, Request, Router, NextFunction } from "express";
import { UserController } from "../controller/user.controller";
import { container } from "../configs/inversify.config";
import { existedUser } from "../middleware/user-exsitd";
import { createValidator } from "express-joi-validation";
import { createUserSchema } from "../constant/user/user.validator";

const router = Router();
const userController = container.get<UserController>(UserController);
const validator = createValidator({ passError: true });
// router.get("/", userController.getAllUsers);
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userController.getAllUsers(req, res);
    // return users;
  } catch (error) {
    next(error);
  }
});
// router.post("/", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     await validator.body(createUserSchema);
//     await existedUser(req.body);
//     console.log("Hello");
//     await userController.createUser(req, res);
//     // return user;
//   } catch (error) {
//     next(error);
//   }
// });
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userController.deleteUser(req, res);
      // return user;
    } catch (error) {
      next(error);
    }
  }
);
// router.get("/:id", userController.getUserById);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

// Global error handling middleware
router.use((err: Error, _req: Request, res: Response, _next: Function) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

export = router;
