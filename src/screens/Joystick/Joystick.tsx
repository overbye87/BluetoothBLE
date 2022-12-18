import { useNavigation } from '@react-navigation/native';
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  View,
} from 'react-native';
import { BleError, Device } from 'react-native-ble-plx';
import { useTypedSelector } from '../../store/store';
import { toBase64 } from '../../utils/base64';

import { config } from '../../config';
import { NavigationAppStack } from '../../navigation/AppNavigation';
import { styles } from './Joystick.style';
import CustomButton from '../../components/CustomButton/CustomButton';
import MultiTouchJoyStick from '../../components/MultiTouchJoyStick/MultiTouchJoyStick';

interface IPosition {
  x: number; y: number;
}

const Joystick: React.FC = () => {
  const { navigate } = useNavigation<NavigationAppStack<'Joystick'>>();
  const [isConnected, setIsConnected] = useState(false);
  const isConnectedRef = useRef(false);
  const scannedDevices = useTypedSelector(({ main }) => main.scannedDevices);
  const selectedDeviceIndex = useTypedSelector(({ main }) => main.selectedDeviceIndex);

  const position = useRef<IPosition>({ x: 0, y: 0 });
  const prevPosition = useRef<IPosition>({ x: 0, y: 0 });

  const send = async (device: Device, value: string) => {
    try {
      console.log(value);
      await device.writeCharacteristicWithoutResponseForService(
        config.bluetooth.serviceUUID,
        config.bluetooth.characteristicUUID,
        toBase64(value),
      );
    } catch (error) {
      const { reason, message } = error as BleError;
      Alert.alert(message, reason as string);
    }
  };

  const scale = (n: number): number => Math.round(n * config.scaleFactor);

  const tick = () => {
    const { x, y } = position.current;
    const { x: prevX, y: prevY } = prevPosition.current;
    if (x !== prevX || y !== prevY) {
      const message = `x=${scale(x)} y=${scale(y)}`;
      prevPosition.current = { ...position.current };
      if ((selectedDeviceIndex !== null) && isConnectedRef.current) {
        send(scannedDevices[selectedDeviceIndex], message);
      }
    }
  };

  const connect = async (device: Device) => {
    try {
      if (!await device.isConnected()) {
        await device.connect();
      }
      await device.discoverAllServicesAndCharacteristics();
      setIsConnected(true);
      isConnectedRef.current = true;
    } catch (error) {
      const { reason, message } = error as BleError;
      Alert.alert(message, reason as string);
    }
  };

  useEffect(() => {
    if (selectedDeviceIndex !== null) {
      connect(scannedDevices[selectedDeviceIndex]);
    }
    const timerInterval = setInterval(tick, config.interval);
    return (() => {
      clearInterval(timerInterval);
    });
  }, []);

  return (
    <View style={styles.сontainer}>
      <View style={styles.topContainer}>
        <CustomButton
          title="BACK"
          onPress={() => navigate('Main')}
        />
        {!isConnected && <ActivityIndicator size="large" />}
      </View>
      <MultiTouchJoyStick
        onValue={
          (x, y) => {
            position.current = { ...position.current, x, y };
          }
        }
      />
    </View>
  );
};

export default Joystick;
