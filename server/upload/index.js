const router = require('express').Router()
const fileUpload = require('express-fileupload')
const _ = require('lodash')
module.exports = router

router.use(fileUpload())

router.post('/', (req, res, next) => {
  try {
    console.log('THIS IS REQ.FILES', req.files)
    console.log('THIS IS REQ.BODY', req.body)
    if (req.body.files === null) {
      return res.status(400).json({msg: 'No file uploaded'})
    }
    const files = req.body.files
    let data = []
    //loop all files
    _.forEach(_.keysIn(files), key => {
      let file = files[key]
      //move photo to uploads directory
      file.mv(`${__dirname}/client/public/uploads/${file.name}`)
      data.push({
        name: file.name,
        path: `${__dirname}/client/public/uploads/${file.name}` //absolute path to file
      })
    })
    res.status(201).json({data: data})
  } catch (error) {
    next(error)
  }
})
