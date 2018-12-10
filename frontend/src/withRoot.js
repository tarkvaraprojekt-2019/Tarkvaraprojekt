import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from './getPageContext';
import axios from 'axios';
import { getBaseUrl, getCurrentToken, isBrowser, isLoggedIn, logout } from './auth';


export const AxiosContext = React.createContext('default');

function withRoot(Component) {
  class WithRoot extends React.Component {
    muiPageContext = null;

    constructor(props) {
      super(props);
      this.muiPageContext = getPageContext();
      this.axios = axios.create({
        baseURL: getBaseUrl() + '/api/', 
        timeout: 5000, 
        headers: {
          'Auth-token': getCurrentToken()
        }
      })
      // Add general redirecting when auth fails
      this.axios.interceptors.response.use(null, (error) => {
        if (error.response.status === 401) {
          logout();
          return
        }
        return Promise.reject(error)
      })

      Date.prototype.toDateInputValue = (function () {
        const local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
      });
      
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#server-side-jss');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      if(!isLoggedIn() && isBrowser && this.props.location.pathname !== '/') {
        logout();
        return null;
      }


      return (
        <JssProvider generateClassName={this.muiPageContext.generateClassName}>
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.muiPageContext.theme}
            sheetsManager={this.muiPageContext.sheetsManager}
          >
            <AxiosContext.Provider value={this.axios}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline/>
              <Component {...this.props} axios={this.axios}/>
            </AxiosContext.Provider>
          </MuiThemeProvider>
        </JssProvider>
      );
    }
  }

  return WithRoot;
}

export default withRoot;
