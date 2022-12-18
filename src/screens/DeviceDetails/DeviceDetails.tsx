/* eslint-disable @typescript-eslint/no-shadow */
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Text,
  View,
} from 'react-native';
import { BleError, Service } from 'react-native-ble-plx';
import { useTypedDispatch, useTypedSelector } from '../../store/store';

import { RouteAppStack } from '../../navigation/AppNavigation';
import { base64ToHex, toBase64 } from '../../utils/base64';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';

import { styles } from './DeviceDetails.style';
import CustomButton from '../../components/CustomButton/CustomButton';
import { setSelectedDeviceIndex } from '../../store/app/appSlice';

const DeviceScreen: React.FC = () => {
  const { params } = useRoute<RouteAppStack<'DeviceDetails'>>();
  const { index } = params;
  const device = useTypedSelector(({ main }) => main.scannedDevices[index]);
  const selectedDeviceIndex = useTypedSelector(({ main }) => main.selectedDeviceIndex);

  const dispatch = useTypedDispatch();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('Hello miss pacman!');
  const [sevices, setSevices] = useState<Service[]>([]);

  useEffect(() => {
    (async () => {
      setIsConnected(await device.isConnected());
    })();
  }, [device]);

  // const string = device.manufacturerData?.replace(/[=]/g, '');
  // const manufacturer = Buffer.from(string || '').toString('base64');
  const handleConnect = async () => {
    try {
      setIsLoading(true);
      const resultConnect = await device.connect();
      setIsConnected(await device.isConnected());
      // dispatch(updateDevice({ device: resultConnect, index }));
      // const resultDiscover = await device.discoverAllServicesAndCharacteristics();
      // const result = await device.services();
      // Alert.alert('sevices', JSON.stringify(result, null, 2));
      // setSevices(result);
      // const char = device.characteristicsForService(sevices[0].uuid);
      // Alert.alert('characteristics', JSON.stringify(char, null, 2));
      // dispatch(updateDevice({ device: resultDiscover, index }));
    } catch (error) {
      const { reason, message } = error as BleError;
      Alert.alert(message, reason as string);
    }
    setIsLoading(false);
  };

  const handleDisconnect = async () => {
    try {
      setIsLoading(true);
      const resultCancel = await device.cancelConnection();
      setIsConnected(await device.isConnected());
      // dispatch(updateDevice({ device: resultCancel, index }));
    } catch (error) {
      const { reason, message } = error as BleError;
      Alert.alert(message, reason as string);
    }
    setIsLoading(false);
  };

  const handleSelect = async () => {
    dispatch(setSelectedDeviceIndex(index));
  };

  const handleSend = async () => {
    try {
      const userDataServiceUUID = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E'; // assigned number 0x2A8E to the base specification UUID
      const heightCharacteristicUUID = '00002A8E-0000-1000-8000-00805F9B34FB'; // assigned number 0x2A8E to the base specification UUID
      const serviceUUID = '0000b000-0000-1000-8000-00805f9b34fb';
      const services1 = '00001800-0000-1000-8000-00805f9b34fb';
      const services7 = '00001801-0000-1000-8000-00805f9b34fb';
      const services10 = '0000ffe0-0000-1000-8000-00805f9b34fb';
      // const sevices = await device.services();
      // const characteristic = await device.characteristicsForService(serviceUUID);
      // Alert.alert('sevices', JSON.stringify(sevices, null, 2));
      // Alert.alert(connactedDevice);
      const characteristicUUID = 'AAAAAA==';
      const message1 = 'aGVsbG8gbWlzcyB0YXBweQ==';
      // const message = toBase64('hello my dear freand');

      const message = toBase64(`${text}\r\n`);
      const serviceUUIDs = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
      const offei = '6E400002-B5A3-F393-E0A9-E50E24DCCA9E';
      const result = await device.writeCharacteristicWithResponseForService(
        serviceUUIDs,
        offei,
        message,
      );

      Alert.alert('writeCharacteristic', JSON.stringify(result, null, 2));
    } catch (error) {
      const { reason, message } = error as BleError;
      Alert.alert(reason as string, message);
    }
  };

  // console.log(JSON.stringify(device.serviceData, null, 2));
  // console.log(JSON.stringify(device.serviceUUIDs, null, 2));
  // console.log(JSON.stringify(sevices, null, 2));
  // console.log(JSON.stringify(device.manufacturerData, null, 2));
  // const text = Buffer.from(device.manufacturerData || '').readInt16LE(1) / 10;
  // console.log(text);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.id}>{`${device.id}`}</Text>
        <Text style={styles.name}>{`${device.name}`}</Text>
        <Text style={styles.rssi}>{`RSSI : ${device.rssi}`}</Text>
        {isConnected && <View style={styles.marker} />}
        {/* Decode the ble device manufacturer which is encoded with the base64 algorythme */}
        <Text>{`Manufacturer : ${base64ToHex(device.manufacturerData || '')}`}</Text>
        {device.serviceData && Object.entries(device.serviceData).map((item) => (
          <Text key={item[0]}>{`uuid: ${item[0]} : ${item[1]}`}</Text>
        ))}
        {device.serviceUUIDs && device.serviceUUIDs.map((item) => (
          <Text key={item}>{`UUIDS : ${item}`}</Text>
        ))}
        {Boolean(sevices.length) && <Text>Services:</Text>}
        {sevices.map((item) => (
          <Text key={item.uuid}>{`${item.id}: ${item.uuid}`}</Text>
        ))}
      </View>
      <CustomButton title="SELECT" onPress={handleSelect} loading={isLoading} disabled={selectedDeviceIndex === index} />
      <View style={styles.buttonContainer}>
        <CustomButton title="CONNECT" onPress={handleConnect} loading={isLoading} disabled={isConnected} />
        <CustomButton title="DISCONNECT" onPress={handleDisconnect} loading={isLoading} disabled={!isConnected} />
      </View>
      <CustomTextInput
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <CustomButton title="SEND" onPress={handleSend} loading={isLoading} />
    </View>

  );
};

export default DeviceScreen;
