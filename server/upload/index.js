const router = require('express').Router()
module.exports = router

router.post('/', (req, res, next) => {
  try {
    if (req.files === null) {
      return res.status(400).json({msg: 'No file uploaded'})
    }

    const file = req.files.file

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
      if (err) {
        console.error(err)
        return res.status(500).send(err)
      }
      res.json({fileName: file.name, filePath: `/uploads/${file.name}`})
    })
  } catch (error) {
    next(error)
  }
})
