/* eslint-disable complexity */
import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {Paper, Chip, TextField, Grid, FormHelperText} from '@material-ui/core'
// import DateFnsUtils from '@date-io/date-fns'
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker
// } from '@material-ui/pickers'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}))

export default function FilterForm(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [operator, setOperator] = React.useState('')
  const [condition, setCondition] = React.useState('')
  const [showRequired, setShowRequired] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleSubmit = () => {
    if (operator !== '') {
      props.filterElement(operator, condition)
      setOpen(false)
      setShowRequired(false)
    } else {
      setShowRequired(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Add Filter
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add a Filter</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FilterFormDataSelect
              setOperator={setOperator}
              dataType={props.dataType}
              field={props.field}
              showRequired={showRequired}
            />
            <FilterFormInput
              setCondition={setCondition}
              ield={props.field}
              dataType={props.dataType}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

// function FilterForm(props) {
//   return (
//     <form className="filter-form" >
//       <FilterFormDataSelect dataType={props.dataType} />
//       <FilterFormInput dataType={props.dataType} />
//       <button type="submit">Add</button>
//     </form>
//   )
// }
// date upto from before after
//component to display filter operators accordingly to dataType of the field

///SELECT REFACTORING
function FilterFormDataSelect(props) {
  //useStyles

  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    label: {
      // transform: "translate(15px, 24px) scale(1)"
    }
  }))

  const [selected, setSelected] = React.useState('')

  const handleChange = event => {
    props.setOperator(event.target.value)
    setSelected(event.target.value)
  }

  const classes = useStyles()

  return props.dataType === 'serial' ||
    props.dataType === 'integer' ||
    props.dataType === 'double precision' ||
    props.dataType === 'int' ||
    props.dataType === 'int' ||
    props.dataType === 'float' ? (
    <FormControl className={classes.formControl} error={props.showRequired}>
      <InputLabel id={`${props.field}-select-label`}>Filter</InputLabel>
      <Select
        name="operator"
        labelId={`${props.field}-select-label`}
        id={`${props.field}-simple-select`}
        value={selected}
        onChange={handleChange}
      >
        <MenuItem value="=">equal to</MenuItem>
        <MenuItem value="!=">not equal to</MenuItem>
        <MenuItem value=">">greater than</MenuItem>
        <MenuItem value=">=">at least</MenuItem>
        <MenuItem value="<">less than</MenuItem>
        <MenuItem value="<=">at most</MenuItem>
        <MenuItem value="IS NOT NULL">Not Empty</MenuItem>
      </Select>
      {props.showRequired && <FormHelperText>Required</FormHelperText>}
    </FormControl>
  ) : props.dataType === 'text' ? (
    <FormControl className={classes.formControl} error={props.showRequired}>
      <InputLabel id={`${props.field}-select-label`}>Filter</InputLabel>
      <Select
        name="operator"
        labelId={`${props.field}-select-label`}
        id={`${props.field}-simple-select`}
        value={selected}
        onChange={handleChange}
      >
        <MenuItem value="=">equal to</MenuItem>
        <MenuItem value="!=">not equal to</MenuItem>
        <MenuItem value="contains">contains</MenuItem>
        <MenuItem value="starts-with">starts with</MenuItem>
        <MenuItem value="ends-with">ends with</MenuItem>
        <MenuItem value="IS NOT NULL">Not Empty</MenuItem>
      </Select>
      {props.showRequired && <FormHelperText>Required</FormHelperText>}
    </FormControl>
  ) : props.dataType === 'bool' || props.dataType === 'boolean' ? (
    <FormControl className={classes.formControl} error={props.showRequired}>
      <InputLabel id={`${props.field}-select-label`}>Filter</InputLabel>
      <Select
        name="operator"
        labelId={`${props.field}-select-label`}
        id={`${props.field}-simple-select`}
        value={selected}
        onChange={handleChange}
      >
        <MenuItem value="=">is</MenuItem>
      </Select>
      {props.showRequired && <FormHelperText>Required</FormHelperText>}
    </FormControl>
  ) : (
    props.dataType === 'date' && (
      <FormControl className={classes.formControl} error={props.showRequired}>
        <InputLabel id={`${props.field}-select-label`}>Filter</InputLabel>
        <Select
          name="operator"
          labelId={`${props.field}-select-label`}
          id={`${props.field}-simple-select`}
          value={selected}
          onChange={handleChange}
        >
          <MenuItem value="=">equal to</MenuItem>
          <MenuItem value="!=">not equal to</MenuItem>
          <MenuItem value=">">after</MenuItem>
          <MenuItem value=">=">from</MenuItem>
          <MenuItem value="<">before</MenuItem>
          <MenuItem value="<=">up to</MenuItem>
          <MenuItem value="IS NOT NULL">Not Empty</MenuItem>
        </Select>
        {props.showRequired && <FormHelperText>Required</FormHelperText>}
      </FormControl>
    )
  )
}

//INPUT REFACTO
function FilterFormInput(props) {
  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      width: 100,
      height: 40
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }))

  const classes = useStyles()

  const [selected, setSelected] = React.useState('')

  const handleChange = event => {
    props.setCondition(event.target.value)
    setSelected(event.target.value)
  }

  return props.dataType === 'bool' ? (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id={`${props.field}-input-label`}>Value</InputLabel>
      <Select
        name="condition"
        labelId={`${props.field}-input-label`}
        className={classes.formControl}
        value={selected}
        onChange={handleChange}
      >
        <MenuItem value="false">False</MenuItem>
        <MenuItem value="true">True</MenuItem>
      </Select>
    </FormControl>
  ) : props.dataType === 'date' ? (
    <DatePick setCondition={props.setCondition} />
  ) : (
    <TextField
      label="Value"
      name="condition"
      id="outlined-size-small"
      variant="outlined"
      size="small"
      onChange={handleChange}
      className={classes.formControl}
    />
  )
}

function DatePick(props) {
  // The first commit of Material-UI
  const useStyles = makeStyles(theme => ({
    formControl: {
      width: 170,
      height: 40,
      marginTop: 12,
      marginBottom: 8
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }))

  const classes = useStyles()

  const [selectedDate, setSelectedDate] = React.useState(new Date())

  React.useEffect(() => {
    console.log(selectedDate)
    props.setCondition(selectedDate.toISOString())
  }, [])

  const handleDateChange = date => {
    console.log(date.toISOString())
    props.setCondition(date.toISOString())
    setSelectedDate(date)
  }

  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      className={classes.formControl}
    >
      <Grid container className={classes.formControl} justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          name="condition"
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          // label="Value"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
          className={classes.formControl}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  )
}
