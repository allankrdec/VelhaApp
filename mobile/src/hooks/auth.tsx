/**
 * Modulo de contexto de autenticação compartilhado em todo o aplicativo
 * @module auth
 * @category Context
 */

import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Alert } from 'react-native';

import { IAuthInfo } from '../interfaces';
import AuthService from '../services/AuthService';
import { useGlobal } from './global';

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Usada para representar dados do auth context
 */
export interface IAuthContextData {
  authInfo: IAuthInfo;
  doLogin(email: string, password: string): Promise<boolean>;
  doLogout(): Promise<void>;
  checkRoles(arrayNames: Array<string> | string, showMessage?: boolean): boolean;
}

const AuthContext = createContext({} as IAuthContextData);

/**
 * Usado no componente App para compartilhar o contexto usando da seguinte forma:
 * \<AuthProvider\>\</AuthProvider\>
 */
function AuthProvider({ children }: AuthProviderProps) {
  const global = useGlobal();
  const [authInfo, setAuthInfo] = useState<IAuthInfo>({} as IAuthInfo);

  async function doLogin(email: string, password: string): Promise<boolean> {
    const authInfoRet = await AuthService.login(email, password, global.setLoading);

    // authInfoRet = {
    //   email,
    //   isAuthenticated: true,
    //   expireIn: new Date(),
    //   expireInH: '10H',
    //   apiInfo: { version: '1.0', versionNumber: 1 },
    //   roles: [],
    //   token: '',
    //   usuario: { email, id: 1, nome: 'Allan' },
    // };

    if (authInfoRet) {
      setAuthInfo(authInfoRet);
      return true;
    }

    return false;
  }

  async function doLogout(): Promise<void> {
    setAuthInfo({} as IAuthInfo);
  }

  function checkRoles(arrayNames: Array<string> | string, showMessage = false): boolean {
    const { roles } = authInfo;

    if (!Array.isArray(arrayNames)) {
      arrayNames = arrayNames ? [arrayNames] : [];
    }

    if (arrayNames.length === 0) {
      return true;
    }

    let ret = false;

    for (let i = 0; i < arrayNames.length; i++) {
      const e = arrayNames[i];
      if (!roles || !Array.isArray(roles)) {
        break;
      }
      if (roles.includes(e)) {
        ret = true;
        break;
      }
    }
    if (showMessage && !ret) {
      Alert.alert(
        'Atenção',
        'Você não tem permissão para esta ação. Verifique suas permissões!'
      );
    }

    return ret;
  }

  return (
    <AuthContext.Provider value={{ authInfo, doLogin, doLogout, checkRoles }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Obtem o auth context em qualquer parte do App
 */
function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
