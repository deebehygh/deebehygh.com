import { Router } from "express";

import authenticateToken from "../middleware/authenticateToken.js";

const router = Router();

export default (utils, db, secretKey) => {
  const verifyAdmin = (req, res, next) => {
    //console.log(req)
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }
    next();
  };

  //Create Post
  router.post("/", async (req, res) => {
    const { title, content } = req.body;
    const posts = await db.client.json.get('posts');
    if (!posts) 
      await db.client.json.set('posts', '$', [{ title: title, content: content }]);
     else 
      await db.client.json.arrAppend('posts', '$', { title: title, content: content })
  
    return res.json({ message: "Post Created" });
  });

  router.get('/', async(req, res) => {
    const posts = await db.client.json.get('posts');
    if (!posts || posts == null) {
      return res.json(null);
    }
      
    let parsedPosts = posts.map(post => post);
    res.json(parsedPosts);
  });

  return router;
};
