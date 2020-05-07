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

  async handleUploadImage(ev) {
    ev.preventDefault()

    const data = new FormData()
    for (var i = 0; i < this.uploadInput.files.length; i++) {
      let file = this.uploadInput.files[i]
      data.append('files[' + i + ']', file, file.name)
    }
    // data.append('filename', this.fileName.value)

    try {
      const res = await axios.post('/api/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
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
          {/* <input
            ref={ref => {
              this.fileName = ref
            }}
            type="text"
            placeholder="Enter the desired name of file"
          /> */}
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
