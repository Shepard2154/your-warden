import { icons } from "@/constants/icons";
import React, { useState } from 'react';
import { Image, Platform, TextInput, TouchableOpacity, View } from "react-native";

const MessageBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [textValue, setTextValue] = useState('');

  return (
    <View className="flex-row items-center bg-light-100 rounded-full px-4 py-2">
      <TextInput
        multiline
        value={textValue}
        onChangeText={setTextValue}
        placeholder="Введи свой запрос"
        placeholderTextColor="#a8b5db"
        className="flex-1 text-secondary bg-white text-base"
        style={{
          maxHeight: 120,
          paddingTop: Platform.select({ ios: 12, android: 8 }),
          paddingBottom: Platform.select({ ios: 12, android: 8 }),
          textAlignVertical: 'center',
          includeFontPadding: false,
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
      <TouchableOpacity className="p-2" disabled={!textValue}>
        <Image
          source={icons.send}
          className="w-6 h-6 size-5"
          style={{ tintColor: textValue ? "#7C3AED" : "#D1D5DB" }}
        />
      </TouchableOpacity>
    </View>
  );
}

export default MessageBar;