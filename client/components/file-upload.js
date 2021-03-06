import {connect} from 'react-redux'
import React from 'react'
import {addFiles, parseFiles, setFiles} from '../store/upload'
import {Link} from 'react-router-dom'
import history from '../history'
import {Button, Grid, Typography, IconButton} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded'

class FileUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uploaded: false
    }
    this.handleUploadFiles = this.handleUploadFiles.bind(this)
  }

  componentDidMount() {
    this.props.setFiles([])
  }

  handleUploadFiles(ev) {
    ev.preventDefault()

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
  user: state.user,
  tableNames: state.files.tableNames
})

const mapDispatchToProps = dispatch => {
  return {
    addFiles: (files, user) => dispatch(addFiles(files, user)),
    setFiles: fileNames => dispatch(setFiles(fileNames))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload)
