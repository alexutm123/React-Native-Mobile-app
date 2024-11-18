import { Stack } from "expo-router";

export default function RootLayout() {
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
