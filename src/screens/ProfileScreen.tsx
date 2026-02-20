import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useAuthStore } from '../store/authStore';

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Mi Perfil</Text>
      
      <View style={styles.card}>
        <Text variant="bodyLarge">👤 Nombre: {user?.full_name}</Text>
        <Text variant="bodyLarge">✉️ Correo: {user?.email}</Text>
        <Text variant="bodyLarge">📱 Teléfono: {user?.phone}</Text>
        <Text variant="bodyLarge" style={styles.points}>⭐ Puntos Fucsol: {user?.points}</Text>
      </View>

      <Button 
        mode="outlined" 
        onPress={logout} 
        style={styles.button}
        textColor="#d32f2f" 
      >
        Cerrar Sesión
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1A1A1A',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFF3E0',
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
    gap: 10,
  },
  points: {
    fontWeight: 'bold',
    color: '#FF8A00',
    marginTop: 8,
  },
  button: {
    borderColor: '#d32f2f',
  }
});