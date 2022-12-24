/* eslint-disable max-len */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  PermissionsAndroid,
  View,
} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { PERMISSIONS, requestMultiple, RESULTS } from 'react-native-permissions';
import {
  addDevice, clearScannedDevices, setConnected, setLoading, setSelectedDevice,
} from '../../store/app/appSlice';
import { useTypedDispatch, useTypedSelector } from '../../store/store';
import CustomButton from '../../components/CustomButton/CustomButton';

import { NavigationAppStack } from '../../navigation/AppNavigation';

import { styles } from './Main.style';
import SelectedDeviceTile from '../../components/SelectedDeviceTile/SelectedDeviceTile';
import { connectAndDiscoverThunk, disconnectThunk } from '../../store/thunks';

const manager = new BleManager();

const Main: React.FC = () => {
  const scannedDevices = useTypedSelector(({ app }) => app.scannedDevices);
  const selectedDeviceIndex = useTypedSelector(({ app }) => app.selectedDeviceIndex);
  const selectedDevice = useTypedSelector(({ app }) => app.selectedDevice);
  const connected = useTypedSelector(({ app }) => app.connected);
  const loading = useTypedSelector(({ app }) => app.loading);

  const dispatch = useTypedDispatch();
  const { navigate } = useNavigation<NavigationAppStack<'Main'>>();

  const handleScanDevices = () => {
    dispatch(setLoading(true));
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        manager.stopDeviceScan();
        dispatch(setLoading(false));
        Alert.alert(error.name, JSON.stringify(error, null, 2));
      }
      if (scannedDevice) {
        dispatch(addDevice(scannedDevice));
      }
    });
    setTimeout(() => {
      manager.stopDeviceScan();
      dispatch(setLoading(false));
    }, 3000);
  };

  const requestPermissions = async () => {
    const statuses = await requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    ]);
    type IKey = keyof typeof statuses;
    Object.keys(statuses).forEach((key) => {
      if (statuses[key as IKey] !== RESULTS.GRANTED) {
        Alert.alert(statuses[key as IKey], key);
      }
    });
  };

  useEffect(() => {
    requestPermissions();
    return () => {
      manager.destroy();
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (selectedDevice) {
        dispatch(setConnected(await selectedDevice?.isConnected()));
      }
    })();
  }, [selectedDevice]);

  const handleDisconnect = async () => {
    await dispatch(disconnectThunk());
  };
  const handleConnect = async () => {
    await dispatch(connectAndDiscoverThunk());
  };

  const handleClearDevices = async () => {
    await handleDisconnect();
    dispatch(clearScannedDevices());
  };

  return (
    <View style={styles.сontainer}>
      {selectedDevice
        && (
          <SelectedDeviceTile
            device={selectedDevice}
            isConnected={connected}
            onDisconnet={handleDisconnect}
            onConnect={handleConnect}
          />
        )}
      <CustomButton
        title="🕹 JOYSTICK"
        onPress={() => navigate('Joystick')}
      />
      <CustomButton
        title={`📋 DEVICE LIST (${scannedDevices.length})`}
        onPress={() => navigate('DeviceList')}
        disabled={!scannedDevices.length}
      />
      <CustomButton
        title="🔍 SCAN DEVICES"
        onPress={handleScanDevices}
        loading={loading}
      />
      <CustomButton
        title="💀 CLEAR DEVICES"
        onPress={handleClearDevices}
      />
    </View>
  );
};

export default Main;
