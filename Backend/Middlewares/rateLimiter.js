const { RateLimiterRedis } = require('rate-limiter-flexible');
const redisClient = require('../Config/redis');

const maxWrongAttemptsByIPperDay = 100;
const maxConsecutiveFailsByUsernameAndIP = 10;

const limiterSlowBruteByIP = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'login_fail_ip_per_day',
  points: maxWrongAttemptsByIPperDay,
  duration: 60 * 60 * 24,
  blockDuration: 60 * 60 * 24, // Block for 1 day, if 100 wrong attempts per day
});

const limiterConsecutiveFailsByUsernameAndIP = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'login_fail_consecutive_username_and_ip',
  points: maxConsecutiveFailsByUsernameAndIP,
  duration: 60 * 60 * 24 * 90, // Store number of consecutive failed attempts for 3 months.
  blockDuration: 60 * 15, // Block for 15 minutes
});

const getUsernameIPkey = (username, ip) => `${username}_${ip}`;

const rateLimiterMiddleware = async (req, res, next) => {
  const ipAddr = req.ip;
  const username = req.body.email;
  const usernameIPkey = getUsernameIPkey(username, ipAddr);

  const [resUsernameAndIP, resSlowByIP] = await Promise.all([
    limiterConsecutiveFailsByUsernameAndIP.get(usernameIPkey),
    limiterSlowBruteByIP.get(ipAddr),
  ]);

  let retrySecs = 0;

  // Check if IP or Username + IP is blocked
  if (resSlowByIP !== null && resSlowByIP.consumedPoints > maxWrongAttemptsByIPperDay) {
    retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1;
  } else if (resUsernameAndIP !== null && resUsernameAndIP.consumedPoints > maxConsecutiveFailsByUsernameAndIP) {
    retrySecs = Math.round(resUsernameAndIP.msBeforeNext / 1000) || 1;
  }

  if (retrySecs > 0) {
    res.set('Retry-After', String(retrySecs));
    res.status(429).send('Too Many Requests');
    return;
  }

  try {
    await limiterSlowBruteByIP.consume(ipAddr);
    await limiterConsecutiveFailsByUsernameAndIP.consume(usernameIPkey);
    next();
  } catch (rlRejected) {
    if (rlRejected instanceof Error) {
      throw rlRejected;
    } else {
      res.set('Retry-After', String(Math.round(rlRejected.msBeforeNext / 1000)) || '1');
      res.status(429).send('Too Many Requests');
    }
  }
};

module.exports = {
    rateLimiterMiddleware,
    limiterConsecutiveFailsByUsernameAndIP,
    getUsernameIPkey
};