import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Avatar, Text, List, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';

import AppHeader from '../../components/AppHeader';

type ProfileStackParamList = {
  ProfileMain: undefined;
  HelpCenter: undefined;
  Terms: undefined;
  Privacy: undefined;
  MyInfo: undefined;
  Addresses: undefined;
};
type ProfileNavProp = NativeStackNavigationProp<ProfileStackParamList, 'ProfileMain'>;

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigation = useNavigation<ProfileNavProp>();

  return (
    <View style={styles.container}>
      <AppHeader />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarGlow}>
              <Avatar.Image
                size={110}
                source={require('../../../assets/logo.png')} 
                style={styles.avatar}
              />
            </View>
            
            <TouchableOpacity style={styles.editBadge}>
              <MaterialCommunityIcons name="pencil" size={18} color="white" />
            </TouchableOpacity>
          </View>
          
          <Text variant="headlineSmall" style={styles.userName}>
            {user?.full_name || 'Usuario Fucsol'}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.ordersCard]}>
            <Text style={[styles.statValue, styles.ordersText]}>12</Text>
            <Text style={[styles.statLabel, styles.ordersText]}>PEDIDOS</Text>
          </View>
          
          <View style={[styles.statCard, styles.pointsCard]}>
            <Text style={[styles.statValue, styles.pointsText]}>{user?.points || 0}</Text>
            <Text style={[styles.statLabel, styles.pointsText]}>PUNTOS</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>CUENTA</Text>
        <View style={styles.menuContainer}>
          <List.Item
            title="Mi Información"
            titleStyle={styles.menuItemTitle}
            left={(props) => <List.Icon {...props} icon="account-outline" color="#FF8A00" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" color="#a5a2a2" />}
            style={styles.menuItem}
            onPress={() => navigation.navigate('MyInfo')}
          />
          <View style={styles.menuDivider} />
          <List.Item
            title="Direcciones de Envío"
            titleStyle={styles.menuItemTitle}
            left={(props) => <List.Icon {...props} icon="truck-outline" color="#FF8A00" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" color="#a5a2a2" />}
            style={styles.menuItem}
            onPress={() => navigation.navigate('Addresses')}
          />
        </View>

        <Text style={styles.sectionTitle}>SOPORTE Y LEGAL</Text>
        <View style={styles.menuContainer}>
          <List.Item
            title="Centro de Ayuda"
            titleStyle={styles.menuItemTitle}
            left={(props) => <List.Icon {...props} icon="help-circle-outline" color="#FF8A00" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" color="#a5a2a2" />}
            style={styles.menuItem}
            onPress={() => navigation.navigate('HelpCenter')}
          />
          <View style={styles.menuDivider} />
          <List.Item
            title="Términos y Condiciones"
            titleStyle={styles.menuItemTitle}
            left={(props) => <List.Icon {...props} icon="file-document-outline" color="#FF8A00" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" color="#a5a2a2" />}
            style={styles.menuItem}
            onPress={() => navigation.navigate('Terms')}
          />
          <View style={styles.menuDivider} />
          <List.Item
            title="Política de Privacidad"
            titleStyle={styles.menuItemTitle}
            left={(props) => <List.Icon {...props} icon="shield-check-outline" color="#FF8A00" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" color="#a5a2a2" />}
            style={styles.menuItem}
            onPress={() => navigation.navigate('Privacy')}
          />
        </View>

        <Button 
          mode="contained" 
          onPress={logout} 
          style={styles.logoutButton}
          buttonColor="#D32F2F"
          textColor="white"
        >
          Cerrar Sesión
        </Button>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', 
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 0,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarGlow: {
    borderRadius: 60,
    elevation: 8,
    shadowColor: '#6A1B9A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    backgroundColor: '#FFF3E0',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  editBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#FF8A00',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4, 
    borderColor: '#FFFFFF',
    elevation: 4,
  },
  userName: {
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ordersCard: { backgroundColor: '#FFF3E0' },
  ordersText: { color: '#FF8A00' },
  pointsCard: { backgroundColor: '#F3E5F5' },
  pointsText: { color: '#6A1B9A' },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#a5a2a2',
    letterSpacing: 1.5,
    marginBottom: 12,
    marginLeft: 8,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 1,
    marginBottom: 32,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  menuItemTitle: {
    fontWeight: '600',
    color: '#333333',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 56, 
  },
  
  logoutButton: {
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 20,
  }
});