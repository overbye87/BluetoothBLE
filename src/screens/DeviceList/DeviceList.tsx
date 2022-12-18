import React from 'react';
import { FlatList, View } from 'react-native';

import { useTypedSelector } from '../../store/store';
import DeviceCard from './components/DeviceCard/DeviceCard';

export const DeviceList: React.FC = () => {
  const scannedDevices = useTypedSelector(({ main }) => main.scannedDevices);
  return (
    <View>
      <FlatList
        data={scannedDevices}
        renderItem={({ item, index }) => <DeviceCard device={item} index={index} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
