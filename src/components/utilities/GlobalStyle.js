// global-style.js
import { createGlobalStyle } from 'styled-components';
import reboot from 'styled-reboot';

import { THEME } from '../../config';
 
const options = {
  fontFamilyBase: THEME.fontFamily,
  fontSizeBase: THEME.fontSize,
  bodyColor: THEME.colors.textPrimary,
  bodyBg: THEME.colors.background
};
 
const rebootCss = reboot(options);
 
const GlobalStyle = createGlobalStyle`
  ${rebootCss}

	.MuiPaper-root {   
    ::-webkit-scrollbar {
      width: 6px;
    }
    
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px #CECECE; 
        border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #CECECE; 
        -webkit-box-shadow: inset 0 0 6px #CECECE; 
    }
  }

	.Snackbar_snackbar-wrapper__ocbPJ {
		z-index: 1302 !important;
	}

	button:not(:disabled), [type='button']:not(:disabled), [type='reset']:not(:disabled), [type='submit']:not(:disabled):focus-visible{
		outline: none;
	}
`
 
export default GlobalStyle;
