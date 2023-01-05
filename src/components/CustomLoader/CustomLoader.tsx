import React from 'react';
import {
  ActivityIndicator,
  Text, View,
} from 'react-native';
import { colors } from '../../styles/colors';
import { styles } from './CustomLoader.style';

interface Props {
  connected: boolean;
}

const CustomLoader: React.FC<Props> = (props) => {
  return (
    <View style={[styles.container, props.connected && styles.connectedContainer]}>
      {!props.connected
        ? <ActivityIndicator size="large" color={colors.button} />
        : <Text style={[styles.text, styles.connectedText]}>✓</Text>}
      <Text style={[styles.text, props.connected && styles.connectedText]}>{!props.connected ? 'Connecting...' : 'Connected'}</Text>
    </View>
  );
};

export default CustomLoader;
