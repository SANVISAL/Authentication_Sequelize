import { NextFunction, Request, Response, Router } from "express";
import { container } from "../configs/inversify.config";
import { TokenController } from "../controller/token.controller";
import { createValidator } from "express-joi-validation";

const router = Router();
const tokenController = container.get<TokenController>(TokenController);
const validator = createValidator({ passError: true });

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    tokenController.refreshToken(req, res);
  } catch (error) {
    next(error);
  }
});

export = router;
