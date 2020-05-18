import React from 'react'
import {connect} from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Grid, Card, List, ListItem, Typography, Button} from '@material-ui/core'
import {gray, green} from '@material-ui/core/colors'
import {SimpleCard} from './home'
import JoinSteps from './join-steps'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'
// import HelpIcon from '@material-ui/icons/Help';
import DownArrow from '@material-ui/icons/ArrowDownward'
import LeftArrow from '@material-ui/icons/ArrowBack'
import RightArrow from '@material-ui/icons/ArrowForward'
import UpArrow from '@material-ui/icons/ArrowUpward'
import {makeStyles} from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {
  addJoinElement,
  removeJoinElement,
  setJoinColumnElement
} from '../store/query'

let joinType
class Join extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      scroll: 'paper',
      descriptionElementRef: null,
      join: false,
      table1: '',
      table2: ''
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.toggleJoin = this.toggleJoin.bind(this)
    this.handleJoinElement = this.handleJoinElement.bind(this)
    this.handleColumnElement = this.handleColumnElement.bind(this)
  }

  componentDidMount() {
    if (this.state.open) {
      let {current: descriptionElement} = this.state.descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
    // if(this.state.table1 !== ''){
    //   this.
    // }
  }

  handleClickOpen() {
    this.setState({open: true})
    this.setState({join: true})
  }

  handleClose(index1, index2) {
    this.props.removeJoinElement(this.props.data.tableName, this.props.index)
    this.setState({open: false})
    this.setState({join: false})
  }

  handleSave() {
    this.setState({open: false})
  }

  handleClear() {
    this.setState({open: true})
    this.props.removeJoinElement(this.props.data.tableName, this.props.index)
    this.setState({table1: '', table2: ''})
  }

  toggleJoin() {
    if (this.state.join === true) {
      this.props.removeJoinElement(this.props.data.tableName, this.props.index)
      return this.setState({join: false})
    } else {
      this.setState({join: true})
    }
  }

  handleJoinType(event) {
    event.preventDefault()
    joinType = event.target.value
  }

  handleJoinElement(event, index) {
    event.preventDefault()
    let joinArray = event.target.value
    let table = this.props.data.tableName
    if (this.state.join === true) {
      this.props.removeJoinElement(table, index)
      this.props.addJoinElement(table, joinArray, joinType, this.props.index)
      return this.setState({table1: table, table2: joinArray})
    }
  }

  handleColumnElement(table1, table2, event, index) {
    event.preventDefault()
    let joinArray = `${table2}.${event.target.value}`
    this.props.setJoinColumnElement(table1, joinArray, index, this.props.index)
  }

  render() {
    let table1 = this.state.table1
    let table2 = this.state.table2
    return (
      <div>
        <Button
          onClick={() => this.handleClickOpen()}
          variant="contained"
          color="primary"
        >
          Join Data Tables
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            <Typography>Lets connect data from other tables</Typography>
          </DialogTitle>

          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={this.descriptionElementRef}
              tabIndex={-1}
            >
              <Grid container spacing={4}>
                <Grid item xs={false} sm={4}>
                  <JoinSteps />
                </Grid>

                <Grid item xs={false} sm={8}>
                  <SimpleCard>
                    <FormControl
                      className="formControl"
                      spacing="1"
                      minWidth="120"
                    >
                      <InputLabel id="Join-Type">Join</InputLabel>
                      <Select
                        labelId="Join-Type"
                        id="Join-Type"
                        value={event.target.value}
                        onChange={event => this.handleJoinType(event)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="INNER">Inner Join</MenuItem>
                        <MenuItem value="LEFT">Left Join</MenuItem>
                        <MenuItem value="RIGHT">Right Join</MenuItem>
                        <MenuItem value="FULL">Full Join</MenuItem>
                      </Select>
                      <FormHelperText>Type of Join</FormHelperText>
                    </FormControl>
                    {/* <select
                    name="type"
                    onChange={this.handleJoinType}
                    className="dropdown"
                  >
                    <option value="TYPE">Join Type</option>
                    <option value="INNER">Inner Join</option>
                    <option value="LEFT">Left Join</option>
                    <option value="RIGHT">Right Join</option>
                    <option value="FULL">Full Join</option>
                  </select> */}

                    <FormControl
                      className="formControl"
                      spacing="1"
                      minWidth="120"
                    >
                      <InputLabel id="Join-Table-1">Table</InputLabel>
                      <Select
                        labelId="Join-Table-1"
                        id="Join-Table-1"
                        // value={undefined? '-' : event.target.value}
                        onChange={event =>
                          this.handleJoinElement(event, this.props.index)
                        }
                      >
                        {this.props.data.tableDatas
                          .map((table, index) => (
                            <MenuItem key={index}>
                              {Object.keys(table)}
                            </MenuItem>
                          ))
                          .filter(
                            table =>
                              table.props.children[0] !==
                              this.props.data.tableName
                          )}
                      </Select>
                      <FormHelperText>Table to Join</FormHelperText>
                    </FormControl>

                    {/* <select
                    name="table"
                    onChange={event =>
                      this.handleJoinElement(event, this.props.index)
                    }
                    className="dropdown"
                  >
                    <option>Table to Join</option>
                    {this.props.data.tableDatas
                      .map((table, index) => (
                        <option key={index}>{Object.keys(table)}</option>
                      ))
                      .filter(
                        table => table.props.children[0] !== this.props.data.tableName
                      )}
                    Table Selection
                  </select> */}

                    <FormControl
                      className="formControl"
                      spacing="1"
                      minWidth="120"
                    >
                      <InputLabel id="Column-Table-1">
                        Field in Table 1
                      </InputLabel>
                      <Select
                        labelId="Column-Table-1"
                        id="Column-Table-1"
                        // value={event.target.value}
                        onChange={event =>
                          this.handleColumnElement(table1, table1, event, 2)
                        }
                      >
                        {this.props.data.tableDatas.map(table => {
                          if (table[table1] !== undefined) {
                            return Object.keys(table[table1].rows[0]).map(
                              column => (
                                <MenuItem key={column}>{column}</MenuItem>
                              )
                            )
                          }
                        })}
                      </Select>
                      <FormHelperText>Table 1 Field</FormHelperText>
                    </FormControl>
                    {/* <select
                    name="element1"
                    onChange={event =>
                      this.handleColumnElement(table1, table1, event, 2)
                    }
                    className="dropdown"
                  >
                    <option>Column from this table</option>
                    {table1 !== undefined ? (
                      this.props.data.tableDatas.map(table => {
                        if (table[table1] !== undefined) {
                          return Object.keys(table[table1].rows[0]).map(column => (
                            <option key={column}>{column}</option>
                          ))
                        }
                      })
                    ) : (
                      <option>Not Applicable</option>
                    )}
                    Table 1 Column Selection
                  </select> */}
                    <FormControl
                      className="formControl"
                      spacing="1"
                      minWidth="120"
                    >
                      <InputLabel id="Column-Table-2">
                        Field in Table 2
                      </InputLabel>
                      <Select
                        labelId="Column-Table-2"
                        id="Column-Table-2"
                        // value={event.target.value}
                        onChange={event =>
                          this.handleColumnElement(table1, table1, event, 2)
                        }
                      >
                        {this.props.data.tableDatas.map(table => {
                          if (table[table1] !== undefined) {
                            return Object.keys(table[table2].rows[0]).map(
                              column => (
                                <MenuItem key={column}>{column}</MenuItem>
                              )
                            )
                          }
                        })}
                      </Select>
                      <FormHelperText>Table 2 Field</FormHelperText>
                    </FormControl>

                    {/* <select
                    name="element2"
                    onChange={event =>
                      this.handleColumnElement(table1, table2, event, 3)
                    }
                    className="dropdown"
                  >
                    <option>Column from table to be joined</option>
                    {table2 !== undefined ? (
                      this.props.data.tableDatas.map(table => {
                        if (table[table2] !== undefined) {
                          return Object.keys(table[table2].rows[0]).map(column => (
                            <option key={column}>{column}</option>
                          ))
                        }
                      })
                    ) : (
                      <option>Not Applicable</option>
                    )}
                    Table 2 Column Selection
                  </select> */}

                    {/* <button onClick={this.handleConfirmJoin} >Confirm Join</button> */}
                  </SimpleCard>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSave} color="primary">
              Clear
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      // <div className="add-join">
      //   <button onClick={this.toggleJoin} className="add-join" type="button">
      //     {this.state.join ? 'Remove Join' : 'Add Join'}
      //   </button>

      //   {this.state.join ? (
      //     <span>
      //       <select
      //         name="type"
      //         onChange={this.handleJoinType}
      //         className="dropdown"
      //       >
      //         <option value="TYPE">Join Type</option>
      //         <option value="INNER">Inner Join</option>
      //         <option value="LEFT">Left Join</option>
      //         <option value="RIGHT">Right Join</option>
      //         <option value="FULL">Full Join</option>
      //       </select>

      //       <select
      //         name="table"
      //         onChange={event =>
      //           this.handleJoinElement(event, this.props.index)
      //         }
      //         className="dropdown"
      //       >
      //         <option>Table to Join</option>
      //         {this.props.data.tableDatas
      //           .map((table, index) => (
      //             <option key={index}>{Object.keys(table)}</option>
      //           ))
      //           .filter(
      //             table => table.props.children[0] !== this.props.data.tableName
      //           )}
      //         Table Selection
      //       </select>

      //       <select
      //         name="element1"
      //         onChange={event =>
      //           this.handleColumnElement(table1, table1, event, 2)
      //         }
      //         className="dropdown"
      //       >
      //         <option>Column from this table</option>
      //         {table1 !== undefined ? (
      //           this.props.data.tableDatas.map(table => {
      //             if (table[table1] !== undefined) {
      //               return Object.keys(table[table1].rows[0]).map(column => (
      //                 <option key={column}>{column}</option>
      //               ))
      //             }
      //           })
      //         ) : (
      //           <option>Not Applicable</option>
      //         )}
      //         Table 1 Column Selection
      //       </select>

      //       <select
      //         name="element2"
      //         onChange={event =>
      //           this.handleColumnElement(table1, table2, event, 3)
      //         }
      //         className="dropdown"
      //       >
      //         <option>Column from table to be joined</option>
      //         {table2 !== undefined ? (
      //           this.props.data.tableDatas.map(table => {
      //             if (table[table2] !== undefined) {
      //               return Object.keys(table[table2].rows[0]).map(column => (
      //                 <option key={column}>{column}</option>
      //               ))
      //             }
      //           })
      //         ) : (
      //           <option>Not Applicable</option>
      //         )}
      //         Table 2 Column Selection
      //       </select>

      //       {/* <button onClick={this.handleConfirmJoin} >Confirm Join</button> */}
      //     </span>
      //   ) : (
      //     ''
      //   )}
      // </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return {
    addJoinElement: (tableName, joinArray, joinType, joinId) =>
      dispatch(addJoinElement(tableName, joinArray, joinType, joinId)),
    removeJoinElement: (tableName, joinId) =>
      dispatch(removeJoinElement(tableName, joinId)),
    setJoinColumnElement: (tableName, joinArray, index, joinId) =>
      dispatch(setJoinColumnElement(tableName, joinArray, index, joinId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join)

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

// const classes = useStyles();
