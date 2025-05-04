import MessageBar from "@/components/MessageBar";
import { images } from "@/constants/images";
import { fetchAnswer } from "@/services/api";
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";

export default function Index() {
  const [questionQuery, setQuestionQuery] = useState<string | null>(null);
  const [answerData, setAnswerData] = useState<string | null>(null);
  const [answerIsLoading, setAnswerIsLoading] = useState(false);
  const [answerError, setAnswerError] = useState<Error | null>(null);

  const getAnswer = useCallback(async (questionQuery: string | null) => {
    if (!questionQuery) return;

    setAnswerIsLoading(true);
    setAnswerError(null);

    try {
      const data = await fetchAnswer({ query: questionQuery });
      setAnswerData(data);
    } catch (err) {
      setAnswerError(err as Error);
    } finally {
      setAnswerIsLoading(false);
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-primary">
        <Image
          source={images.bg}
          className="absolute w-full h-full z-0"
          resizeMode="cover"
        />

        <View
          className="absolute bottom-0 left-0 right-0"
          style={{ maxHeight: "80%" }}
        >
          <ScrollView
            className="px-5"
            scrollEventThrottle={16}
            keyboardShouldPersistTaps="handled"
            overScrollMode="always"
            nestedScrollEnabled={true}
            removeClippedSubviews={false} // Важно для Android
            collapsable={false} // Запрет оптимизации
            style={{
              zIndex: 1,
              backgroundColor: "transparent", // Пример фона
            }}
          >
            {answerIsLoading ? (
              <ActivityIndicator
                size="large"
                color="#FFFFFF"
                className="flex-1 justify-center items-center min-h-[50vh]"
              />
            ) : answerError ? (
              <View className="flex-1 justify-center items-center min-h-[50vh]">
                <Text className="text-red-500 text-center my-5 text-4xl">
                  Ошибка: {answerError.message}
                </Text>
              </View>
            ) : answerData ? (
              <View
                className="flex-1 justify-center items-center min-h-[50vh]"
                onStartShouldSetResponder={() => true}
              >
                <View className="mb-10">
                  <Text className="text-accent text-lg mb-2">Ваш вопрос:</Text>
                  <Text className="text-white text-lg font-bold mb-4">
                    {questionQuery}
                  </Text>
                  <Text className="text-accent text-lg mb-2">Ответ:</Text>
                  <Text className="text-white text-lg font-bold">
                    {answerData}
                  </Text>
                </View>
              </View>
            ) : (
              <View className="flex-1 justify-center items-center min-h-[50vh]">
                <View className="mb-10">
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
        </View>

        <View className="absolute top-0 bottom-[70%] right-0 left-0 justify-center items-center">
          <View className="w-[90%] min-h-16 justify-center">
            <MessageBar
              sendQuestion={(message) => {
                setQuestionQuery(message);
                getAnswer(message);
              }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}