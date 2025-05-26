import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async (req, res, next) => {
  try {
    // get token
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token)
      return res
        .status(401)
        .json({ message: "No authorization token, access denied" });

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find the user from db
    const user = await User.findById(decoded.userId).select("-passowrd");
    if (!user) return res.status(401).json({ message: "Token is not valid" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default protectRoute;
