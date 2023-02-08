import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { isAuthRevoked } from "../utils/logout.util.js";
import { jwtTokens } from "../database/models/index.js";

dotenv.config();

const protectRoute = async (req, res, next) => {
  try {
    let authToken = req.header("Authorization") || "";
    let token = authToken.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, user) => {
      if (err)
        return res
          .status(400)
          .json({ message: "Unauthorized request, try again" });
      if (await isAuthRevoked(token)) {
        return res
          .status(401)
          .json({ message: "You are not authorized to access" });
      } else {
        req.user = user;
        req.token = token;
        next();
      }
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Something went wrong, try again" });
  }
};
export default protectRoute;
