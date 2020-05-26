import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    // width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

function getSteps() {
  return [
    'Data ingestion',
    'Data Types Specification',
    'Data Selection',
    'Data Visualization'
  ]
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case '/home':
      return 'Select campaign settings...'
    case '/editData':
      return 'What is an ad group anyways?'
    case '/queryBuilder':
      return 'This is the bit I really care about!'
    case '/results':
      return 'This is the bit I really care about!'
    default:
      return 'Unknown stepIndex'
  }
}

let stepsArr = ['/home', '/editData', '/queryBuilder', '/results']

export default function ProgressionBar(props) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(props.location.pathname)
  const steps = getSteps()

  React.useEffect(() => {
    if (props.location.pathname !== activeStep) {
      setActiveStep(props.location.pathname)
    }
  })

  const handleNext = () => {
    setActiveStep(
      prevActiveStep => stepsArr[stepsArr.indexOf(prevActiveStep) + 1]
    )
  }

  const handleBack = () => {
    setActiveStep(
      prevActiveStep => stepsArr[stepsArr.indexOf(prevActiveStep) - 1]
    )
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={stepsArr.indexOf(activeStep)} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}
