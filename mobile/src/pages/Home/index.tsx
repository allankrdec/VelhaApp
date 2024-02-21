/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/**
 * Componente da página home
 * @module Home
 * @category Page/Home
 */

// import * as Linking from 'expo-linking';
import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { useTheme } from 'styled-components';

import IconConfiguracao from '../../../assets/icons/IconConfiguracao.png';
import ButtonSp from '../../components/ButtonSp';
import MenuModal from '../../components/MenuModal';
import { Header, Title } from '../../components/StyledComponents/styles';
import TextSp from '../../components/TextSp';
import { KeysStorage } from '../../constants/global';
import { useGlobal } from '../../hooks/global';
import StorageService from '../../services/Storage';
import Estrategia from '../../util/Estrategia';
import { MessageDialog, QuestionDialog, RFValueSp, sleep } from '../../util/functions';
import Tabuleiro from './components/Tabuleiro';
import { Body, Container } from './styles';

/**
 * Componente da página home
 */
export default function Home() {
  const theme = useTheme();
  const global = useGlobal();
  const nomeDificuldade = ['Muito Fácil', 'Fácil', 'Normal', 'Difícil'];

  const [showMenu, setShowMenu] = useState(false);
  const [showMenuDificuldade, setShowMenuDificuldade] = useState(false);
  const [posicoes, setPosicoes] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [reiniciandoPartida, setReiniciandoPartida] = useState(false);
  const [posicoesVitoria, setPosicoesVitoria] = useState(['', '', '']);
  const [ec] = useState(new Estrategia());
  const [dificuldade, setDificuldade] = useState(2);
  const [computadorInicia, setComputadorInicia] = useState(false);
  const [qtdPartidas, setQtdPartidas] = useState(0);
  const [qtdVitorias, setQtdVitorias] = useState(0);
  const [qtdDerrotas, setQtdDerrotas] = useState(0);
  const [emAndamento, setEmAndamento] = useState(false);

  // callbacks
  /**
   * useCallback usado para sair
   */
  const doExit = useCallback(() => {
    // QuestionDialog('Atenção', 'Deseja sair?', async () => {
    // await deleteTemps();
    BackHandler.exitApp();
    // });
  }, []);

  const processaJogagaHumano = useCallback(
    (x: number, y: number) => {
      setEmAndamento(true);
      ec.marcarPosicaoTabuleiro(x * 3 + y, Estrategia.simboloHumano);

      ec.getTabuleiro();

      const posicoesTemp = [...posicoes];
      const jogada = x * 3 + y;
      const y1 = jogada % 3;
      const x1 = Math.trunc(jogada / 3);

      posicoesTemp[x1][y1] = Estrategia.simboloHumano;
      setPosicoes(posicoesTemp);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [posicoes]
  );

  const reiniciaPartida = (dificuldade: number) => {
    setReiniciandoPartida(true);
    const posicoes = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];

    setPosicoes(posicoes);
    setPosicoesVitoria(['', '', '']);
    ec.setDificuldade(dificuldade);
    ec.limparTabuleiro();

    const jogada = ec.novoJogo(computadorInicia);
    if (jogada >= 0) {
      const y = jogada % 3;
      const x = Math.trunc(jogada / 3);
      const posicoesTemp = [...posicoes];
      posicoesTemp[x][y] = Estrategia.simboloComputador;
      setPosicoes(posicoesTemp);
      setEmAndamento(true);
    } else {
      setEmAndamento(false);
    }
    setTimeout(() => {
      setReiniciandoPartida(false);
    }, 500);
  };

  const processaJogadacomputador = () => {
    const jogada = ec.proximaJogadaComputador();
    ec.marcarPosicaoTabuleiro(jogada, Estrategia.simboloComputador);
    const y = jogada % 3;
    const x = Math.trunc(jogada / 3);
    const posicoesTemp = [...posicoes];
    posicoesTemp[x][y] = Estrategia.simboloComputador;
    setPosicoes(posicoesTemp);
  };

  const alteraDificuldade = (dificuldade: number) => {
    setDificuldade(dificuldade);
    reiniciaPartida(dificuldade);
  };

  const salvaPlacar = async (
    qtdPartidas: number,
    qtdVitorias: number,
    qtdDerrotas: number,
    dificuldade: number
  ) => {
    await StorageService.storeObj(KeysStorage.placar, {
      qtdPartidas,
      qtdVitorias,
      qtdDerrotas,
      dificuldade,
    });
  };

  const carregaPlacar = async () => {
    const placar = await StorageService.getDataObj(KeysStorage.placar);
    if (placar) {
      const { qtdPartidas, qtdVitorias, qtdDerrotas, dificuldade } = placar;
      ec.setDificuldade(dificuldade);

      setQtdPartidas(qtdPartidas || 0);
      setQtdVitorias(qtdVitorias || 0);
      setQtdDerrotas(qtdDerrotas || 0);
      setDificuldade(dificuldade || 0);
    } else {
      ec.setDificuldade(dificuldade);
    }

    ec.limparTabuleiro();
    setPosicoesVitoria(['', '', '']);
  };

  const criaListaVitoria = (listaQueGanou: number[] | null) => {
    if (listaQueGanou) {
      const py0 = listaQueGanou[0] % 3;
      const px0 = Math.trunc(listaQueGanou[0] / 3);

      const py1 = listaQueGanou[1] % 3;
      const px1 = Math.trunc(listaQueGanou[1] / 3);

      const py2 = listaQueGanou[2] % 3;
      const px2 = Math.trunc(listaQueGanou[2] / 3);
      setPosicoesVitoria([`${px0}${py0}`, `${px1}${py1}`, `${px2}${py2}`]);
    }
  };
  const verificaFim = (): boolean => {
    // verifica se o humano ganhou
    if (ec.verificaSeGanhou(Estrategia.simboloHumano)) {
      setComputadorInicia(false);
      setQtdVitorias(qtdVitorias + 1);

      setQtdPartidas(qtdPartidas + 1);

      const pGanhou = ec.getlistaQueGanhou();
      criaListaVitoria(pGanhou);
      salvaPlacar(qtdPartidas + 1, qtdVitorias + 1, qtdDerrotas, dificuldade);

      MessageDialog('Você ganhou!');
      return true;
    }

    // verifica se o computador ganhou
    if (ec.verificaSeGanhou(Estrategia.simboloComputador)) {
      setComputadorInicia(true);
      setQtdDerrotas(qtdDerrotas + 1);
      setQtdPartidas(qtdPartidas + 1);

      const pGanhou = ec.getlistaQueGanhou();
      criaListaVitoria(pGanhou);
      salvaPlacar(qtdPartidas + 1, qtdVitorias, qtdDerrotas + 1, dificuldade);

      MessageDialog('Você perdeu!');
      return true;
    }

    // se deu empate
    if (ec.verificaEmpate()) {
      setComputadorInicia(!computadorInicia);
      setQtdPartidas(qtdPartidas + 1);
      salvaPlacar(qtdPartidas + 1, qtdVitorias, qtdDerrotas, dificuldade);
      MessageDialog('Jogo Empatado!');
      // qtdPartidasEmpates++;
      return true;
    }
    return false;
  };

  /**
   * Função que controla a jogada humana
   */
  const backPressed = useCallback(() => {
    doExit();
    return true;
  }, [doExit]);

  /**
   * useEffect que adiciona ou remove o evento hardwareBackPress
   */
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backPressed);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backPressed);
    };
  }, [backPressed]);

  useEffect(() => {
    carregaPlacar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Retorno principal do componente
   */
  return (
    <Container>
      <Header style={{ justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
        <MenuModal
          titulo="Selecione uma opção"
          buttons={[
            // {
            //   title: 'Política de Privacidade',
            //   type: 'primary',
            //   iconName: 'book',
            // },
            {
              title: 'Dificuldade',
              type: 'primary',
              iconName: 'level-up',
            },
          ]}
          visible={showMenu}
          setModalVisible={setShowMenu}
          onPress={(i) => {
            switch (i) {
              // case 0:
              //   Linking.openURL(
              //     'https://speedylinux.com.br/politica-de-privacidade-velha-app'
              //   );
              //   break;

              case 0:
                setShowMenuDificuldade(true);
                break;

              default:
                break;
            }
            setShowMenu(false);
          }}
        />

        <MenuModal
          titulo="Selecione a dificuldade"
          buttons={[
            {
              title: 'Muito Fácil',
              type: 'primary',
            },
            {
              title: 'Fácil',
              type: 'primary',
            },
            {
              title: 'Normal',
              type: 'primary',
            },
            {
              title: 'Difícil',
              type: 'primary',
            },
          ]}
          visible={showMenuDificuldade}
          setModalVisible={setShowMenuDificuldade}
          onPress={(i) => {
            alteraDificuldade(i);
            setShowMenuDificuldade(false);
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <View style={{ width: RFValueSp(35) }} />
            {/* <ButtonSp
              title=""
              type="warning"
              iconImage={IconVoltar}
              iconSize={RFValueSp(16)}
              style={{
                borderColor: theme.colors.primary,
                backgroundColor: theme.colors.primary,
                width: RFValueSp(35),
              }}
              onPress={() => {
                doExit();
              }}
            /> */}
          </View>

          <Title style={{ textAlign: 'center', fontSize: RFValueSp(18) }}>Jogo da Velha</Title>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <ButtonSp
              title=""
              type="warning"
              showBackground={false}
              iconImage={IconConfiguracao}
              iconSize={RFValueSp(20)}
              style={{
                borderColor: theme.colors.primary,
                backgroundColor: theme.colors.primary,
                width: RFValueSp(35),
              }}
              onPress={() => {
                setShowMenu(true);
              }}
            />
          </View>
        </View>
      </Header>
      <View
        style={{
          marginTop: 10,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TextSp>Dificuldade: {nomeDificuldade[dificuldade]}</TextSp>
      </View>
      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          marginBottom: 0,
        }}
      >
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextSp>Partidas: {qtdPartidas}</TextSp>
          <TextSp>Vitórias: {qtdVitorias}</TextSp>
          <TextSp>Derrotas: {qtdDerrotas}</TextSp>
        </View>
        <View style={{ height: 50 }} />
      </View>
      <Body>
        {!reiniciandoPartida && (
          <Tabuleiro
            buttonnClick={async (x, y) => {
              if (global.loading) {
                return;
              }
              try {
                global.setLoading(true);
                processaJogagaHumano(x, y);
                if (verificaFim()) {
                  setEmAndamento(false);
                  return;
                }
                await sleep(500);
                processaJogadacomputador();
                if (verificaFim()) {
                  setEmAndamento(false);
                }
              } finally {
                setTimeout(() => global.setLoading(false), 500);
              }
            }}
            posicoes={posicoes}
            vitoriaPosicoes={posicoesVitoria}
          />
        )}
      </Body>
      <View style={{ marginBottom: 50, flexDirection: 'row', justifyContent: 'center' }}>
        <ButtonSp
          title={emAndamento ? 'Reiniciar Partida' : 'Iniciar Partida'}
          type="warning"
          onPress={() => {
            if (emAndamento) {
              QuestionDialog('Atenção', 'Reiniciar partida?', () => {
                reiniciaPartida(dificuldade);
              });
            } else {
              reiniciaPartida(dificuldade);
            }
          }}
          styleContainer={{ width: 200 }}
        />
      </View>
    </Container>
  );
}
