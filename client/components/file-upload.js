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

    this.handleUploadFiles = this.handleUploadFiles.bind(this)
  }

  handleUploadFiles(ev) {
    ev.preventDefault()

    const data = new FormData()
    for (var i = 0; i < this.uploadInput.files.length; i++) {
      let file = this.uploadInput.files[i]
      data.append('files[' + i + ']', file, file.name)
    }
    // data.append('filename', this.fileName.value)

    this.props.addFiles(data)
  }

  render() {
    return !this.props.files.fileNames.length ? (
      <form onSubmit={this.handleUploadFiles}>
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
  tableNames: state.files.tableNames
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
