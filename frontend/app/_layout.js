import 'react-native-get-random-values';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const PRIMARY_COLOR = '#0922C1';
const FONT_COLOR_LIGHT = '#FFFFFF';

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="register"
        options={{
          title: 'Cadastro',
          headerStyle: { backgroundColor: PRIMARY_COLOR },
          headerTintColor: FONT_COLOR_LIGHT,
          headerTitleStyle: { fontFamily: 'Poppins-Bold' },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="chooseRole"
        options={{
          title: 'UFRide',
          headerStyle: { backgroundColor: PRIMARY_COLOR },
          headerTintColor: FONT_COLOR_LIGHT,
          headerTitleStyle: { fontFamily: 'Poppins-Bold' },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="findRide"
        options={{
          title: 'Procurar Carona',
          headerStyle: { backgroundColor: PRIMARY_COLOR },
          headerTintColor: FONT_COLOR_LIGHT,
          headerTitleStyle: { fontFamily: 'Poppins-Bold' },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="rideDetails"
        options={{
          title: 'Detalhes da Carona',
          headerStyle: { backgroundColor: PRIMARY_COLOR },
          headerTintColor: FONT_COLOR_LIGHT,
          headerTitleStyle: { fontFamily: 'Poppins-Bold' },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="offerRide/step1"
        options={{
          title: 'Cadastrar Carona',
          headerStyle: { backgroundColor: PRIMARY_COLOR },
          headerTintColor: FONT_COLOR_LIGHT,
          headerTitleStyle: { fontFamily: 'Poppins-Bold' },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="offerRide/step2"
        options={{
          title: 'Cadastrar Carona',
          headerStyle: { backgroundColor: PRIMARY_COLOR },
          headerTintColor: FONT_COLOR_LIGHT,
          headerTitleStyle: { fontFamily: 'Poppins-Bold' },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="offerRide/step3"
        options={{
          title: 'Cadastrar Carona',
          headerStyle: { backgroundColor: PRIMARY_COLOR },
          headerTintColor: FONT_COLOR_LIGHT,
          headerTitleStyle: { fontFamily: 'Poppins-Bold' },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}