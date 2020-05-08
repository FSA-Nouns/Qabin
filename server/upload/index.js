const router = require('express').Router()
const _ = require('lodash')
module.exports = router

router.post('/', (req, res, next) => {
  try {
    if (req.files === null) {
      return res.status(400).json({msg: 'No file uploaded'})
    }
    console.log(
      '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Req.files in upload post route',
      req.files
    )
    const files = req.files
    let data = []
    //loop all files
    _.forEach(_.keysIn(files), key => {
      let file = files[key]
      //move photo to uploads directory
      file.mv(`${__dirname}/uploads/${file.name}`)
      data.push({
        name: file.name,
        path: `server/upload/uploads/${file.name}` //absolute path to file
      })
    })
    console.log(
      'data after movign files to desired directory in uploads post route',
      data
    )
    res.status(201).json({data: data})
  } catch (error) {
    next(error)
  }
})
