import {connect} from 'react-redux'
import React from 'react'
import {addFiles, setFiles} from '../store/upload'
import {Button, Grid, Typography} from '@material-ui/core'

class FileUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // React State boolean that's set to true on initial file upload
      uploaded: false
    }
    this.handleUploadFiles = this.handleUploadFiles.bind(this)
  }

  // Set initial files property on Redux state to an empty array
  componentDidMount() {
    this.props.setFiles([])
  }

  // File for uploading to database
  handleUploadFiles(ev) {
    ev.preventDefault()

    // Instantiating formData element to append .csv file info and send to Redux then to database
    const data = new FormData()
    for (var i = 0; i < this.uploadInput.files.length; i++) {
      let file = this.uploadInput.files[i]
      data.append('files[' + i + ']', file, file.name)
    }

    if (this.uploadInput.files.length) {
      this.props.addFiles(data, this.props.user)
      this.setState({uploaded: true})
    }
  }

  render() {
    return !this.state.uploaded ? (
      <form onSubmit={this.handleUploadFiles}>
        <Grid container direction="column" spacing={2}>
          <Typography variant="h5">Upload Tables (.csv)</Typography>
          <Typography variant="body2">
            Note: file name must not contain any 'spaces' or special characters
            (aside from underlines) and should be unique.
          </Typography>
          <Grid item>
            {/* Providing input and corresponding ref for use in handleUploadFiles */}
            <input
              ref={ref => {
                this.uploadInput = ref
              }}
              type="file"
              multiple
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="secondary">
              Upload
            </Button>
          </Grid>
        </Grid>
      </form>
    ) : (
      <Grid container direction="column">
        <Typography variant="h5">Files uploaded successfully</Typography>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  files: state.files,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    addFiles: (files, user) => dispatch(addFiles(files, user)),
    setFiles: fileNames => dispatch(setFiles(fileNames))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload)
