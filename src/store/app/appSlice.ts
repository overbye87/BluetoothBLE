/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device } from 'react-native-ble-plx';
import { config } from '../../config';
import { RootState } from '../store';

interface IInitial {
  scannedDevices: Device[],
  selectedDeviceIndex: number | null,
}

const initialState: IInitial = {
  scannedDevices: [],
  selectedDeviceIndex: null,
};

export const appSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addDevice: (store, action: PayloadAction<Device>) => {
      const scannedDevice = action.payload;
      if (!store.scannedDevices.find((dev) => dev.id === scannedDevice.id)) {
        const newLength = store.scannedDevices.push(scannedDevice);
        if (scannedDevice.name === config.bluetooth.name) {
          store.selectedDeviceIndex = newLength - 1;
        }
      }
    },
    updateDevice: (store, action: PayloadAction<{ device: Device, index: number }>) => {
      store.scannedDevices[action.payload.index] = action.payload.device;
    },
    clearScannedDevices: (store) => {
      store.scannedDevices = [];
      store.selectedDeviceIndex = null;
    },
    setSelectedDeviceIndex: (store, action: PayloadAction<number>) => {
      store.selectedDeviceIndex = action.payload;
    },
  },
});

export const {
  addDevice,
  updateDevice,
  clearScannedDevices,
  setSelectedDeviceIndex,
} = appSlice.actions;

export const main = (state: RootState) => state.main;

export default appSlice.reducer;
