export const config = {
  bluetooth: {
    name: 'ESP32BLE', // name of ble device
    // serviceUUID: '0000ffe0-0000-1000-8000-00805f9b34fb',
    // characteristicUUID: '0000ffe1-0000-1000-8000-00805f9b34fb',
    serviceUUID: '6E400001-B5A3-F393-E0A9-E50E24DCCA9E',
    characteristicUUID: '6E400002-B5A3-F393-E0A9-E50E24DCCA9E',
  },
  interval: 50, // ms
  scaleFactor: 100, // maximum position value
};
