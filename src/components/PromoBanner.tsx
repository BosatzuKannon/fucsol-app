import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { themeColors } from '../theme/colors';

export default function PromoBanner() {
  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=800&auto=format&fit=crop' }} 
      style={styles.bannerContainer} 
      imageStyle={{ borderRadius: 16 }} 
      resizeMode="cover"
    >
      <View style={styles.bannerOverlay}>
        <View style={styles.promoTag}>
          <Text style={styles.promoTagText}>PROMO</Text>
        </View>
        <Text variant="headlineMedium" style={styles.bannerTitle}>Coco Lovers</Text>
        <Text variant="bodyMedium" style={styles.bannerSubtitle}>
          Disfruta de la frescura tropical con 20% de descuento.
        </Text>
        <Button 
          mode="contained" 
          buttonColor={themeColors.surface} 
          textColor={themeColors.textDark} 
          style={styles.bannerButton} 
          labelStyle={{ fontWeight: 'bold' }} 
          onPress={() => console.log('Ver Oferta')}
        >
          Ver Oferta
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bannerContainer: { height: 180, width: '100%', marginBottom: 20, borderRadius: 16, overflow: 'hidden' },
  bannerOverlay: { flex: 1, backgroundColor: 'rgba(0, 20, 0, 0.4)', padding: 20, justifyContent: 'center', alignItems: 'flex-start' },
  promoTag: { backgroundColor: themeColors.primary, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, marginBottom: 12 },
  promoTagText: { color: themeColors.surface, fontSize: 12, fontWeight: 'bold' },
  bannerTitle: { color: themeColors.surface, fontWeight: 'bold', marginBottom: 8 },
  bannerSubtitle: { color: themeColors.surface, marginBottom: 16, maxWidth: '70%', opacity: 0.9 },
  bannerButton: { borderRadius: 12, paddingHorizontal: 4 },
});