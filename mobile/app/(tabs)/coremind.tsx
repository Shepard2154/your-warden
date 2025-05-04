import MessageBar from '@/components/MessageBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";


const coremind = () => {
  const [goal, setGoal] = useState<null | string>(null);
  const { getItem, setItem } = useAsyncStorage("GOAL");

  useEffect(() => {
    const loadGoal = async () => {
      const goalFromStore = await getItem();
      if (!goalFromStore) {
        let persistentGoal = 'Быть счастливым!';
        await setItem(persistentGoal);
        setGoal(persistentGoal);
      } else {
        setGoal(goalFromStore);
      }
    };
    loadGoal();
  }, []);

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
              placeholder="Напиши новую цель"
              sendMessage={async (goal) => {
                setGoal(goal);
                await setItem(goal);
              }}
            />
          </View>
        </View>
        <Text className="text-accent mb-10 text-2xl">Ваша цель:</Text>
        <Text className="text-5xl color-blue-500 text-center">{goal}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default coremind

