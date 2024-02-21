/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
export default class Estrategia {
  private listaPosicoesGanha: number[][];
  private listaPosicoesComecar: number[][];
  private listaAdjacentes: number[][];
  private dificuldade: number;
  private ultimaJogadaComputador: number;
  private ultimaJogadaHumano: number;
  private qtdJogadas: number;
  private primeiraJogadaHumano: number;
  private primeiraJogadaComputador: number;
  private computadorComecou: boolean;
  private tabuleiro: string;
  private listaQueGanhou: number[] | null;

  public static simboloComputador: string = 'O';
  public static simboloHumano: string = 'X';

  constructor() {
    this.ultimaJogadaComputador = -1;
    this.ultimaJogadaHumano = -1;
    this.primeiraJogadaHumano = -1;
    this.primeiraJogadaComputador = -1;
    this.qtdJogadas = 0;
    this.computadorComecou = false;
    this.tabuleiro = '         ';
    this.listaQueGanhou = null;

    this.listaPosicoesGanha = [];
    this.listaPosicoesComecar = [];
    this.listaAdjacentes = [];

    this.listaPosicoesGanha.push([0, 1, 2]);
    this.listaPosicoesGanha.push([3, 4, 5]);
    this.listaPosicoesGanha.push([6, 7, 8]);

    this.listaPosicoesGanha.push([0, 3, 6]);
    this.listaPosicoesGanha.push([1, 4, 7]);
    this.listaPosicoesGanha.push([2, 5, 8]);

    this.listaPosicoesGanha.push([0, 4, 8]);
    this.listaPosicoesGanha.push([2, 4, 6]);

    this.listaPosicoesComecar.push([1, 3, 4, 5, 7]); // muito fácil
    this.listaPosicoesComecar.push([1, 2, 4, 6, 8]); // fácil
    this.listaPosicoesComecar.push([0, 2, 5, 6, 8]); // normal
    this.listaPosicoesComecar.push([0, 2, 4, 6, 8]); // difícil

    this.listaAdjacentes.push([0, 1, 3]); // posicoes ao lado do 0
    this.listaAdjacentes.push([2, 1, 5]); // posicoes ao lado do 2
    this.listaAdjacentes.push([6, 3, 7]); // posicoes ao lado do 6
    this.listaAdjacentes.push([8, 7, 5]); // posicoes ao lado do 8

    this.dificuldade = 0;
    this.novoJogo(false);
  }

  private gerarChance(): number {
    const gerador = new Random();
    return gerador.nextInt(99);
  }

  public novoJogo(computador: boolean): number {
    this.listaQueGanhou = null;
    this.computadorComecou = computador;
    this.ultimaJogadaComputador = -1;
    this.ultimaJogadaHumano = -1;
    this.primeiraJogadaHumano = -1;
    this.primeiraJogadaComputador = -1;
    this.qtdJogadas = 0;
    this.limparTabuleiro();
    if (computador) {
      const jogada = this.proximaJogadaComputador();
      this.marcarPosicaoTabuleiro(jogada, Estrategia.simboloComputador);
      return jogada;
    }
    return -1;
  }

  public limparTabuleiro(): void {
    this.tabuleiro = '         ';
  }

  private proximaJogadaGanhar(simboloPerde: string, simboloGanha: string): number {
    // testa se tem como ganhar com a próxima rodada
    let encontrou: number;
    let posLivre: number = -1;
    for (let x = 0; x < this.listaPosicoesGanha.length; x++) {
      encontrou = 0;
      posLivre = -1;
      for (let y = 0; y < this.listaPosicoesGanha[x].length; y++) {
        if (this.tabuleiro[this.listaPosicoesGanha[x][y]] === simboloGanha) {
          encontrou++;
        } else if (this.tabuleiro[this.listaPosicoesGanha[x][y]] === simboloPerde) {
          encontrou = 0;
          break;
        } else posLivre = this.listaPosicoesGanha[x][y];
        if (encontrou >= 2 && posLivre > -1) {
          return posLivre;
        }
      }
    }
    return -1;
  }

  public buscaListaPosLivres(): number[] {
    const retorno: number[] = [];
    for (let i = 0; i < this.tabuleiro.length; i++) {
      if (this.tabuleiro.charAt(i) === ' ') retorno.push(i);
    }
    return retorno;
  }

