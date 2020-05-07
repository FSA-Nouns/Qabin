import React from 'react'
import axios from 'axios'

class FileUpload extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imageURL: ''
    }

    this.handleUploadImage = this.handleUploadImage.bind(this)
  }

  handleUploadImage(ev) {
    ev.preventDefault()

    const data = new FormData()
    for (var i = 0; i < this.uploadInput.files.length; i++) {
      let file = this.uploadInput.files[i]
      data.append('files[]', file, file.name)
    }
    //data.append('filename', this.fileName.value)
    const sent = data.getAll('files[]')
    console.log('DATA.GETALL', data.getAll('files[]'))

    axios({
      method: 'post',
      url: '/api/upload',
      body: sent
      // headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(function(response) {
        //handle success
        console.log(response)
      })
      .catch(function(response) {
        //handle error
        console.log(response)
      })
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input
            ref={ref => {
              this.uploadInput = ref
            }}
            type="file"
            multiple
          />
        </div>
        <div>
          <input
            ref={ref => {
              this.fileName = ref
            }}
            type="text"
            placeholder="Enter the desired name of file"
          />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
      </form>
    )
  }
}

export default FileUpload
