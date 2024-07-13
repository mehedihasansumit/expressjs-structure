const users = require('../services/users.service.js');
const { handleHashed } = require('../utils/encryption.util.js');

async function get(req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { fullName, userName, password, email } = req.body;

    if (!fullName || !userName || !userName || !email || !password)
      return res.status(401).json({
        status: "failed",
        message: "provide all required fields",
      });

    const isAlreadyHave = await users.getSingle({ userName, email });

    if (isAlreadyHave)
      return res.status(401).json({
        status: "failed",
        message: "username or email is not available ",
      });

    const datas = {
      fullName: fullName,
      userName: userName,
      email: email,
      password: await handleHashed(password),
      isBanned: typeof isBanned === "boolean" ? isBanned : undefined
    }

    res.json(await users.create(datas));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { fullName, userName, password, email, isBanned } = req.body;

    const id = parseInt(req.params.id);
    if (Number.isNaN(id))
      return res.status(401).json({
        status: "failed",
        message: "provide valid user id",
      });
    console.log(typeof isBanned)
    if (!fullName && !userName && !email && !password && !isBanned)
      return res.status(401).json({
        status: "failed",
        message: "no valid fields found to update",
      });

    const isAlreadyHave = await users.getSingle({ userName, email });

    if (isAlreadyHave)
      return res.status(401).json({
        status: "failed",
        message: "this username or email is not available ",
      });

    const updateDatas = {
      fullName: fullName || undefined,
      userName: userName || undefined,
      email: email || undefined,
      password: password ? await handleHashed(password) : undefined,
      isBanned: typeof isBanned === "boolean" ? isBanned : undefined
    }
    const update = await users.update(id, updateDatas)
    if (!update[0])
      return res.status(401).json({
        status: "failed",
        message: "failed to update",
      });

    res.status(200).json({ status: "success", message: "successfully updated" });
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id))
      return res.status(401).json({
        status: "failed",
        message: "provide valid user id",
      });

    const deleteUser = await users.remove(id);
    if (!deleteUser)
      return res.status(401).json({
        status: "failed",
        message: "failed to delete",
      });

    res.status(200).json({ status: "success", message: "successfully deleted" });
  } catch (err) {
    console.error(`Error while deleting user`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  create,
  update,
  remove
};
