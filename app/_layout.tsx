import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="signIn"  options={{ headerShown: false }}/>
        <Stack.Screen name="signUp"  options={{ headerShown: false }}/>
        <Stack.Screen name="menu"  /*options={{ headerShown: false }}*//>
        <Stack.Screen name="search"  options={{ headerShown: false }}/>
        <Stack.Screen name="agendar"  options={{ headerShown: false }}/>
        <Stack.Screen name="favoritos"  /*options={{ headerShown: false }}*//>
        <Stack.Screen name="perfil"  options={{ headerShown: false }}/>
        <Stack.Screen name="mainTab"  /*options={{ headerShown: false }}*//>
        <Stack.Screen name="ListAgendamentos"  /*options={{ headerShown: false }}*//>
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
