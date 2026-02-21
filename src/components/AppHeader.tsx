import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar, Badge, Avatar, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { themeColors } from '../theme/colors';

import { useAuthStore } from '../store/authStore';

export default function AppHeader() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Appbar.Header style={styles.header} elevated={false}>
      
      <View style={styles.sideContainer}>
        <TouchableOpacity onPress={() => console.log('Logo presionado')} style={styles.logoBorderWrapper}>
          <Avatar.Image 
            size={38} 
            source={require('../../assets/logo.png')} 
            style={{ backgroundColor: 'transparent' }} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.centerContainer}>
        <Text style={styles.headerTitle}>Fucsol</Text>
        <Text style={styles.slogan}>Más natural ¡Imposible!</Text>
      </View>
      
      <View style={[styles.sideContainer, styles.rightContainer]}>
        {isAuthenticated && (
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#6A1B9A" />
            <Badge style={styles.badge} size={16}>2</Badge>
          </TouchableOpacity>
        )}
      </View>

    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: { 
    backgroundColor: themeColors.background,
    justifyContent: 'space-between',
  },
  sideContainer: {
    width: 70,
    justifyContent: 'center',
  },
  rightContainer: {
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  logoBorderWrapper: {
    marginLeft: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: themeColors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { 
    fontWeight: '900', 
    color: themeColors.textDark, 
    fontSize: 20,
    lineHeight: 22,
  },
  slogan: {
    fontSize: 13,
    color: themeColors.secondary,
    fontWeight: 'bold',
  },
  notificationButton: {
    position: 'relative',
    padding: 4,
  },
  badge: { 
    position: 'absolute', 
    top: 0,
    right: 0, 
    backgroundColor: themeColors.danger, 
    fontWeight: 'bold',
    fontSize: 10
  },
});