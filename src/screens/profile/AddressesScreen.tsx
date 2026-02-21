import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AddressesScreen() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topBackground} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Dirección 1: Principal */}
        <View style={[styles.card, styles.primaryCard]}>
          <View style={styles.cardHeader}>
            <View style={styles.iconTitleRow}>
              <MaterialCommunityIcons name="home-outline" size={24} color="#6A1B9A" />
              <Text variant="titleMedium" style={styles.cardTitle}>Casa</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Predeterminada</Text>
            </View>
          </View>
          
          <Text style={styles.addressText}>Calle 18 # 25-40</Text>
          <Text style={styles.addressSubText}>Barrio Centro, Pasto, Nariño</Text>
          <Text style={styles.addressSubText}>Torre 3, Apto 707</Text>
        </View>

        {/* Dirección 2: Secundaria */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconTitleRow}>
              <MaterialCommunityIcons name="briefcase-outline" size={24} color="#FF8A00" />
              <Text variant="titleMedium" style={styles.cardTitle}>Trabajo</Text>
            </View>
          </View>
          
          <Text style={styles.addressText}>Carrera 27 # 15-22</Text>
          <Text style={styles.addressSubText}>Edificio Empresarial, Piso 4, Pasto, Nariño</Text>
          <Text style={styles.addressSubText}>Dejar en recepción</Text>
        </View>

        {/* Botón estático para agregar nueva */}
        <Button 
          mode="outlined" 
          icon="plus" 
          onPress={() => console.log('Agregar dirección')}
          style={styles.addButton}
          textColor="#6A1B9A"
        >
          Agregar Nueva Dirección
        </Button>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#FAFAFA' },
  topBackground: { position: 'absolute', top: 0, left: 0, right: 0, height: 80, backgroundColor: '#F3E5F5' },
  scrollContent: { padding: 16, paddingTop: 24, paddingBottom: 40 },
  
  card: { 
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, 
    elevation: 1, marginBottom: 16, borderWidth: 1, borderColor: '#F0F0F0' 
  },
  primaryCard: { borderColor: '#6A1B9A', borderWidth: 1.5 }, // Resalta la dirección principal
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  iconTitleRow: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { fontWeight: 'bold', color: '#1A1A1A', marginLeft: 8 },
  badge: { backgroundColor: '#F3E5F5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#6A1B9A', fontSize: 12, fontWeight: 'bold' },
  
  addressText: { fontSize: 16, fontWeight: '600', color: '#333333', marginBottom: 4 },
  addressSubText: { color: '#666666', lineHeight: 20 },
  
  addButton: { marginTop: 8, borderColor: '#6A1B9A', borderStyle: 'dashed', borderWidth: 2, borderRadius: 12 },
});