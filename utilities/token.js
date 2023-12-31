var jwt = require("jsonwebtoken");
function token(data) {
  token = jwt.sign(
    { email: data },
    process.env.JWTSECRET,
    { expiresIn: "1h" },
    function (err, token) {
      return token;
    }
  );
}
module.exports = token;
