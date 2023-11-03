/**
 * Módulo de componente LoaderView
 * @module LoaderView
 * @category Components
 */

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
  children: any;
  visible: boolean;
  styleInner?: ViewStyle;
  styleOutter?: ViewStyle;
  zIndex?: number;
}

export default function ModalSp(props: IProps) {
  const { children, visible, styleInner, styleOutter, zIndex } = props;

  const localStyleInner: any = styleInner;
  const localStyleOutter: any = styleOutter;

  if (visible) {
    return (
      <View style={{ height: '100%', width: '100%', zIndex, position: 'absolute' }}>
        <View style={componentStyles.modalTransparency}>
          <View style={{ ...componentStyles.modalBackgroundOutter, ...localStyleInner }}>
            <View style={{ ...componentStyles.modalBackgroundInner, ...localStyleOutter }}>
              {children}
            </View>
          </View>
        </View>
      </View>
    );
  }

  return null;
}

const componentStyles = StyleSheet.create({
  modalTransparency: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalBackgroundOutter: {
    backgroundColor: 'white',
    borderRadius: 10,
    minWidth: 250,
  },
  modalBackgroundInner: {
    margin: 10,
  },
});

ModalSp.defaultProps = {
  styleInner: {},
  styleOutter: {},
  zIndex: 1000,
};
