module.exports = (req, res, next) => {
  return !req.session.userNum
    ? res.render('chinsung_404', { msg: 'no session' })
    : next();
};
