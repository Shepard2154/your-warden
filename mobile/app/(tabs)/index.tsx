import MessageBar from "@/components/MessageBar";
import { images } from "@/constants/images";
import { useState } from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';

export default function Index() {
  const [answer, setAnswer] = useState(null);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-primary">
        {/* Фоновое изображение */}
        <Image
          source={images.bg}
          className="absolute w-full h-full z-0"
          resizeMode="cover"
        />

        {/* Основной контент с отступом для клавиатуры */}
        <ScrollView
          className="flex-1 px-5"
          contentContainerStyle={{
            minHeight: "100%",
          }}
          keyboardShouldPersistTaps="handled"
        >
          {answer ? (
            <Text className="text-white text-base pt-4">{answer}</Text>
          ) : (
            <View className="flex-1 justify-center items-center min-h-[80vh]">
              <View>
                <Text className="font-semibold text-accent text-3xl text-center mb-4">
                  Hi, я твой ассистент на пути к цели!
                </Text>
                <Text className="font-semibold text-[#a8b5db] text-3xl text-center">
                  Чем тебе сегодня помочь?
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Панель ввода с динамическим отступом */}
        <View className="absolute top-3/4 bottom-0 right-0 left-0 justify-center items-center border-1 border-white rounded-lg">
          <MessageBar />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}