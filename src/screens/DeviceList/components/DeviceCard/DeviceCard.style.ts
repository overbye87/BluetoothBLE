import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: theme.colours.gray,
    borderRadius: 5,
    backgroundColor: colors.white,
    padding: 10,
    margin: 5,
  },
  selected: {
    backgroundColor: colors.button,
  },
  id: {
  },
  name: {
    fontSize: 20,
  },
  connected: {
    color: 'darkgreen',
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
