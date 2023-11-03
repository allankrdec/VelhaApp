/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Módulo contendo o tema do APP
 * @module theme/types
 * @category Styles/Global
 */
import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    fonts: {
      PoppinsBold: string;
      PoppinsLight: string;
      PoppinsMedium: string;
      PoppinsRegular: string;
      PoppinsSemiBold: string;

      RobotoBlack: string;
      RobotoBold: string;
      RobotoLight: string;
      RobotoMedium: string;
      RobotoRegular: string;
    };
    colors: {
      // tela
      primary: string;
      gradient: string;
      highlight: string;
      highlightClear: string;
      tabBar: string;
      link: string;

      error: string;

      // buttons
      buttonPrimary: string;
      buttonPrimaryLigth: string;
      buttonPrimaryBorder: string;

      buttonSecondary: string;
      buttonSecondaryBorder: string;
      buttonSecondaryLigth: string;

      buttonSuccess: string;
      buttonSuccessBorder: string;
      buttonSuccessLigth: string;
      buttonSuccessDark: string;

      buttonWarning: string;
      buttonWarningLigth: string;
      buttonWarningBorder: string;

      buttonDanger: string;
      buttonDangerLigth: string;
      buttonDangerBorder: string;

      shape: string;
      shapeLigth: string;
      shapeDark: string;
      background: string;
      titleDark: string;
      titleLigth: string;
      selection: string;
      backgroundDisabled: string;
      textDisabled: string;
      buttonPressed: string;
      text: string;

      transparent: string;
    };
  }
}
