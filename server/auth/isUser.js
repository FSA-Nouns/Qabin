const {User} = require('../db/models')

const isUserMiddleware = async (req, res, next) => {
  const currentUser = await User.findOne({
    where: {id: req.params.userId}
  })
  if (
    parseInt(req.params.userId, 10) === req.user.dataValues.id ||
    currentUser.isAdmin
  ) {
    next()
  } else {
    const error = new Error('Unautherized Operation')
    error.status = 401
    next(error)
  }
}

module.exports = isUserMiddleware
