import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Toaster } from 'sonner-native';
import HomeScreen from "./screens/HomeScreen"
import MarketplaceScreen from "./screens/MarketplaceScreen"
import AboutScreen from "./screens/AboutScreen"
import CareersScreen from "./screens/CareersScreen"

import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Typings
type AboutScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'About'>;
type AboutScreenRouteProp = RouteProp<RootStackParamList, 'About'>;




type RootStackParamList = {
  Home: undefined;
  Marketplace: undefined;
  About: undefined;
  Careers: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Careers" component={CareersScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <Toaster />
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    userSelect: "none"
  }
});
