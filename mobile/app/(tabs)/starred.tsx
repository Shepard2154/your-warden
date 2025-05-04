import { images } from "@/constants/images";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const starred = () => {
  return (
    <View className="flex-1 justify-center items-center bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full h-full z-0"
        resizeMode="cover"
      />
      <Text className="text-5xl color-blue-500 text-center">
        Просмотр избранных ответов пока не возможен :Ъ
      </Text>
    </View>
  );
};

export default starred;

const styles = StyleSheet.create({});
