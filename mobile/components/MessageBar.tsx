import React, { useState } from 'react';
import { Image, ImageSourcePropType, Platform, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  sendMessage: (question: string) => void;
  icon: ImageSourcePropType;
  placeholder: string;
};

const MessageBar = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [textValue, setTextValue] = useState('');

  return (
    <View className="flex-row items-center bg-light-100 rounded-full px-4 py-2">
      <TextInput
        multiline
        value={textValue}
        onChangeText={setTextValue}
        placeholder={props.placeholder}
        placeholderTextColor="#000"
        className="flex-1 text-secondary text-base"
        style={{
          maxHeight: 60,
          paddingTop: Platform.select({ ios: 12, android: 8 }),
          paddingBottom: Platform.select({ ios: 12, android: 8 }),
          textAlignVertical: "center",
          includeFontPadding: false,
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <TouchableOpacity
        className="p-2"
        disabled={!textValue}
        onPress={() => {
          props.sendMessage(textValue);
          setTextValue("");
        }}
      >
        <Image
          source={props.icon}
          className="w-6 h-6 size-5"
          style={{ tintColor: textValue ? "#7C3AED" : "gray" }}
        />
      </TouchableOpacity>
    </View>
  );
}

export default MessageBar;