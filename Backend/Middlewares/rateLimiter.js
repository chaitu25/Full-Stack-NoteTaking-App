const { RateLimiterRedis } = require("rate-limiter-flexible");
const redis = require("redis");

const redisClient = redis.createClient({
  enable_offline_queue: false,
});

redisClient.connect();

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "login_fail_ip",
  points: 3, // 3 points
  duration: 60, // per 60 seconds
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).json({
        error: "TooManyRequests",
        message: "Too many login attempts, please try again later.",
        code: 429,
      });
    });
};

module.exports = {
  rateLimiterMiddleware,
};
