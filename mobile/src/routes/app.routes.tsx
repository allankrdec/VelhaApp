/**
 * Módulo para renderizar tela de login
 * @module auth
 * @category routes
 */

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Home from '../pages/Home';

const { Navigator, Screen } = createStackNavigator();

/**
 * Rota de autenticação (Login)
 * Use da seguinte forma: \<AppRoutes\>\</AppRoutes\>
 */
export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}
