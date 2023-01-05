import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    alignSelf: 'stretch',
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.button,
  },
  connectedContainer: {
    borderColor: colors.green,
  },
  connected: {
    backgroundColor: colors.green,
  },
  text: {
    fontSize: 20,
    color: colors.button,
  },
  connectedText: {
    color: colors.green,
  },
});
