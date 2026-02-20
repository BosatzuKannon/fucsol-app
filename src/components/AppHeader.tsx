import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar, Badge, Avatar, Text } from 'react-native-paper';
import { themeColors } from '../theme/colors';

export default function AppHeader() {
  return (
    <Appbar.Header style={styles.header} elevated={false}>
      
      <TouchableOpacity onPress={() => console.log('Logo presionado')} style={styles.logoBorderWrapper}>
        <Avatar.Image 
          size={38} 
          source={require('../../assets/logo.png')} 
          style={{ backgroundColor: 'transparent' }} 
        />
      </TouchableOpacity>
      
      <Appbar.Content 
        title={
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Fucsol</Text>
            <Text style={styles.slogan}>Más natural ¡Imposible!</Text>
          </View>
        } 
        style={styles.contentAlignment}
      />
      
      <View>
        <Appbar.Action icon="cart-outline" onPress={() => console.log('Carrito')} color={themeColors.textDark} />
        <Badge style={styles.badge} size={16}>2</Badge>
      </View>

    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: { 
    backgroundColor: themeColors.background,
  },
  logoBorderWrapper: {
    marginLeft: 16,
    marginRight: 8,
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: themeColors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentAlignment: {
    alignItems: 'center',
  },
  titleContainer: {
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
  badge: { 
    position: 'absolute', 
    top: 4, 
    right: 4, 
    backgroundColor: themeColors.danger, 
    fontWeight: 'bold' 
  },
});