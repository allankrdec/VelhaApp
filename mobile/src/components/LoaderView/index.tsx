/**
 * Módulo de componente LoaderView
 * @module LoaderView
 * @category Components
 */

import React from 'react';
import { Image, View } from 'react-native';

import imgAnimacao from '../../../assets/loader.gif';
import { useGlobal } from '../../hooks/global';

/**
 * LoaderView é um componente que mostra uma animação enquanto algo é carregado no app.
 * Use da seguinte forma: </br>
 * <LoaderView/>
 */
export default function LoaderView() {
  const global = useGlobal();

  // <Modal transparent visible={global.loading}>
  if (global.loading)
    return (
      <View style={{ height: '100%', width: '100%', zIndex: 10000, position: 'absolute' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(52, 52, 52, 0.1)',
          }}
        >
          <Image
            resizeMode="contain"
            // width={0}
            // height={0}
            style={{ maxWidth: '20%' }}
            source={imgAnimacao}
          />
        </View>
      </View>
    );

  return null;
}
