import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: { margin: 10 },
  id: { fontSize: 20 },
  name: { fontSize: 40, color: colors.red },
  rssi: {},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marker: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.green,
  },
});
