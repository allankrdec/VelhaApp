/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Image } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import imgX from '../../../../../assets/images/imageX.png';
import imgCirculo from '../../../../../assets/images/imgCirculo.png';
import { Container, ContainerBotao, ContainerJogavel, Linha } from './styles';

interface IProps {
  posicoes: string[][];
  vitoriaPosicoes: string[];
  buttonnClick: (linha: number, coluna: number) => void;
}

const Tabuleiro = (props: IProps) => {
  const theme = useTheme();
  const { posicoes, vitoriaPosicoes, buttonnClick } = props;

  const localPosicoes: any[][] = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];

  if (posicoes) {
    for (let x = 0; x < posicoes.length; x++) {
      for (let y = 0; y < posicoes[x].length; y++) {
        if (posicoes[x][y] === 'X') {
          localPosicoes[x][y] = imgX;
        } else if (posicoes[x][y] === 'O') {
          localPosicoes[x][y] = imgCirculo;
        } else {
          localPosicoes[x][y] = undefined;
        }
      }
    }
  }

  const buscaCorFundo = (x: number, y: number) => {
    const strPosicoes = `${x}${y}`;
    if ((vitoriaPosicoes || []).includes(strPosicoes)) {
      return theme.colors.backgroundDisabled;
    }
    return theme.colors.background;
  };

  return (
    <Container>
      <ContainerJogavel>
        {localPosicoes.map((linha, x) => {
          return (
            <Linha key={`linha_${x}`}>
              {linha.map((ele, y) => {
                return (
                  <GestureHandlerRootView key={`elemento_${x}_${y}`}>
                    <ContainerBotao
                      style={{
                        borderBottomWidth: x < 2 ? 1 : 0,
                        borderRightWidth: y < 2 ? 1 : 0,
                        backgroundColor: buscaCorFundo(x, y),
                      }}
                    >
                      <TouchableOpacity
                        disabled={ele !== undefined}
                        activeOpacity={0.7}
                        onPress={() => {
                          if (buttonnClick) {
                            buttonnClick(x, y);
                          }
                        }}
                      >
                        <Image source={ele} style={{ width: 80, height: 80 }} />
                      </TouchableOpacity>
                    </ContainerBotao>
                  </GestureHandlerRootView>
                );
              })}
            </Linha>
          );
        })}
      </ContainerJogavel>
    </Container>
  );
};

export default Tabuleiro;
