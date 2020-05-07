import React from 'react'

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
    data.append('files', this.uploadInput.files)
    data.append('filename', this.fileName.value)

    fetch('http://localhost:8080/api/upload/', {
      method: 'POST',
      body: data
    }).then(response => {
      response.json()
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
