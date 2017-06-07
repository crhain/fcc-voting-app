function ensureAuthenticated(req, res, next) {
          if (debug.canAutolog() || req.isAuthenticated()) {
              debug.log('Authenticated');      
              return next();
          }
          debug.log('!!!Did not authenticate properly!!!');
          res.redirect('/');
};

module.exports = ensureAuthenticated;