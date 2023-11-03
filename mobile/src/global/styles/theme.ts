// eslint-disable-next-line no-use-before-define
/**
 * Módulo contendo o tema do APP
 * @module theme
 * @category Styles/Global
 */

import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  fonts: {
    PoppinsBold: 'Poppins-Bold',
    PoppinsLight: 'Poppins-Light',
    PoppinsMedium: 'Poppins-Medium',
    PoppinsRegular: 'Poppins-Regular',
    PoppinsSemiBold: 'Poppins-SemiBold',

    RobotoBlack: 'Roboto-Black',
    RobotoBold: 'Roboto-Bold',
    RobotoLight: 'Roboto-Light',
    RobotoMedium: 'Roboto-Medium',
    RobotoRegular: 'Roboto-Regular',
  },
  colors: {
    // tela
    primary: '#071B8B',
    gradient: '#015692',
    highlight: '#12B0E5',
    highlightClear: '#79dcfc',
    tabBar: '#071B8B',
    link: '#0099D6',

    error: '#ee6002',

    // buttons
    buttonPrimary: '#071B8B',
    buttonPrimaryLigth: '#015692',
    buttonPrimaryBorder: '#071B8B',

    buttonSecondary: '#FFFFFF',
    buttonSecondaryBorder: '#071B8B',
    buttonSecondaryLigth: '#FFFFFF',

    buttonSuccess: '#00A856',
    buttonSuccessBorder: '',
    buttonSuccessLigth: '#00A856',
    buttonSuccessDark: '#008545',

    buttonWarning: '#e75f04',
    buttonWarningLigth: '#f77723',
    buttonWarningBorder: '',

    buttonDanger: 'rgba(169, 6, 11, 1)',
    buttonDangerLigth: 'rgba(169, 6, 11, 1)',
    buttonDangerBorder: '',

    shape: '#fbfbfb',
    shapeLigth: '#f3f3f3',
    shapeDark: '#E6E6E6',
    background: '#FFFFFF',
    titleDark: '#6B7480',
    titleLigth: '#fff',
    selection: '#ced4cb',
    backgroundDisabled: '#e8e8e8',
    textDisabled: '#7d7c7c',
    buttonPressed: '#d2e6ff',
    text: '#35393F',

    transparent: '#ffffff00',
  },
};

export default theme;
