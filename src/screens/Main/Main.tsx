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
import { addDevice, clearScannedDevices } from '../../store/app/appSlice';
import { useTypedDispatch, useTypedSelector } from '../../store/store';
import CustomButton from '../../components/CustomButton/CustomButton';

import { NavigationAppStack } from '../../navigation/AppNavigation';

import { styles } from './Main.style';
import SelectedDeviceTile from '../../components/SelectedDeviceTile/SelectedDeviceTile';

const manager = new BleManager();

const Main: React.FC = () => {
  const scannedDevices = useTypedSelector(({ main }) => main.scannedDevices);
  const selectedDeviceIndex = useTypedSelector(({ main }) => main.selectedDeviceIndex);

  const dispatch = useTypedDispatch();
  const { navigate } = useNavigation<NavigationAppStack<'Main'>>();

  const [isLoading, setIsLoading] = useState(false);

  const handleScanDevices = () => {
    setIsLoading(true);
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        manager.stopDeviceScan();
        setIsLoading(false);
        Alert.alert(error.name, JSON.stringify(error, null, 2));
      }
      if (scannedDevice) {
        dispatch(addDevice(scannedDevice));
      }
    });
    setTimeout(() => {
      manager.stopDeviceScan();
      setIsLoading(false);
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

  return (
    <View style={styles.сontainer}>
      {(selectedDeviceIndex !== null) && <SelectedDeviceTile device={scannedDevices[selectedDeviceIndex]} />}
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
        loading={isLoading}
      />
      <CustomButton
        title="💀 CLEAR DEVICES"
        onPress={() => dispatch(clearScannedDevices())}
      />
    </View>
  );
};

export default Main;
