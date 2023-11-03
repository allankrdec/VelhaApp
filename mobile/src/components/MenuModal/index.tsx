/* eslint-disable react/no-array-index-key */

/**
 * Módulo de componente MenuModal
 * @module MenuModal
 * @category Components
 */

import Icon from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { View, Text, Modal, StyleSheet, OpaqueColorValue } from 'react-native';

import { ButtonType } from '../../interfaces';
import { RFValueSp } from '../../util/functions';
import ButtonSp from '../ButtonSp';

interface IButtons {
  title: string;
  type: ButtonType;
  iconName?: keyof typeof Icon.glyphMap;
  iconColor?: string | OpaqueColorValue | undefined;
  iconSize?: number;
}

/**
 * Interface com propriedades do componente
 * @notExported
 */
interface IProps {
  titulo: string;
  visible: boolean;
  setModalVisible(visible: boolean): void;
  showCancelButton?: boolean;
  onPress(index: number): void;
  styleModal?: object;
  buttons: (IButtons | undefined)[];
  cancelTitle?: string;
}

/**
 * MenuModal é um componente modal usado para criar opções de escolha para o usuário.
 * Use da seguinte forma: </br>
 * <MenuModal {...props}/>
 * @param props
 */
export default function MenuModal(props: IProps) {
  function fechaModal() {
    const { setModalVisible } = props;
    if (setModalVisible) {
      setModalVisible(false);
    }
  }
  const {
    visible,
    titulo,
    styleModal,
    cancelTitle,
    onPress,
    buttons,
    showCancelButton,
    setModalVisible,
  } = props;

  // functions
  function renderButtons() {
    return buttons.map((e, i) => {
      if (e) {
        const propsButton: any = {};
        if (e.iconColor) {
          propsButton.iconColor = e.iconColor;
        }
        if (e.iconName) {
          propsButton.iconName = e.iconName;
        }
        if (e.iconSize) {
          propsButton.iconSize = e.iconSize;
        }

        return (
          <ButtonSp
            key={`key_modal_${i}`}
            type={e.type}
            title={e.title}
            onPress={() => onPress(i)}
            {...propsButton}
            styleContainer={{ marginTop: 15 }}
            style={{ height: RFValueSp(40) }}
            styleText={{ fontSize: RFValueSp(15) }}
          />
        );
      }
      return null;
    });
  }

  // renders
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => {
        fechaModal();
      }}
    >
      <View style={componentStyles.modalTransparency}>
        <View style={[componentStyles.modalBackgroundOutter, styleModal]}>
          <View style={componentStyles.modalBackgroundInner}>
            <Text style={componentStyles.modalTitulo}>{titulo}</Text>
            <View style={componentStyles.separador} />

            {renderButtons()}
            {showCancelButton ? (
              <ButtonSp
                type="warning"
                title={cancelTitle || 'Cancelar'}
                iconName="undo"
                onPress={() => setModalVisible(false)}
                styleContainer={{ marginTop: 15 }}
                style={{ height: RFValueSp(40) }}
                styleText={{ fontSize: RFValueSp(15) }}
              />
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}

MenuModal.defaultProps = {
  styleModal: {},
  showCancelButton: true,
  cancelTitle: 'Cancelar',
};

const componentStyles = StyleSheet.create({
  separador: {
    marginBottom: 10,
  },
  modalTitulo: {
    fontSize: RFValueSp(15),
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#202020',
  },
  modalButtons: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
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
