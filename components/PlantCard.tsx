import { StyleSheet, View, Text, Pressable } from "react-native";
import { theme } from "@/theme";
import { PlantType, usePlantStore } from "@/store/plantsStore";
import { PlantlyImage } from "./PlantlyImage";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from "expo-router";

export function PlantCard({ plant }: { plant: PlantType }) {
  const removePlant = usePlantStore((state) => state.removePlant);
  const handlePress = () => {
    removePlant(plant.id);
  }
  return (
    <Link href={`plants/${plant.id}`} asChild>
      <Pressable style={styles.plantCard}>
          <View style={styles.imageContainer}>
            <PlantlyImage size={100} imageUri={plant.imageUri} />
              <View style={styles.details}>
                  <Text numberOfLines={1} style={styles.plantName}>
                  {plant.name}
                  </Text>
                  <Text style={styles.subtitle}>
                  Water every {plant.wateringFrequencyDays} days
                  </Text>
              </View>
          </View>
        <Pressable onPress={handlePress}>
          <AntDesign name="closecircleo" size={24} color={theme.colorGreen} />
        </Pressable>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  plantCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: theme.colorBlack,
    backgroundColor: theme.colorWhite,
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  details: {
    padding: 14,
    justifyContent: "center",
  },
  plantName: {
    fontSize: 18,
    marginBottom: 4,
  },
  subtitle: {
    color: theme.colorGrey,
  },
  closeButton: {
    color: theme.colorGrey,
  },
});