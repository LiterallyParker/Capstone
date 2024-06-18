const requireUser = async (req, res, next) => {
  if (!req.user) {
    res.status(401);
    next({
      error: true,
      message:"User must be logged in to perform this action."
    });
  }
  next();
}

module.exports = { requireUser }