import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack> 
    <Stack.Screen name="index" options={
      { headerShown: false, title: "Geovest" }
    }/>

  <Stack.Screen name="(tabs)" options={
      { headerShown: false, title: "Geovest" }
    }/>
  </Stack>
  );
}
