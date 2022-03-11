const withAuth = (req, res, next) => {
    if (!req.session.userId) {
      res.redirect('/you-must-login-firrst');
    } else {
      next();
    }
  };
  
module.exports = withAuth;