import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from './src/theme/colors';

import HomeScreen from './src/screens/HomeScreen';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: themeColors.primary,
    secondary: themeColors.secondary,
    background: themeColors.background,
    surface: themeColors.surface,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
          
          <HomeScreen />

          <StatusBar style="dark" />
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.surface,
  },
});