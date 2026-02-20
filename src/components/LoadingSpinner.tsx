import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { themeColors } from '../theme/colors';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Cargando...' }: LoadingSpinnerProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={themeColors.primary} size="large" />
      {message ? <Text style={styles.text}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    marginTop: 12,
    color: themeColors.textMuted,
    fontWeight: '500',
  },
});