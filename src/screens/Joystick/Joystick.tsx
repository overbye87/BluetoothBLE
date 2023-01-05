import { useNavigation } from '@react-navigation/native';
import React, {
  useEffect,
  useRef,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  View,
} from 'react-native';
import { BleError, Device } from 'react-native-ble-plx';
import Slider from '@react-native-community/slider';
import { useTypedDispatch, useTypedSelector } from '../../store/store';
import { toBase64 } from '../../utils/base64';

import { config } from '../../config';
import { NavigationAppStack } from '../../navigation/AppNavigation';
import { styles } from './Joystick.style';
import CustomButton from '../../components/CustomButton/CustomButton';
import MultiTouchJoyStick from '../../components/MultiTouchJoyStick/MultiTouchJoyStick';
import { setConnected, setSelectedDevice } from '../../store/app/appSlice';
import { getTrottle, scale } from '../../helpers/helpers';
import { connectAndDiscoverThunk } from '../../store/thunks';
import { colors } from '../../styles/colors';
import CustomLoader from '../../components/CustomLoader/CustomLoader';

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
      const message = JSON.stringify({ x: scale(x), y: scale(y), ...getTrottle(x, y) });
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
        <Slider
          style={{ flex: 1, height: 50, marginTop: 50 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor={colors.button}
          thumbTintColor={colors.button}
          step={10}
        />
      </View>
      <MultiTouchJoyStick
        onValue={
          (x, y) => {
            // getTrottle(x, y);
            position.current = { ...position.current, x, y };
          }
        }
      />
      <View style={styles.bottomContainer}>
        <CustomLoader connected={connected} />
        <CustomButton
          title="<<< BACK <<<"
          onPress={() => navigate('Main')}
        />
      </View>
    </View>
  );
};

export default Joystick;
