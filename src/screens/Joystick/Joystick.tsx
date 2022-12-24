import { useNavigation } from '@react-navigation/native';
import React, {
  useEffect,
  useRef,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  View,
} from 'react-native';
import { BleError, Device } from 'react-native-ble-plx';
import { useTypedDispatch, useTypedSelector } from '../../store/store';
import { toBase64 } from '../../utils/base64';

import { config } from '../../config';
import { NavigationAppStack } from '../../navigation/AppNavigation';
import { styles } from './Joystick.style';
import CustomButton from '../../components/CustomButton/CustomButton';
import MultiTouchJoyStick from '../../components/MultiTouchJoyStick/MultiTouchJoyStick';
import { setConnected, setSelectedDevice } from '../../store/app/appSlice';
import { scale } from '../../helpers/helpers';
import { connectAndDiscoverThunk } from '../../store/thunks';

interface IPosition {
  x: number; y: number;
}

const Joystick: React.FC = () => {
  const { navigate } = useNavigation<NavigationAppStack<'Joystick'>>();
  const dispatch = useTypedDispatch();

  const selectedDevice = useTypedSelector(({ app }) => app.selectedDevice);
  const connected = useTypedSelector(({ app }) => app.connected);

  const position = useRef<IPosition>({ x: 0, y: 0 });
  const prevPosition = useRef<IPosition>({ x: 0, y: 0 });

  const handleConnect = async () => {
    await dispatch(connectAndDiscoverThunk());
  };

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

  const tick = () => {
    const { x, y } = position.current;
    const { x: prevX, y: prevY } = prevPosition.current;
    if (x !== prevX || y !== prevY) {
      // const message = `${scale(y)}`;
      const message = JSON.stringify({ x: scale(x), y: scale(y) });
      prevPosition.current = { ...position.current };
      if (selectedDevice && connected) {
        send(selectedDevice, message);
      }
    }
  };

  useEffect(() => {
    if (selectedDevice) {
      handleConnect();
    }
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(tick, config.interval);
    return (() => {
      clearInterval(timerInterval);
    });
  }, [selectedDevice]);

  return (
    <View style={styles.сontainer}>
      <View style={styles.topContainer}>
        <CustomButton
          title="BACK"
          onPress={() => navigate('Main')}
        />
        {!connected && <ActivityIndicator size="large" />}
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
