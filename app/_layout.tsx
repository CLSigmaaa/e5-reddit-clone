import '~/global.css';

import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { AppState, Platform, View } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeToggle } from '~/components/ThemeToggle';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';

import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons'
import { SWRConfig } from 'swr';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        isVisible: () => { return true },
        initFocus(callback) {
          let appState = AppState.currentState

          const onAppStateChange = (nextAppState) => {
            /* Si l'application revient du mode arrière-plan ou d'inactif au mode actif */
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
              callback()
            }
            appState = nextAppState
          }

          // Ecoute des événements de changement d'état de l'application
          const subscription = AppState.addEventListener('change', onAppStateChange)

          return () => {
            subscription.remove()
          }
        }
      }}
    >

      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        <Stack>
          {/* <Stack.Screen name="post/[id]" options={{ headerShown: false }} /> */}
          <Stack.Screen name="subreddit/[id]" options={{ headerShown: false }} />

          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="post/[id]/index" // Corrected route name
            options={{
              headerTitle: '',
              headerStyle: { backgroundColor: '#FF5700' },
              headerLeft: () => <AntDesign name="close" size={24} color="white" onPress={() => router.back()} />,
              headerRight: () =>
                <View style={{ flexDirection: 'row', gap: 10 }}></View>,
              animation: "slide_from_bottom"
            }}
          />
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </SWRConfig>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
