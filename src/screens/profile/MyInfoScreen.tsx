import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, TextInput, Avatar } from 'react-native-paper';
import { useAuthStore } from '../../store/authStore';

export default function MyInfoScreen() {
  // Traemos los datos del usuario logueado
  const user = useAuthStore((state) => state.user);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topBackground} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Avatar Central */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarGlow}>
            <Avatar.Image
              size={100}
              source={require('../../../assets/logo.png')} // Ajusta la ruta si es necesario
              style={styles.avatar}
            />
          </View>
        </View>

        {/* Tarjeta de Información */}
        <View style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>Datos Personales</Text>
          <Text style={styles.helperText}>
            Por el momento, la edición de datos no está disponible.
          </Text>

          {/* Usamos TextInputs deshabilitados para que se vean estructurados pero no editables */}
          <TextInput
            label="Nombre completo"
            value={user?.full_name || ''}
            mode="outlined"
            disabled
            style={styles.input}
            outlineColor="#E0E0E0"
            theme={{ roundness: 12 }}
            left={<TextInput.Icon icon="account" color="#a5a2a2" />} 
          />

          <TextInput
            label="Correo electrónico"
            value={user?.email || ''}
            mode="outlined"
            disabled
            style={styles.input}
            outlineColor="#E0E0E0"
            theme={{ roundness: 12 }}
            left={<TextInput.Icon icon="email" color="#a5a2a2" />} 
          />

          <TextInput
            label="Teléfono / Celular"
            value={user?.phone || 'No registrado'}
            mode="outlined"
            disabled
            style={styles.input}
            outlineColor="#E0E0E0"
            theme={{ roundness: 12 }}
            left={<TextInput.Icon icon="phone" color="#a5a2a2" />} 
          />
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#FAFAFA' },
  topBackground: { position: 'absolute', top: 0, left: 0, right: 0, height: 120, backgroundColor: '#F3E5F5' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  avatarSection: { alignItems: 'center', marginBottom: 24, marginTop: 10 },
  avatarGlow: {
    borderRadius: 54, elevation: 8, shadowColor: '#6A1B9A',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15,
    shadowRadius: 10, backgroundColor: '#FFFFFF',
  },
  avatar: { backgroundColor: '#FFF3E0', borderWidth: 4, borderColor: '#FFFFFF' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, elevation: 1, borderWidth: 1, borderColor: '#F0F0F0' },
  cardTitle: { fontWeight: 'bold', color: '#1A1A1A', marginBottom: 8 },
  helperText: { color: '#FF8A00', fontSize: 13, marginBottom: 20, fontStyle: 'italic' },
  input: { marginBottom: 16, backgroundColor: '#FAFAFA' },
});