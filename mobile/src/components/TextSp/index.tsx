/**
 * Módulo de componente TextSp
 * @module TextSp
 * @category Components
 */

import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from 'styled-components';

import { RFValueSp } from '../../util/functions';

/**
 * Interface com propriedades do componente
 * @notExported
 */
interface IProps extends TextProps {
  disabled?: boolean;
  numberOfLines?: number;
}

/**
 * TextSp é um componente que apresenta um texto usando o componente Text do react native.
 * Use da seguinte forma: </br>
 * <TextSp {...props}/>
 * @param props
 */
const TextSp = (props: IProps) => {
  const theme = useTheme();
  const { disabled, numberOfLines, ...rest } = props;
  const colorStyle = disabled
    ? { color: theme.colors.textDisabled }
    : { color: theme.colors.text };

  return (
    <Text
      numberOfLines={numberOfLines}
      style={{ fontSize: RFValueSp(16), ...colorStyle }}
      {...rest}
    />
  );
};

TextSp.defaultProps = {
  disabled: false,
  numberOfLines: 1,
};
export default TextSp;
