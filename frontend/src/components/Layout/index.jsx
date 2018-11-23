import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { navigate } from 'gatsby';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

import { mainListItems } from './listItems';
import ErrorBar from './ErrorBar';

import { logout } from '../../auth';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
});

class Dashboard extends React.Component {
  state = {
    drawerOpen: false,
    errOpen: false,
  };

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  handleErrClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ errOpen: false });
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.error) {
      this.setState({ errOpen: nextProps.error !== '' });
    }
  }

  render() {
    const { classes } = this.props;

    return <React.Fragment>
      <CssBaseline/>
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.drawerOpen && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.drawerOpen} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.drawerOpen && classes.menuButtonHidden,
              )}
            >
              <MenuIcon/>
            </IconButton>

            <Typography variant="h6" color="inherit" noWrap className={classes.title}>
              {this.props.title}
            </Typography>

            <IconButton color="inherit" onClick={() => logout(() => navigate('/'))}>
              <PowerSettingsNew color="secondary"/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.drawerOpen && classes.drawerPaperClose),
          }}
          open={this.state.drawerOpen}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon/>
            </IconButton>
          </div>
          <Divider/>
          <List>{mainListItems()}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer}/>
          {this.props.children}
        </main>


        <ErrorBar
          open={this.state.errOpen}
          onClose={this.handleErrClose}
          message={this.props.error}
        />

      </div>
    </React.Fragment>;
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  error: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default withStyles(styles)(Dashboard);
