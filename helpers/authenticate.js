function ensureAuthenticated(req, res, next) {
          if (debug.autolog || req.isAuthenticated()) {
              return next();
          }
          res.redirect('/');
};

module.exports = ensureAuthenticated;