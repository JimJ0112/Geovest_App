import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {Image } from "expo-image";

export default function Dashboard() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [heartRate, setHeartRate] = useState<number | null>(null);
  const [remarks, setRemarks] = useState("");
  const [mapType, setMapType] = useState<"standard" | "satellite" | "hybrid" | "terrain">("standard");

  const mapRef = useRef<MapView>(null);

  const fetchLocation = async () => {
    try {
      const response = await fetch("http://172.16.9.11/Geovest/server/location_get.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "vest_num=1",
      });

      const json = await response.json();
      if (json.success && json.data.length > 0) {
        const data = json.data[0];
        const lat = parseFloat(data.latitude);
        const lng = parseFloat(data.longitude);

        setLocation({ latitude: lat, longitude: lng });
        setHeartRate(data.heart_rate);

        if (data.heart_rate > 59) {
          setRemarks("Pulse detection stable");
        } else {
          setRemarks("Pulse detection not stable");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchLocation();
    const interval = setInterval(fetchLocation, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../assets/images/vest_icon.png")} style={styles.vestIcon} />
        <Text style={styles.title}>Vest 1</Text>
      </View>

      <View style={styles.card}>
        <Image
          source={
            heartRate && heartRate > 59
              ? require("../../assets/images/heartbeat.gif")
              : require("../../assets/images/heartbeat-static.png")
          }
          style={styles.heartIcon}
        />
        <Text style={styles.label}>Heart Rate:</Text>
        <Text style={styles.value}>{heartRate ?? "Loading..."}</Text>

        <Text style={styles.label}>Remarks:</Text>
        <Text style={styles.value}>{remarks}</Text>
      </View>

      {location && (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            mapType={mapType}
          >
            <Marker coordinate={location} title="Vest 1" />
          </MapView>
4
          <View style={styles.selector}>
            {["standard", "satellite", "hybrid", "terrain"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.typeButton, mapType === type && styles.selectedTypeButton]}
                onPress={() => setMapType(type as typeof mapType)}
              >
                <Text style={styles.typeText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292c",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  vestIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: "center",
  },
  label: {
    color: "#bbb",
    fontSize: 16,
  },
  value: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  heartIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  map: {
    flex: 1,
    borderRadius: 10,
    height: 300,
    marginTop: 10,
  },
  selector: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    paddingBottom: 10,
  },
  typeButton: {
    backgroundColor: "#444",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  selectedTypeButton: {
    backgroundColor: "#007AFF",
  },
  typeText: {
    color: "#fff",
    fontSize: 14,
  },
});
