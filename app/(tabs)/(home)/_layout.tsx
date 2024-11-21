import { AntDesign } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import { theme } from "@/theme";

export const unstable_settings = {
    initialRouteName: "index",
  };
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: () => (
            <Link href="/new" asChild>
              <Pressable hitSlop={700}>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={theme.colorGreen}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen name="plants/[plantsId]" 
        options={{
          title: "",
          headerBackTitle: "",
          headerTintColor: theme.colorBlack,
        }} />
         <Stack.Screen
        name="new"
        options={{
          presentation: "modal",
          title: "New plant",
        }}
      />
    </Stack>
  );
}
