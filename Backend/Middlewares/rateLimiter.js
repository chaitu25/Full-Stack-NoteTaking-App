const loginAttempts = {};

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000; // 15 minutes
  const max = process.env.RATE_LIMIT_MAX || 5; // 5 requests
  const blockDuration = process.env.RATE_LIMIT_BLOCK_DURATION || 30 * 60 * 1000; // 30 minutes

  if (!loginAttempts[ip]) {
    loginAttempts[ip] = {
      count: 0,
      firstAttempt: now,
    };
  }

  const attempts = loginAttempts[ip];

  if (now > attempts.firstAttempt + windowMs) {
    // Reset attempts after the window
    attempts.count = 0;
    attempts.firstAttempt = now;
    attempts.blocked = false;
  }

  if (attempts.blocked) {
    if (now < attempts.blockedUntil) {
      const timeLeft = Math.ceil((attempts.blockedUntil - now) / 1000 / 60);
      return res.status(429).json({
        msg: `Too many login attempts. Please try again in ${timeLeft} minutes.`,
      });
    } else {
      attempts.blocked = false;
      attempts.count = 0;
    }
  }

  attempts.count++;

  if (attempts.count > max) {
    attempts.blocked = true;
    attempts.blockedUntil = now + blockDuration;
    const timeLeft = Math.ceil((attempts.blockedUntil - now) / 1000 / 60);
    return res.status(429).json({
      msg: `Too many login attempts. Please try again in ${timeLeft} minutes.`,
    });
  }

  next();
};

module.exports = {
  rateLimiter,
};
