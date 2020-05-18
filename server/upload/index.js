const router = require('express').Router()
const isUserMiddleware = require('../auth/isUser')
const _ = require('lodash')
module.exports = router

router.post('/:userId', isUserMiddleware, (req, res, next) => {
  try {
    if (req.files === null) {
      return res.status(400).json({msg: 'No file uploaded'})
    }
    const files = req.files
    let data = []
    //loop all files
    _.forEach(_.keysIn(files), key => {
      let file = files[key]
      //move photo to uploads directory
      file.mv(`${__dirname}/uploads/${file.name}`)
      data.push({
        name: file.name,
        path: `${__dirname}/uploads/${file.name}` //absolute path to file
      })
    })
    res.status(201).json({data: data})
  } catch (error) {
    next(error)
  }
})
