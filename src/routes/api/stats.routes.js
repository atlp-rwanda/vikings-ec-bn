import express from "express";
import { StatsController } from "../../controllers/stats.controller";
import { 
  protectRoute, 
  restrictTo 
} from "../../middlewares/auth.middleware";
import { statsValidation } from "../../validations/stats/stats.validation";
import {
  validateStats, 
  getSales, 
  getWishes, 
  getExpired, 
  getProductCreated
} from "../../middlewares/stats.middleware";

const statsRouter = express.Router();

statsRouter.get(
  "/",
  protectRoute,
  restrictTo('seller', 'admin'),
  statsValidation,
  validateStats,
  getSales,
  getWishes,
  getExpired, 
  getProductCreated,
  StatsController.getStats
);

export default statsRouter;
