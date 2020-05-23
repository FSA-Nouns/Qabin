import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

export default function JoinTooltips() {
  //   const [open, setOpen] = React.useState(false);

  // //   const handleTooltipClose = () => {
  // //     setOpen(false);
  // //   };

  // //   const handleTooltipOpen = () => {
  // //     setOpen(true);
  // //   };

  return <Tooltip disableFocusListener disableTouchListener title="Add" />
}

export const JoinTypeHints = [
  'Left nfnkfo;wnfo;wflfcfcmmvpmvdlkvldsmvdslkvldksnvlkdsnvlksdnvlsdknvldsnvldskvnsdlkvnsdlvnldsvnldsknvlsdkvndslvkndslnvdlskvnsdlkvndsklnvlsdknvs',
  'Left - Outer nfnkfo;wnfo;wflfcfcmmvpmvdlkvldsmvdslkvldksnvlkdsnvlksdnvlsdknvldsnvldskvnsdlkvnsdlvnldsvnldsknvlsdkvndslvkndslnvdlskvnsdlkvndsklnvlsdknvs',
  'Right nfnkfo;wnfo;wflfcfcmmvpmvdlkvldsmvdslkvldksnvlkdsnvlksdnvlsdknvldsnvldskvnsdlkvnsdlvnldsvnldsknvlsdkvndslvkndslnvdlskvnsdlkvndsklnvlsdknvs',
  'Right - Outer nfnkfo;wnfo;wflfcfcmmvpmvdlkvldsmvdslkvldksnvlkdsnvlksdnvlsdknvldsnvldskvnsdlkvnsdlvnldsvnldsknvlsdkvndslvkndslnvdlskvnsdlkvndsklnvlsdknvs',
  'Full nfnkfo;wnfo;wflfcfcmmvpmvdlkvldsmvdslkvldksnvlkdsnvlksdnvlsdknvldsnvldskvnsdlkvnsdlvnldsvnldsknvlsdkvndslvkndslnvdlskvnsdlkvndsklnvlsdknvs',
  'Full - OUTER nfnkfo;wnfo;wflfcfcmmvpmvdlkvldsmvdslkvldksnvlkdsnvlksdnvlsdknvldsnvldskvnsdlkvnsdlvnldsvnldsknvlsdkvndslvkndslnvdlskvnsdlkvndsklnvlsdknvs',
  'INNER nfnkfo;wnfo;wflfcfcmmvpmvdlkvldsmvdslkvldksnvlkdsnvlksdnvlsdknvldsnvldskvnsdlkvnsdlvnldsvnldsknvlsdkvndslvkndslnvdlskvnsdlkvndsklnvlsdknvs'
]
