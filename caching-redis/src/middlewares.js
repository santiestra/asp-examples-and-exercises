const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./constants");
const { User } = require("./models");

const authenticateUserToken = async (req, res, next) => {
  const token = req.get("Authorization");

  if (token) {
    try {
      const data = jwt.verify(token, JWT_SECRET);
      const { email, organizationId } = data;
      const user = await User.findOne({ where: { email } });

      if (user.OrganizationId !== organizationId) {
        return res.sendStatus(401);
      }

      req.user = user;
      req.organizationId = organizationId;
      return next();
    } catch (error) {
      return res.sendStatus(401);
    }
  }

  return res.sendStatus(401);
};

module.exports = {
  authenticateUserToken,
};
