import { images } from '@/constants/images';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const coremind = () => {
  return (
    <View className="flex-1 justify-center items-center bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full h-full z-0"
        resizeMode="cover"
      />
      <Text className="text-5xl color-blue-500 text-center">
        Здесь будет моя ключевая цель
      </Text>
    </View>
  );
}

export default coremind

const styles = StyleSheet.create({})