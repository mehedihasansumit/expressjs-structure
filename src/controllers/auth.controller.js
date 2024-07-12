// const programmingLanguages = require('../services/programmingLanguages.service');
const user = require('../services/users.service');
const { generateToken } = require('../utils/authToken.util');
const bcrypt = require('bcrypt');
const { handleHashed, verifyHashed } = require('../utils/encryption.util');

// async function get(req, res, next) {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) throw new Error('provide username and password');

//     const resUser = await programmingLanguages.getMultiple(req.query.page);
//     const result = await bcrypt.compare(password, resUser.password);

//     const refresh_token = jwt.sign(
//       { name: user.username, id: user.id, school_id: user.school_id, role: user.role, admin_panel_id: user.admin_panel_id },
//       process.env.JWT_REFRESH_TOKEN_SECRET,
//       {
//         expiresIn: '1d'
//       }
//     );


//   } catch (err) {
//     console.error(`Error while getting programming languages`, err.message);
//     next(err);
//   }
// }

// async function register(req, res, next) {
//   const { username, password } = req.body;
//   if (password.length < 6) return res.status(400).json({ message: "Password less than 6 characters" });
//   try {
//     const resUser = await programmingLanguages.crea(req.query.page);

//     await User.create({ username, password, }).then(user =>
//       res.status(200).json({
//         message: "User successfully created",
//         user,
//       })
//     )
//   } catch (err) {
//     console.error(`Error while getting programming languages`, err.message);
//     res.status(401).json({
//       message: "User not successful created",
//       error: err.message,
//     });
//     err.statusCode(401)
//     next(err);
//   }
// }

async function login(req, res, next) {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) throw new Error('provide username and password');


    const resUser = await user.getSingle({ userName, password });
    console.log({ resUser })

    // validate password
    const isPasswordValid = await verifyHashed(password, resUser.password);

    console.log({ isPasswordValid })
    // if not valid, return unathorized response
    if (!isPasswordValid)
      return res.status(401).json({
        status: "failed",
        data: [],
        message: "Invalid username or password. Please try again with the correct credentials.",
      });

    let options = {
      maxAge: 20 * 60 * 1000, // would expire in 20minutes
      // httpOnly: true, // The cookie is only accessible by the web server
      // secure: true,
      sameSite: "None",
    };

    const token = generateToken(resUser); // generate session token for user
    res.cookie("SessionID", token, options); // set the token to response header, so that the client sends it back on each subsequent request

    res.status(200).json({
      status: "success",
      message: "You have successfully logged in.",
    });
    // } catch (err) {
    //   res.status(500).json({
    //     status: "error",
    //     code: 500,
    //     data: [],
    //     message: "Internal Server Error",
    //   });
    // }
    // res.json(await programmingLanguages.create(req.body));
  } catch (err) {
    console.error(`Error while Login`, err.message);
    next(err);
  }
}


module.exports = {
  login
};
