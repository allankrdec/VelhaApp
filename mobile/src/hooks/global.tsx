/**
 * Modulo de contexto global que é compartilhado com toda a aplicação
 * @module global
 * @category Context
 */

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface GlobalProviderProps {
  children: ReactNode;
}

/**
 * Usada para representar dados do global context
 * @notExported
 */
interface IGlobalContextData {
  loading: boolean;
  setLoading(loading: boolean): void;
}

const GlobalContext = createContext({} as IGlobalContextData);

/**
 * Usado no componente App para compartilhar o contexto usando da seguinte forma:
 * \<GlobalProvider\>\</GlobalProvider\>
 */
function GlobalProvider({ children }: GlobalProviderProps) {
  const [loading, setLoading] = useState(false);

  return (
    <GlobalContext.Provider value={{ loading, setLoading }}>{children}</GlobalContext.Provider>
  );
}

/**
 * Obtem o global context em qualquer parte do App
 */
function useGlobal() {
  const context = useContext(GlobalContext);
  return context;
}

export { GlobalProvider, useGlobal };
