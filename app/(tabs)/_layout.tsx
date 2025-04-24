import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide header for all tabs
        headerTitle: "Geovest",
        tabBarActiveTintColor: "blue",
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{ 
          headerTitle: "Geovest Dashboard", 
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid-outline" size={24} color={color} />
          ),
         }}
      />
      <Tabs.Screen
        name="about"
        options={{ 
          headerTitle: "About Geovest", 
          tabBarLabel: "About",
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text-outline" size={24} color={color} />
          ),
        
        }}
      />
    </Tabs>
  );
}
