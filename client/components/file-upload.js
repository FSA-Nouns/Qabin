import {connect} from 'react-redux'
import React from 'react'
import axios from 'axios'
import {addFiles, parseFiles} from '../store/upload'
import history from '../history'
import {Link} from 'react-router-dom'

class FileUpload extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      uploadedFiles: []
    }

    this.handleUploadImage = this.handleUploadImage.bind(this)
  }

  handleUploadImage(ev) {
    ev.preventDefault()

    const data = new FormData()
    for (var i = 0; i < this.uploadInput.files.length; i++) {
      let file = this.uploadInput.files[i]
      data.append('files[' + i + ']', file, file.name)
    }
    // data.append('filename', this.fileName.value)
    console.log(
      'data passed in add files thunk in handleUploadImage method',
      data
    )
    this.props.addFiles(data)
  }

  render() {
    console.log('this.uploadInput in file-upload render', this.uploadInput)
    console.log('this.props in file-upload render', this.props)
    return !this.props.files.files.length ? (
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
          <button type="submit">Upload</button>
        </div>
      </form>
    ) : (
      <div>
        <h2>Files uploaded successfully</h2>
        <button
          type="button"
          onClick={() =>
            this.props.parseFiles(this.props.files, this.props.user)
          }
        >
          Submit
        </button>
        <Link to="/editData">To Edit Data </Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  files: state.files,
  user: state.user,
  tableNames: state.files.tables
})

const mapDispatchToProps = dispatch => {
  return {
    addFiles: files => dispatch(addFiles(files)),
    parseFiles: (files, user) => {
      dispatch(parseFiles(files, user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload)
