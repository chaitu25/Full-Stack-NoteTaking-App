const rateLimit = require('express-rate-limit');

const loginRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // 3 requests per 1 minute
  message: {
    error: 'TooManyRequests',
    message: 'Too many login attempts, please try again later.',
    code: 429,
  },
  handler: (req, res, next) => {
    res.status(429).json(loginRateLimiter.message);
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = loginRateLimiter;
