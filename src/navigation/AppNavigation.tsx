import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Main from '../screens/Main/Main';
import Joystick from '../screens/Joystick/Joystick';
import { DeviceList } from '../screens/DeviceList/DeviceList';
import DeviceDetails from '../screens/DeviceDetails/DeviceDetails';

export type AppStackParamList = {
  Main: undefined,
  DeviceList: undefined,
  DeviceDetails: { index: number },
  Joystick: undefined,
};

type ScreenKeys = keyof AppStackParamList;
export type RouteAppStack<T extends ScreenKeys> = RouteProp<AppStackParamList, T>;
export type NavigationAppStack<T extends ScreenKeys> = NativeStackNavigationProp<
AppStackParamList,
  T
>;

const AppStack = createNativeStackNavigator<AppStackParamList>();

const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false, orientation: 'portrait_up' }}
        />
        <AppStack.Screen
          name="DeviceList"
          component={DeviceList}
          options={{ title: 'Device list', orientation: 'portrait_up' }}
        />
        <AppStack.Screen
          name="DeviceDetails"
          component={DeviceDetails}
          options={{ title: 'Device', orientation: 'portrait_up' }}
        />
        <AppStack.Screen
          name="Joystick"
          component={Joystick}
          options={{ headerShown: false, orientation: 'portrait_up', statusBarHidden: true }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
