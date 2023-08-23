const COOKIE_OPTIONS = {
    HttpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  };


module.exports = { COOKIE_OPTIONS }