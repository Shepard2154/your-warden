import { icons } from "@/constants/icons";
import React, { useState } from 'react';
import { Image, TextInput, View } from "react-native";

const MessageBar = () => {
  const [isFocuses, setIsFocused] = useState(false);
  const [textValue, setTextValue] = useState('');

  return (
    <View className="flex-row items-center bg-light-100 rounded-full px-5 py-4">
      <TextInput
        multiline={true}
        numberOfLines={4}
        onPress={() => {}}
        onChangeText={(value) => setTextValue(value)}
        placeholder="Введи свой запрос"
        value={textValue}
        placeholderTextColor="#a8b5db"
        className="h-12 w-4/5 border-2 border-purple-600 rounded-lg px-4 text-[#a8b5db] bg-white"
        style={{
          textAlignVertical: "center",
          includeFontPadding: false,
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      ></TextInput>
      <Image
        source={icons.send}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
    </View>
  );
}

export default MessageBar;