  private proximaJogadaAleatoria(): number {
    const gerador = new Random();
    const lista = this.buscaListaPosLivres();
    return lista[gerador.nextInt(lista.length)];
  }

  public verificaSeGanhou(simbolo: string): boolean {
    let encontrou: number;
    // const ilista: number = 0;
    for (let x = 0; x < this.listaPosicoesGanha.length; x++) {
      encontrou = 0;
      for (let y = 0; y < this.listaPosicoesGanha[x].length; y++) {
        if (this.tabuleiro[this.listaPosicoesGanha[x][y]] === simbolo) {
          encontrou++;
        } else {
          encontrou = 0;
          break;
        }
        if (encontrou === 3) {
          this.listaQueGanhou = this.listaPosicoesGanha[x];
          return true;
        }
      }
    }
    return false;
  }

  public verificaEmpate(): boolean {
    for (let i = 0; i < this.tabuleiro.length; i++) {
      if (this.tabuleiro[i] === ' ') {
        return false;
      }
    }
    return true;
  }

  public proximaJogadaComputador(): number {
    let jogada = -1;
    const chanceJogada = this.gerarChance();
    switch (this.getDificuldade()) {
      case 0: // muito facil
        if (chanceJogada < 50)
          // tenta ganhar
          jogada = this.proximaJogadaGanhar(
            Estrategia.simboloHumano,
            Estrategia.simboloComputador
          );
        if (chanceJogada < 60)
          // tenta nao perder
          jogada = this.proximaJogadaGanhar(
            Estrategia.simboloComputador,
            Estrategia.simboloHumano
          );
        if (jogada === -1 && chanceJogada < 30 && this.qtdJogadas === 0)
          // inicia jogada
          jogada = this.proximaJogadaInicial(Estrategia.simboloComputador);
        if (jogada === -1 && chanceJogada < 30)
          // defende inicio se o humano começa
          jogada = this.proximaJogadaDefenderInicio(Estrategia.simboloComputador);

        if (jogada === -1) {
          jogada = this.proximaJogadaDefender();
        }
        break;
      case 1: // facil
        if (chanceJogada < 70)
          // tenta ganhar
          jogada = this.proximaJogadaGanhar(
            Estrategia.simboloHumano,
            Estrategia.simboloComputador
          );
        if (chanceJogada < 60)
          // tenta nao perder
          jogada = this.proximaJogadaGanhar(
            Estrategia.simboloComputador,
            Estrategia.simboloHumano
          );
        if (jogada === -1 && chanceJogada < 40 && this.qtdJogadas === 0)
          // inicia jogada
          jogada = this.proximaJogadaInicial(Estrategia.simboloComputador);

        if (jogada === -1 && chanceJogada < 30)
          // defende inicio se o humano começa
          jogada = this.proximaJogadaDefenderInicio(Estrategia.simboloComputador);

        if (jogada === -1) {
          jogada = this.proximaJogadaDefender();
        }
        break;
      case 2: // normmal
        if (chanceJogada < 90)
          // tenta ganhar
          jogada = this.proximaJogadaGanhar(
            Estrategia.simboloHumano,
            Estrategia.simboloComputador
          );
        if (chanceJogada < 80)
          // tenta nao perder
          jogada = this.proximaJogadaGanhar(
            Estrategia.simboloComputador,
            Estrategia.simboloHumano
          );
        if (jogada === -1 && chanceJogada < 70 && this.qtdJogadas === 0)
          // inicia jogada
          jogada = this.proximaJogadaInicial(Estrategia.simboloComputador);
        if (jogada === -1 && chanceJogada < 70)
          // defende inicio se o humano começa
          jogada = this.proximaJogadaDefenderInicio(Estrategia.simboloComputador);

        if (jogada === -1) {
          jogada = this.proximaJogadaDefender();
        }

        if (jogada === -1 && chanceJogada < 50) jogada = this.proximaJogadaComplexa();

        if (jogada === -1 && chanceJogada < 60)
          jogada = this.proximaJogadaSimples(Estrategia.simboloComputador);
        break;
      case 3:
        jogada = this.proximaJogadaGanhar(
          Estrategia.simboloHumano,
          Estrategia.simboloComputador
        );

        if (jogada === -1 && chanceJogada < 95)
          // tenta nao perder
          jogada = this.proximaJogadaGanhar(
            Estrategia.simboloComputador,
            Estrategia.simboloHumano
          );
        if (jogada === -1 && chanceJogada < 95 && this.qtdJogadas === 0)
          // inicia jogada
          jogada = this.proximaJogadaInicial(Estrategia.simboloComputador);
        if (jogada === -1 && chanceJogada < 85)
          // defende inicio se o humano começa
          jogada = this.proximaJogadaDefenderInicio(Estrategia.simboloComputador);

        if (jogada === -1) {
          jogada = this.proximaJogadaDefender();
        }

        if (jogada === -1 && chanceJogada < 90) jogada = this.proximaJogadaComplexa();

        if (jogada === -1 && chanceJogada < 90)
          jogada = this.proximaJogadaSimples(Estrategia.simboloComputador);

        break;
    }

    if (jogada === -1) {
      // jogada aleatoria
      jogada = this.proximaJogadaAleatoria();
    }
    return jogada;
  }

