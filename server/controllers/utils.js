import { rateLimit } from 'express-rate-limit';

const freeLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
  standardHeaders: 'draft-8',
  legacyHeaders: false
});

const proLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 8,
  standardHeaders: 'draft-8',
  legacyHeaders: false
});

const enterpriseLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  standardHeaders: 'draft-8',
  legacyHeaders: false
});

const defaultLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1,
  standardHeaders: 'draft-8',
  legacyHeaders: false
});

const dynamic_limiter = (req, res, next) => {
  if (req.user?.role === "FREE") {
    return freeLimiter(req, res, next);
  }
  if (req.user?.role === "PRO") {
    return proLimiter(req, res, next);
  }
  if (req.user?.role === "ENTERPRISE") {
    return enterpriseLimiter(req, res, next);
  }
  return defaultLimiter(req, res, next);
};

export { dynamic_limiter };