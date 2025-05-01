import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { Image, ImageBackground, ImageSourcePropType, Text, View } from "react-native";

type TabIconProps = {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
};

const TabIcon = ({ focused, icon, title }: TabIconProps) => {
  if (focused) {
    return (
      <>
        <ImageBackground
          source={images.highlight}
          className="flex flex-row w-full flex-1 min-w-[112px]
                min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
        >
          <Image source={icon} tintColor="#151312" className="size-5" />
          <Text className="text-secondary text-base font-semibold ml-2">
            {title}
          </Text>
        </ImageBackground>
      </>
    );
  }

  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  );
};

export default function _Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0d23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0d23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Чат",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title={"Чат"} />
          ),
        }}
      />
      <Tabs.Screen
        name="coremind"
        options={{
          headerShown: false,
          title: "Цель",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title={"Цель"} />
          ),
        }}
      />
      <Tabs.Screen
        name="starred"
        options={{
          headerShown: false,
          title: "Избранное",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title={"Избранное"} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          title: "История",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.star} title={"История"} />
          ),
        }}
      />
    </Tabs>
  );
}