import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { usePlantStore } from "@/store/plantsStore";
import { differenceInCalendarDays, format } from "date-fns";
import { PlantlyButton } from "@/components/PlantlyButton";
import { theme } from "@/theme";
import { useEffect } from "react";
import { PlantlyImage } from "@/components/PlantlyImage";
import * as Notifications from "expo-notifications";

const fullDateFormat = "LLL d yyyy, h:mm aaa";
export default function PlantScreen() {
    const router = useRouter();
    const waterPlant = usePlantStore((store) => store.waterPlant);
    const removePlant = usePlantStore((store) => store.removePlant);
    const params = useLocalSearchParams();
    const navigation = useNavigation();
    const plantId = params.plantsId;
    const plant = usePlantStore((state) =>
        state.plants.find((plant) => String(plant.id) === plantId),
      );
    useEffect(() => {
        navigation.setOptions({ title: plant?.name });
    }, [plant?.name, navigation]);
    useEffect(() => {
      if (params.action === "water") {
        if (typeof plantId === "string") {
          waterPlant(plantId);
        }
     }
    //  (async () => {
    //   await Notifications.scheduleNotificationAsync({
    //     content: {
    //       title: "You've got mail! 📬",
    //       body: "Here is the notification body",
    //       data: { data: "secret message" },
    //     },
    //     trigger: null,
    //   });
    // })();

    }, []);
    const handleWaterPlant = async () => {
        if (typeof plantId === "string") {
          waterPlant(plantId);
        }
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'secret message'},
          },
          trigger: null,
        });
      };
    
      const handleDeletePlant = () => {
        if (!plant?.id) {
          return;
        }
        Alert.alert(
          `Are you sure you want to delete ${plant?.name}?`,
          "It will be gone for good",
          [
            {
              text: "Yes",
              onPress: () => {
                removePlant(plant.id);
                router.navigate("/");
              },
              style: "destructive",
            },
            { text: "Cancel", style: "cancel" },
          ],
        );
      };
    if (!plant) {
        return (
          <View>
            <Text>
              Plant with ID {plantId} not found
            </Text>
          </View>
        );
      }
    return (
        <View style={styles.detailsContainer}>
        <View style={{ alignItems: "center" }}>
          <PlantlyImage imageUri={plant.imageUri} />
          <View style={styles.spacer} />
          <Text style={styles.key}>Water me every</Text>
          <Text style={styles.value}>{plant.wateringFrequencyDays} days</Text>
          <Text style={styles.key}>Last watered at</Text>
          <Text style={styles.value}>
            {plant.lastWateredAtTimestamp
              ? `${format(plant.lastWateredAtTimestamp, fullDateFormat)}`
              : "Never 😟"}
          </Text>
          <Text style={styles.key}>Days since last watered</Text>
          <Text style={styles.value}>
            {plant.lastWateredAtTimestamp
              ? differenceInCalendarDays(Date.now(), plant.lastWateredAtTimestamp)
              : "N/A"}
          </Text>
        </View>
        <PlantlyButton title="Water me!" onPress={handleWaterPlant} />
        <Pressable style={styles.deleteButton} onPress={handleDeletePlant}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>
    );
}
const styles = StyleSheet.create({
    notFoundContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colorWhite,
    },
    notFoundText: {
      fontSize: 18,
    },
    detailsContainer: {
      padding: 12,
      backgroundColor: theme.colorWhite,
      flex: 1,
      justifyContent: "center",
    },
    key: {
      marginRight: 8,
      fontSize: 16,
      color: theme.colorBlack,
      textAlign: "center",
    },
    value: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: theme.colorGreen,
    },
    deleteButton: {
      padding: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    deleteButtonText: {
      color: theme.colorGrey,
      fontWeight: "bold",
    },
    spacer: {
      height: 18,
    },
  });