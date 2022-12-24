import { Alert } from 'react-native';
import { BleError, Device } from 'react-native-ble-plx';
import { setConnected, setSelectedDevice } from './app/appSlice';
import { createAppAsyncThunk } from './store';

export const connectAndDiscoverThunk = createAppAsyncThunk<Device | null>(
  'app/connectAndDiscoverThunk',
  async (payload, { getState, dispatch }) => {
    const { selectedDevice } = getState().app; // device in state
    let connectedDevice = selectedDevice;
    if (selectedDevice && connectedDevice) {
      try {
        if (!await selectedDevice.isConnected()) {
          connectedDevice = await selectedDevice.connect();
          dispatch(setSelectedDevice(connectedDevice));
        }
        connectedDevice = await connectedDevice.discoverAllServicesAndCharacteristics();
        dispatch(setSelectedDevice(connectedDevice));
        dispatch(setConnected(true));
      } catch (error) {
        const { reason, message } = error as BleError;
        Alert.alert(message, reason as string);
      }
    }
    return connectedDevice;
  },
);

export const disconnectThunk = createAppAsyncThunk<Device | null>(
  'app/connectAndDiscoverThunk',
  async (payload, { getState, dispatch }) => {
    const { selectedDevice } = getState().app; // device in state
    let disconnectedDevice = selectedDevice;
    if (selectedDevice && disconnectedDevice) {
      try {
        if (await selectedDevice.isConnected()) {
          disconnectedDevice = await selectedDevice.cancelConnection();
          dispatch(setSelectedDevice(disconnectedDevice));
          dispatch(setConnected(false));
          return disconnectedDevice;
        }
      } catch (error) {
        const { reason, message } = error as BleError;
        Alert.alert(message, reason as string);
      }
    }
    return disconnectedDevice;
  },
);
