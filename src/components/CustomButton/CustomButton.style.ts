import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    backgroundColor: colors.button,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    minWidth: 150,
  },
  disabled: {
    backgroundColor: colors.gray,
  },
  text: {
    color: colors.buttonText,
  },
});
