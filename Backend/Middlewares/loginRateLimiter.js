const redisClient = require("../Config/redis");

const loginRateLimiter = async (req, res, next) => {
  const ip = req.ip;
  const key = `login_fail_ip:${ip}`;

  const requests = await redisClient.incr(key);

  if (requests === 1) {
    await redisClient.expire(key, 60);
  }

  if (requests > 3) {
    return res.status(429).json({
      error: "TooManyRequests",
      message: "Too many login attempts, please try again later.",
      code: 429,
    });
  }

  next();
};

module.exports = {
  loginRateLimiter,
};
