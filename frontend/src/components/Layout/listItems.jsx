import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import BackupIcon from '@material-ui/icons/Backup';
import LockIcon from '@material-ui/icons/Lock';
import { Link } from 'gatsby';

import { isAdmin } from '../../auth';

export const mainListItems = (props) => (
    <div>
        <Link to="/overview">
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Ülevaade"/>
            </ListItem>
        </Link>
      <Link to="/password">
        <ListItem button>
          <ListItemIcon>
            <LockIcon/>
          </ListItemIcon>
          <ListItemText primary="Muuda parooli"/>
        </ListItem>
      </Link>
      {console.log('is admin: ', isAdmin())}
      {isAdmin() && (
        <Link to="/accounts">
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="Kasutajad"/>
          </ListItem>
        </Link>)
      }
      {isAdmin() &&
        <Link to="/report/graphs">
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon/>
                </ListItemIcon>
                <ListItemText primary="Aruandlus"/>
            </ListItem>
        </Link>
      }
      {isAdmin() &&
      <Link to="/backup">
        <ListItem button>
          <ListItemIcon>
            <BackupIcon/>
          </ListItemIcon>
          <ListItemText primary="Varundused"/>
        </ListItem>
      </Link>
      }
        
    </div>
);
