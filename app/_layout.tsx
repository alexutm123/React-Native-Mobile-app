import { Stack,SplashScreen } from "expo-router";

export default function RootLayout() {
  SplashScreen.preventAutoHideAsync();
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false,animation:"fade" }} />
      <Stack.Screen
        name="onboarding"
        options={{
          animation:"fade",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
