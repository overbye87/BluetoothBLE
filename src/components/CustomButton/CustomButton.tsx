import React from 'react';
import {
  GestureResponderEvent,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Text,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../../styles/colors';
import { styles } from './CustomButton.style';

type Props = {
  title?: string,
  children?: React.ReactNode,
  // eslint-disable-next-line no-unused-vars
  onPress?: ((event: GestureResponderEvent) => void) | undefined,
  loading?: boolean,
  disabled?: boolean,
  style?: StyleProp<ViewStyle>,
};

const CustomButton: React.FC<Props> = ({
  title,
  children,
  onPress,
  disabled,
  style,
  loading,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, style, disabled && styles.disabled]}
      onPress={loading ? undefined : onPress}
    >
      {children}
      {loading && <ActivityIndicator size="small" color={colors.buttonText} />}
      {title && !loading && <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
};

CustomButton.defaultProps = {
  title: undefined,
  children: null,
  onPress: undefined,
  disabled: false,
  style: null,
  loading: false,
};

export default CustomButton;
