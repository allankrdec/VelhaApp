/**
 * Módulo de componente ButtonSp
 * @module ButtonSp
 * @category Components
 */

/* eslint-disable @typescript-eslint/naming-convention */
import Icon from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  TextStyle,
  StyleProp,
  ViewStyle,
  OpaqueColorValue,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { GenericTouchableProps } from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
import { useTheme } from 'styled-components/native';

import theme from '../../global/styles/theme';
import { ButtonType } from '../../interfaces';
import { RFValueSp } from '../../util/functions';

/**
 * Interface com propriedades do componente
 * @notExported
 */
interface Props extends GenericTouchableProps {
  title: string;
  type: ButtonType;
  styleText?: TextStyle;
  style?: ViewStyle;
  styleContainer?: StyleProp<ViewStyle>;
  iconName?: keyof typeof Icon.glyphMap;
  iconColor?: string | OpaqueColorValue | undefined;
  colorDisabled?: string | OpaqueColorValue | undefined;
  iconSize?: number;
  disabled?: boolean;
  iconImage?: any;
  showBackground?: boolean;
}

/**
 * Componente ButtonSp usado em quase todas as telas do App. Use da seguinte forma: </br>
 * <ButtonSp {...props}/>
 * @param props
 */
export default function ButtonSp(props: Props) {
  const {
    title,
    type,
    style,
    styleText,
    iconName,
    iconColor,
    colorDisabled,
    disabled,
    iconSize,
    styleContainer,
    iconImage,
    showBackground,

    ...rest
  } = props;

  const theme = useTheme();

  let iconColorTemp = iconColor;

  let backgroundColor = theme.colors.buttonPrimary;
  let gradientColor = theme.colors.buttonPrimaryLigth;
  let borderColor = theme.colors.buttonPrimaryBorder || undefined;

  if (type) {
    switch (type) {
      case 'primary':
        backgroundColor = theme.colors.buttonPrimary;
        gradientColor = theme.colors.buttonPrimaryLigth;
        borderColor = undefined;

        break;
      case 'secondary':
        backgroundColor = theme.colors.buttonSecondary;
        gradientColor = theme.colors.buttonSecondaryLigth;
        borderColor = theme.colors.buttonSecondaryBorder || undefined;
        iconColorTemp = borderColor;
        break;

      case 'warning':
        backgroundColor = theme.colors.buttonWarning;
        gradientColor = theme.colors.buttonWarningLigth;
        borderColor = theme.colors.buttonWarningBorder || undefined;
        break;

      case 'danger':
        backgroundColor = theme.colors.buttonDanger;
        gradientColor = theme.colors.buttonDangerLigth;
        borderColor = undefined;
        break;

      case 'success':
        backgroundColor = theme.colors.buttonSuccess;
        gradientColor = theme.colors.buttonSuccessLigth;
        borderColor = undefined;
        break;

      default:
        backgroundColor = theme.colors.buttonPrimary;
        gradientColor = theme.colors.buttonPrimaryLigth;
        borderColor = theme.colors.buttonPrimaryBorder || undefined;
        break;
    }
  }

  return (
    <GestureHandlerRootView style={styleContainer}>
      <LinearGradient
        colors={
          showBackground
            ? [gradientColor, backgroundColor]
            : [theme.colors.transparent, theme.colors.transparent]
        }
        style={{
          ...localStyles.buttonContainer,
          borderWidth: borderColor ? 1 : 0,
          borderColor,
          height: Math.max(iconSize!, localStyles.text.fontSize) + RFValueSp(13),
          ...style,
        }}
      >
        <TouchableOpacity
          disabled={disabled}
          activeOpacity={0.7}
          style={{
            ...localStyles.button,

            borderColor,
            height: Math.max(iconSize!, localStyles.text.fontSize) + RFValueSp(13),
            ...style,
          }}
          {...rest}
        >
          {iconImage && (
            <Image
              source={iconImage}
              style={{ width: iconSize, height: iconSize, tintColor: iconColorTemp }}
            />
          )}
          {iconName && (
            <Icon
              name={iconName}
              size={iconSize}
              color={disabled ? colorDisabled : iconColorTemp}
            />
          )}
          {title ? (
            <Text
              style={{
                ...localStyles.text,
                color: disabled ? colorDisabled : iconColorTemp,
                ...styleText,
              }}
            >
              {title || ''}
            </Text>
          ) : null}
        </TouchableOpacity>
      </LinearGradient>
    </GestureHandlerRootView>
  );
}

ButtonSp.defaultProps = {
  styleText: {},
  style: {},
  iconName: '',
  iconColor: '#ffff',
  colorDisabled: '#afafaf',
  iconSize: RFValueSp(18),
  disabled: false,
  styleContainer: {},
  iconImage: undefined,
  showBackground: true,
};

const localStyles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    padding: 5,
    margin: 2,
  },

  text: {
    fontSize: RFValueSp(13),
    fontFamily: theme.fonts.PoppinsRegular,
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
});
