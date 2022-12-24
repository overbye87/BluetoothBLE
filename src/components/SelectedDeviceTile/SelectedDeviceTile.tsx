import React from 'react';
import {
  Alert, Text, TouchableOpacity,
} from 'react-native';
import { Device } from 'react-native-ble-plx';
import { styles } from './SelectedDeviceTile.style';

interface Props {
  device: Device;
  isConnected: boolean;
  onDisconnet: () => void;
  onConnect: () => void;
}

const SelectedDeviceTile: React.FC<Props> = (props) => {
  const handleOnPressSelectedDevice = () => {
    Alert.alert(
      `${props.device.name} (${props.device.id})`,
      JSON.stringify(props.device, null, 2),
      [
        {
          text: 'Connect',
          onPress: props.onConnect,
          style: 'default',
        },
        {
          text: 'Disconnect',
          onPress: props.onDisconnet,
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };
  return (
    <TouchableOpacity
      onPress={handleOnPressSelectedDevice}
      style={[styles.container, props.isConnected && styles.connected]}
    >
      {props.device.name && <Text>{props.device.name}</Text>}
      <Text>{props.device.id}</Text>
    </TouchableOpacity>
  );
};

export default SelectedDeviceTile;
