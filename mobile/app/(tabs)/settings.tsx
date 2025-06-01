import MessageBar from "@/components/MessageBar";
import { icons } from '@/constants/icons';
import { images } from "@/constants/images";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  Linking,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";

const Settings = () => {
  const apiUrl = "https://ai.google.dev/gemini-api/docs";
  const [key, setKey] = useState<string | null>(null);
  const { getItem, setItem } = useAsyncStorage("API_KEY");

  useEffect(() => {
    const getApiKey = async () => {
      const API_KEY =
        process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? (await getItem());
      setKey(API_KEY);
    }

    getApiKey();
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-center items-center bg-primary">
        <Image
          source={images.bg}
          className="absolute w-full h-full z-0"
          resizeMode="cover"
        />
        <View className="absolute top-0 bottom-[70%] right-0 left-0 justify-center items-center">
          <View className="w-[90%] justify-center">
            <MessageBar
              icon={icons.player}
              placeholder="Введи свой API ключ от GoogleAI"
              sendMessage={async (key) => {
                await setItem(key);
                setKey(key);
              }}
            />
          </View>
        </View>
        <Text className="text-accent mb-10 text-2xl">
          Твой персональный API ключ:
        </Text>
        <Text className="text-5xl color-blue-500 text-center">
          {key ?? (
            <Text className="color-[white] text-3xl">
              API ключ не найден, введи его или создай по
              <Text className="color-[blue]" onPress={() => Linking.openURL(apiUrl)}> ссылке</Text>
            </Text>
          )}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Settings;

const styles = StyleSheet.create({})