module.exports.checkOut = function (req, res, next) {
  const userId = req.session.userid;
  const checkUser = userId === undefined;
  if (!checkUser) {
    return res.redirect('/');
  }

  next();
};
