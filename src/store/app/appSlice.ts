/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device } from 'react-native-ble-plx';
import { config } from '../../config';
import { RootState } from '../store';

interface AppState {
  scannedDevices: Device[],
  selectedDeviceIndex: number | null,
  selectedDevice: Device | null,
  connected: boolean,
  loading: boolean,
}

const initialState: AppState = {
  scannedDevices: [],
  selectedDeviceIndex: null,
  selectedDevice: null,
  connected: false,
  loading: false,
};

const isAlreadyExistInDevices = (devices: Device[], device: Device) =>
  !!devices.find((dev) => dev.id === device.id);

export const appSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    addDevice: (store, action: PayloadAction<Device>) => {
      const newDevice = action.payload;
      if (!isAlreadyExistInDevices(store.scannedDevices, newDevice)) {
        // if not exist
        const newLength = store.scannedDevices.push(newDevice);
        if (newDevice.name === config.bluetooth.name) {
          // this is the device we are looking for?
          store.selectedDeviceIndex = newLength - 1;
          store.selectedDevice = newDevice;
        }
      }
    },
    clearScannedDevices: (store) => {
      store.scannedDevices = [];
      store.selectedDeviceIndex = null;
    },
    setSelectedDeviceIndex: (store, action: PayloadAction<number>) => {
      store.selectedDeviceIndex = action.payload;
    },
    setSelectedDevice: (store, action: PayloadAction<Device>) => {
      store.selectedDevice = action.payload;
    },
    setConnected: (store, action: PayloadAction<boolean>) => {
      store.connected = action.payload;
    },
    setLoading: (store, action: PayloadAction<boolean>) => {
      store.loading = action.payload;
    },
  },
});

export const {
  addDevice,
  clearScannedDevices,
  setSelectedDeviceIndex,
  setSelectedDevice,
  setConnected,
  setLoading,
} = appSlice.actions;

export const app = (state: RootState) => state.app;

export default appSlice.reducer;
