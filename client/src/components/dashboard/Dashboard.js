import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Background from "../img/bg.png";
import Background1 from "../img/upload.png";
import Background2 from "../img/security.png";
import Background3 from "../img/time.png";
import Background4 from "../img/group.png";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { palette } from '@material-ui/system';

import Link from '@material-ui/core/Link';

import Stockcard from '../stock/Stockcard';
import './Dashboard.css'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Pape Trade
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createMuiTheme();

var cardStyle = {
    display: 'block',
    width: '45vw',
    height: '30vw',
    '@media (max-width:600px)': {
        width: '55vw',
        height: '60vw',
        },
    '@media (max-width:300px)': {
        width: '55vw',
        height: '60vw',
        },
}
var cardmediaStyle = {
    height: '100%',
    width: '100%',
    objectFit: 'cover'
}

var cardcontentstyle = {
    paddingTop: '14.25%'
}

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

theme.typography.h4 = {
  fontSize: '0.8rem',
  '@media (min-width:600px)': {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.6rem',
  },
};

theme.typography.h6 = {
  fontSize: '0.7rem',
  '@media (min-width:600px)': {
    fontSize: '1.0rem',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.3rem',
  },
};


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: '77vh',
    '& > *': {
      //margin: theme.spacing(1),
      width: '22ch',
    },
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  image: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  image1: {
    backgroundImage: `url(${Background1})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    objectFit: 'cover',
  },
  image2: {
    backgroundImage: `url(${Background2})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  image3: {
    backgroundImage: `url(${Background3})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    //backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  image4: {
    backgroundImage: `url(${Background4})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
   appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  footer: {
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(6),
  },
  about: {
    
    padding: theme.spacing(8),

  },
  
}));



export default function Dashboard() {
  const classes = useStyles();

    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


    return(
        <div class="guide">
            <center>
                {/* <ThemeProvider theme={theme}>
                    <Typography variant="h4">Welcome to Secured File Sharing Application</Typography>
                </ThemeProvider> */}
                {/* <Divider className={classes.divider} /> */}
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    {/* <Grid item xs={false} sm={false} md={1} lg={false} xl={false}/> */}
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.image} />
                    {/* <Grid item xs={false} sm={false} md={1} lg={false} xl={false}/> */}
                </Grid>
                {/* <Divider className={classes.divider} /> */}
                <Box pt={3} >
                <container>
                <Typography variant="h6" align="center" gutterBottom className={classes.about}>
                About Web Application
                </Typography>
                <Typography variant="h6" align="center" gutterBottom >
                Application that attempts to reproduce or duplicate some or all the features of a live stock market on a computer so that a player may practice trading stocks without financial risk.
                </Typography>
                
                </container>
                <footer className={classes.footer}>
                  <Typography variant="h6" align="center" gutterBottom>
                   Pape Trade
                  </Typography>
                  <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Hope you have a great experience!
                  </Typography>
                  <Copyright />
                </footer>
              </Box>
                 
            </center>

        </div>

    );

}