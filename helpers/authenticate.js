function ensureAuthenticated(req, res, next) {
          if (debug.autolog || req.isAuthenticated()) {
              debug.log('Authenticated');      
              return next();
          }
          debug.log('!!!Did not authenticate properly!!!');
          res.redirect('/');
};

module.exports = ensureAuthenticated;