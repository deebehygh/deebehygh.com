//@ts-check
import jwt from "jsonwebtoken";

export const authenticateAdmin = (secret) => {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, secret, (err, user) => {
      if (err) return res.status(403).json({ error: "Forbidden" });
      if (!user.isAdmin)
        return res.status(403).json({ error: "Access denied. Admins only." });
      req.user = user;
      next();
    });
  };
};
