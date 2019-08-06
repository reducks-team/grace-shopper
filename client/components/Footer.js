import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import indigo from '@material-ui/core/colors/indigo'

//import HUE from '@material-ui/core/colors/HUE'
// import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    minHeight: '10vh',
    backgroundColor: '#00BCD4'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: '#00BCD4'
  }
}))

export default function StickyFooter() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        {/* <Typography variant="h2" component="h1" gutterBottom>
          Sticky footer
        </Typography> */}
        {/* <Typography variant="h5" component="h2" gutterBottom>
          {'Pin a footer to the bottom of the viewport.'}
          {'The footer will move as the main element of the page grows.'}
        </Typography> */}
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">Built By the Reducks Team</Typography>
        </Container>
      </footer>
    </div>
  )
}

// import React from 'react'
// const footer = () => {
//   return (
//     <div>
//       <p>Buy a duck, please</p>
//     </div>
//   )
// }

// export default footer
