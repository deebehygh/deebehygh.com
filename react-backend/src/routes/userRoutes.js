//@ts-check
import { response, Router } from 'express';
import authenticateToken from '../middleware/authenticateToken.js';
import 'dotenv/config'
const router = Router();

export default (utils, db, secretKey, bcrypt, jwt) => {
  // User signup
  router.post('/signup', async(req, res) => {
    const { email, username, password } = req.body;
      const [userErr, user] = await utils.to(db.client.HGET(`users`, username));
      let [nextErr, nextId] = await utils.to(db.client.GET(`nextId`));

      if (user) return res.status(400).send("User already exists");

      // Hash the password
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err)
          return res.status(500).send("Error hashing password");

        const randomId = Math.floor(Math.random() * 1000);
        const profilePicture = `https://robohash.org/${randomId}.png`;
        const newUser = { id: nextId++, guid: email, password: hash, isAdmin: false };
        
        await db.client.HSET(`users`, username, JSON.stringify(newUser));
        await db.client.HSET(`user:${email}:info`, {
          id: nextId++,
          guid: email,
          username: username,
          password: hash,
          pfp: profilePicture,
          bioContent: '',
          socialLink: '',
          phoneNumber: '',
          totalFollowers: 0,
          totalPosts: 0,
          isAdmin: false
        })
        await db.client.INCR('nextId');
        if (err) {
          return res.status(500).json({ error: "Error storing user" });
        }
        res.json({ message: "User registered successfully" });
      });
  });

  // User login
  router.post('/login', async(req, res) => {
    const { username, password } = req.body;
      const uuser = JSON.parse(await db.client.HGET(`users`, username));
      const realUser = await db.client.HGETALL(`users:${username}:info`)
      if (uuser == null) 
        return res.status(400).send('Username does not exists or is invalid!');

      bcrypt.compare(password, uuser.password, (err, isMatch) => {
        if (!isMatch) 
          return res.status(400).send('Incorrect password!');
        
        const user = {
          id: realUser.id,
          guid: realUser.email,
          username: username,
          pfp: realUser.pfp,
          bio: realUser.bioContent,
          link: realUser.socialLink,
          followers: realUser.totalFollowers,
          postss: realUser.totalPosts,
          isAdmin: realUser.isAdmin,
        };
        const token = jwt.sign(user, process.env.SECRET, { expiresIn: "1h" });
        res.json({ token });
      });
  });

  // Get User Profile
  router.get('/profile', authenticateToken(process.env.SECRET), async(req, res) => {
    const username = req.user.username;
    const uun = await db.client.HGETALL(`user:${username}:info`);
    //if (!user) {
      //return res.status(404).json({ error: 'User not found' });
    //}
    console.log(uun)
    res.json(uun);
  });
  // DeeBeHygh Followers
  router.get("/getFollowers", async (req, res) => {
    const [err, data] = await utils.to(db.client.HGET("web:info", "followers"));
    if (err)
      return res
        .status(500)
        .json({ error: "Error fetching data from Redis" });
    return res.json({ data });
  });

  return router;
};