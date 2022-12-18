import React from 'react';
import { TextInput } from 'react-native';

import { styles } from './CustomTextInput.style';

type Props = {
  value: string,
  onChangeText: (text: string) => void | undefined,
};

const CustomTextInput: React.FC<Props> = ({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

export default CustomTextInput;
