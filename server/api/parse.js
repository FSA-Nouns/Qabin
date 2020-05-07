const router = require('express').Router()
const parse = require('./../services/csvparse')

module.exports = router

//make sure the userId is being identified when the front-ends sends the array of filepaths
router.post('/:userId', (req, res, next) => {
  try {
    const getFile = req.body.filepaths
    getFile.forEach(file => {
      // console.log(file, 'file')
      let fileName = file.split('/') // to get the file name for the table name
      fileName = fileName[fileName.length - 1].split('.') //gettting last leg of the path of the file name
      // console.log(fileName[0], 'fileName')
      parse(`user${req.params.userId}_${fileName[0]}`, file) //use last leg of the file name to convert it into a table name in addition to the user.id identifier
    })
    res.send({message: 'Sent'})
  } catch (error) {
    console.log(error)
  }
})
