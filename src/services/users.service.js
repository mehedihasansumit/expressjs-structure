const db = require('../models/index.js');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');
const { Op } = require('sequelize');

const User = db.User;

async function getMultiple(page = 1) {

  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await User.findAll({ offset, limit: config.listPerPage });;
  const data = helper.emptyOrRows(rows);
  const meta = { page };
  return { data, meta };

}

async function getSingle({ userName, id, email } = {}) {
  let where = { [Op.or]: {} };

  if (id) where[Op.or]["id"] = { [Op.eq]: id };
  if (userName) where[Op.or]["userName"] = { [Op.eq]: userName };
  if (email) where[Op.or]["email"] = { [Op.eq]: email };

  const resUser = await User.findOne({ where });
  return resUser;
}

async function create({ fullName, userName, password, email }) {

  return User.create({
    fullName,
    userName,
    email,
    password
  })

}

async function update(id, userDatas) {

  return User.update(userDatas, { where: { id } })
}

async function remove(id) {
  return User.destroy({
    where: { id }
  });
}

module.exports = {
  getMultiple,
  getSingle,
  create,
  update,
  remove
}
