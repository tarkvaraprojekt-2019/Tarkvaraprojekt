/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss';
import { createGenerateClassName, createMuiTheme } from '@material-ui/core/styles';

// A theme with custom primary and secondary color.
// It's optional.
const primary = "#e47e00"
const secondary = "#b25e00"
const realsecondary = "#636363"

const theme = createMuiTheme({
    palette: {
        primary: {
            darker: "#b25e00",
            main: "#e47e00",
        },
        secondary: {
            main: "#636363",
        },
    },
    typography: {
        useNextVariants: true,
    },
  overrides: {
    MuiInput: {
      disabled: {
        //backgroundColor: "black",

        //backgroundColor: 'black',
        color: '#b16508',
      },

    },
  }
});

function createPageContext() {
    return {
        theme,
        // This is needed in order to deduplicate the injection of CSS in the page.
        sheetsManager: new Map(),
        // This is needed in order to inject the critical CSS.
        sheetsRegistry: new SheetsRegistry(),
        // The standard class name generator.
        generateClassName: createGenerateClassName(),
    };
}

export default function getPageContext() {
    // Make sure to create a new context for every server-side request so that data
    // isn't shared between connections (which would be bad).
    if (!process.browser) {
        return createPageContext();
    }

    // Reuse context on the client-side.
    if (!global.__INIT_MATERIAL_UI__) {
        global.__INIT_MATERIAL_UI__ = createPageContext();
    }

    return global.__INIT_MATERIAL_UI__;
}
