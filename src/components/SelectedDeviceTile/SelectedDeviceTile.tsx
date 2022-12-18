import React from 'react';
import { Text, View } from 'react-native';
import { Device } from 'react-native-ble-plx';
import { styles } from './SelectedDeviceTile.style';

interface Props {
  device: Device;
}

const SelectedDeviceTile: React.FC<Props> = ({ device }) => {
  return (
    <View style={styles.container}>
      {device.name && <Text>{device.name}</Text>}
      <Text>{device.id}</Text>
    </View>
  );
};

export default SelectedDeviceTile;
