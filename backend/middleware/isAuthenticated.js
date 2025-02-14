import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // we get the token from the cookies

        if (!token) {
            return res.status(401).json({ message: "user Not authenticated", success: false });
        } // we check the user is authenticated or not, if not we send a response with 401 status code and message

        const decode = jwt.verify(token, process.env.JWT_SECRET);  // we verify the token with the secret key and get the decoded token

        if (!decode) {
            return res.status(401).json({ message: "Invalid token", success: false });
        } // if the token is invalid we send a response with 401 status code and message

        const user = await User.findById(decode.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);

    }
}

export default isAuthenticated;