  public proximaJogadaInicial(_simboloComputador: string): number {
    const gerador = new Random();
    const iJogada = gerador.nextInt(5);
    const jogada = this.listaPosicoesComecar[this.getDificuldade()][iJogada];
    return jogada;
  }

  public proximaJogadaDefenderInicio(_simboloComputador: string): number {
    let retorno: number = -1;
    if (this.qtdJogadas === 1) {
      // se o humano começou a jogar
      switch (this.ultimaJogadaHumano) {
        case 0:
        case 2:
        case 6:
        case 8:
          retorno = 4;
          break;
        case 4:
          const rd = new Random();
          const j = rd.nextInt(4);
          if (j === 0) retorno = 0;
          else if (j === 1) retorno = 2;
          else if (j === 2) retorno = 6;
          else if (j === 3) retorno = 8;
          break;
      }
    }
    return retorno;
  }

  public proximaJogadaDefender(): number {
    let retorno: number = -1;
    if (
      this.qtdJogadas === 3 &&
      !this.computadorComecou &&
      this.intInArray([0, 2, 6, 8], this.ultimaJogadaHumano) &&
      this.primeiraJogadaHumano === 4
    ) {
      retorno = this.buscarPosLivre([0, 2, 6, 8]);
    }

    return retorno;
  }

  public proximaJogadaSimples(_simboloComputador: string): number {
    let encontrou = 0;
    let posLivre = -1;
    for (let x = 0; x < this.listaPosicoesGanha.length; x++) {
      encontrou = 0;
      for (let y = 0; y < this.listaPosicoesGanha[x].length; y++) {
        if (this.listaPosicoesGanha[x][y] === this.ultimaJogadaComputador) {
          if (this.tabuleiro[this.listaPosicoesGanha[x][0]] === ' ') {
            encontrou++;
            posLivre = this.listaPosicoesGanha[x][0];
          }
          if (this.tabuleiro[this.listaPosicoesGanha[x][1]] === ' ') {
            encontrou++;
            posLivre = this.listaPosicoesGanha[x][1];
          }
          if (this.tabuleiro[this.listaPosicoesGanha[x][2]] === ' ') {
            posLivre = this.listaPosicoesGanha[x][2];
            encontrou++;
          }
          if (encontrou === 2) return posLivre;
        }
      }
    }

    return -1;
  }

  // somente quando o computador começa
  public proximaJogadaComplexa(): number {
    let retorno = -1;
    if (this.computadorComecou && this.qtdJogadas >= 2) {
      // começando nas laterais 0, 2, 6, 8
      if (
        this.intInArray([0, 2, 6, 8], this.primeiraJogadaComputador) &&
        this.primeiraJogadaHumano !== 4
      ) {
        switch (this.qtdJogadas) {
          case 2:
            if (this.intInArray([1, 3, 5, 7], this.ultimaJogadaHumano)) retorno = 4;
            else if (this.primeiraJogadaComputador === 0 && this.primeiraJogadaHumano !== 8)
              retorno = 8;
            else if (this.primeiraJogadaComputador === 2 && this.primeiraJogadaHumano !== 6)
              retorno = 6;
            else if (this.primeiraJogadaComputador === 6 && this.primeiraJogadaHumano !== 2)
              retorno = 2;
            else if (this.primeiraJogadaComputador === 8 && this.primeiraJogadaHumano !== 0)
              retorno = 0;
            else retorno = this.buscarPosLivre([0, 2, 6, 8]);

            break;
          case 4:
            if (
              this.intInArray([1, 3, 5, 7], this.ultimaJogadaHumano) &&
              this.tabuleiro[4] === ' '
            )
              retorno = this.getCantoLivre();

            if (
              this.intInArray([1, 3, 5, 7], this.primeiraJogadaHumano) &&
              this.intInArray(
                this.getListaAdjacente(this.primeiraJogadaComputador),
                this.primeiraJogadaHumano
              )
            ) {
              retorno = this.getPosCantoAdjagentelivre();
            }
            break;
        }
      } else if (
        this.primeiraJogadaComputador === 4 &&
        this.intInArray([1, 3, 5, 7], this.primeiraJogadaHumano)
      ) {
        switch (this.qtdJogadas) {
          case 2:
            retorno = this.getAdjacente(this.ultimaJogadaHumano, true);
            break;
          case 4:
            retorno = this.getPosCanto(
              this.primeiraJogadaHumano,
              this.getAdjacente(this.primeiraJogadaHumano, false)
            );
            break;
        }
      }
    }

    return retorno;
  }

