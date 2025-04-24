import { Text, View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Geovest app</Text>
      <Link href="/dashboard" style={styles.button}>
      Proceed to dashboard
      </Link>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292c",
    color: "white",
  },
  text:{
    color: "white",
    fontSize: 20,
  },
  button:{
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    color: "white",
  }
});
