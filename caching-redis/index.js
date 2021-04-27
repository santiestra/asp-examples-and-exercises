const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./src/constants");
const { Task, User } = require("./src/models");
const { authenticateUserToken } = require("./src/middlewares");
const cache = require("./lib/cache");

const app = express();
const port = 3456;

app.use(bodyParser.json());

// Example endpoint to check that the token identifies the Org
app.get("/my-org", authenticateUserToken, async (req, res) => {
  res.json({ loggedOrg: req.organizationId });
});

app.post("/users", async (req, res) => {
  const { email, password, organizationId } = req.body;

  try {
    const user = User.build({ email, OrganizationId: organizationId });
    const encryptedPassword = await user.generateHash(password);
    user.password = encryptedPassword;
    const savedUser = await user.save();
    res.json(savedUser.asJson());
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.post("/session", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    const validPassword = await user.validPassword(password);
    if (validPassword) {
      const sessionToken = jwt.sign(user.asJson(), JWT_SECRET);
      res.json({ token: sessionToken });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);
  }
});

app.post("/tasks", authenticateUserToken, async (req, res) => {
  const { organizationId, body: { title } } = req;
  try {
    const task = await Task.create({
      title,
      completed: false,
      OrganizationId: organizationId,
    });

    const cacheKey = `tasks-${organizationId}`;

    cache.get(cacheKey, (error, cachedData) => {
      const data = JSON.parse(cachedData);
      const newData = [...data, task];
      cache.set(cacheKey, JSON.stringify(newData));
    });

    res.json(task);
  } catch (error) {
    res.json({ error });
  }
});

app.get("/tasks", authenticateUserToken, async (req, res) => {
  try {
    const organizationId = req.organizationId;

    const cacheKey = `tasks-${organizationId}`;
    cache.get(cacheKey, async (error, cachedData) => {
      if (error) res.json({ error })
      if (cachedData) {
        res.json(JSON.parse(cachedData));
      } else {
        const tasks = await Task.findAll({
          where: { OrganizationId: organizationId },
        });

        cache.set(cacheKey, JSON.stringify(tasks));
        res.json(tasks);
      }
    });
  } catch (error) {
    res.json({ error });
  }
});

app.get("/tasks/:id", authenticateUserToken, async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, OrganizationId: req.organizationId },
    });
    if (task) {
      res.json({ task });
    } else {
      res.status(404);
      res.json({ error: "Not found" });
      return;
    }
  } catch (error) {
    res.json({ error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