  public getDificuldade(): number {
    return this.dificuldade;
  }

  public setDificuldade(dificuldade: number): void {
    this.dificuldade = dificuldade;
  }

  public getTabuleiro(): string {
    return this.tabuleiro;
  }

  public marcarPosicaoTabuleiro(posicao: number, simbolo: string): void {
    if (simbolo === Estrategia.simboloComputador) {
      this.ultimaJogadaComputador = posicao;
      // se o computador começar
      if (this.qtdJogadas === 0) {
        this.primeiraJogadaComputador = posicao;
      } else if (this.qtdJogadas === 1) {
        this.primeiraJogadaHumano = posicao;
      }
    } else {
      this.ultimaJogadaHumano = posicao;
      if (this.qtdJogadas === 0) {
        this.primeiraJogadaHumano = posicao;
      } else if (this.qtdJogadas === 1) {
        this.primeiraJogadaComputador = posicao;
      }
    }
    const valTemp = this.tabuleiro.split('');
    valTemp[posicao] = simbolo;
    this.tabuleiro = valTemp.join('');
    this.qtdJogadas++;
  }

  private buscarPosLivre(listaPos: number[]): number {
    let retorno: number = -1;
    for (let i = 0; i < listaPos.length; i++) {
      if (this.tabuleiro[listaPos[i]] === ' ') {
        retorno = listaPos[i];
        break;
      }
    }
    return retorno;
  }

  private intInArray(arrayInt: number[] | null, valor: number): boolean {
    if (arrayInt !== null) {
      for (const i of arrayInt) {
        if (i === valor) {
          return true;
        }
      }
    }
    return false;
  }

  private getListaAdjacente(posCanto: number): number[] | null {
    for (const item of this.listaAdjacentes) {
      if (item[0] === posCanto) return item;
    }
    return null;
  }

  private getPosCantoAdjagentelivre(): number {
    for (const item of this.listaAdjacentes) {
      if (this.tabuleiro[item[1]] === ' ' && this.tabuleiro[item[2]] === ' ') return item[0]; // retorna a posicao do canto
    }
    return -1;
  }

  // busca adjacente livre passando o outro adjacente
  private getAdjacente(posAdjacente: number, livre: boolean): number {
    for (const item of this.listaAdjacentes) {
      if (item[1] === posAdjacente || item[2] === posAdjacente) {
        if (livre) {
          if (this.tabuleiro[item[2]] === ' ') return item[2];
          if (this.tabuleiro[item[1]] === ' ') return item[1];
        } else {
          if (posAdjacente !== item[2]) return item[2];
          if (posAdjacente !== item[1]) return item[1];
        }
      }
    }
    return -1;
  }

  private getPosCanto(posAdjacente1: number, posAdjacente2: number): number {
    for (const item of this.listaAdjacentes) {
      if (
        (item[1] === posAdjacente1 && item[2] === posAdjacente2) ||
        (item[2] === posAdjacente1 && item[1] === posAdjacente2)
      ) {
        if (this.tabuleiro[item[0]] === ' ') return item[0];
      }
    }
    return -1;
  }

  private getCantoLivre(): number {
    for (const item of [0, 2, 6, 8]) {
      if (this.tabuleiro[item] === ' ') return item;
    }
    return -1;
  }

  public getlistaQueGanhou(): number[] | null {
    return this.listaQueGanhou;
  }
}

class Random {
  public nextInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
