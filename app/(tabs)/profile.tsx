import { Text, View, StyleSheet, Button } from "react-native";
import { theme } from "@/theme";
import { useUserStore } from "@/store/userStore";
export default function ProfileScreen() {
  const toggleHasOnBoarded = useUserStore((state) => state.toggleHadOnBoarded);
  return (
    <View style={styles.container}>
      <Button
        title="Logout"
        onPress={toggleHasOnBoarded}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  }
});
