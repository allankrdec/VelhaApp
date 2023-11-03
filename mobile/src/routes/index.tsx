/**
 * Types adicionais para o projeto
 * @module index
 * @category routes
 */

/* eslint-disable react/jsx-no-useless-fragment */
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import LoaderView from '../components/LoaderView';
import { AppRoutes } from './app.routes';

/**
 * Renderiza o AppRoutes ou AuthRoutes conforme autenticação.
 * Use da seguinte forma: \<Routes\>\</Routes\>
 */
export default function Routes() {
  function renderScreen() {
    return (
      <>
        <LoaderView />
        <AppRoutes />
      </>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      {renderScreen()}
    </NavigationContainer>
  );
}
