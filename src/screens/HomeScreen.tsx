import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, Badge, Text, Button, Avatar, ActivityIndicator } from 'react-native-paper';

import { themeColors } from '../theme/colors';
import ProductCard, { Product } from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useProductStore } from '../store/useProductStore';

const categories = ['Destacados', 'Frutas', 'Aceites', 'Bebidas', 'Cuidado'];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Destacados');
  
  const { products, isLoading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    console.log('Se agregó al carrito:', product.name);
  };

  return (
    <View style={styles.container}>
      
      <Appbar.Header style={styles.header} elevated={false}>
        <TouchableOpacity onPress={() => console.log('Logo presionado')} style={styles.logoBorderWrapper}>
          <Avatar.Image 
            size={38} 
            source={require('../../assets/logo.png')} 
            style={{ backgroundColor: 'transparent' }} 
          />
        </TouchableOpacity>
        
        <Appbar.Content title="Fucsol" titleStyle={styles.headerTitle} />
        
        <View>
          <Appbar.Action icon="cart-outline" onPress={() => console.log('Carrito')} color={themeColors.textDark} />
          <Badge style={styles.badge} size={16}>2</Badge>
        </View>
      </Appbar.Header>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
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
            <Text variant="bodyMedium" style={styles.bannerSubtitle}>Disfruta de la frescura tropical con 20% de descuento.</Text>
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

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((cat, index) => {
            const isActive = activeCategory === cat;
            return (
              <TouchableOpacity 
                key={index} 
                style={[styles.categoryChip, isActive && styles.categoryChipActive]} 
                onPress={() => setActiveCategory(cat)}
              >
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Destacados</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Ver todo</Text>
          </TouchableOpacity>
        </View>

        
        <View style={styles.productGrid}>
          {isLoading ? (
            <LoadingSpinner message="Buscando productos naturales..." />
          ) : (
            products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddPress={handleAddToCart} 
              />
            ))
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: themeColors.background },
  header: { backgroundColor: themeColors.background },
  logoBorderWrapper: {
    marginLeft: 16,
    marginRight: 8,
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.2,
    borderColor: themeColors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  headerTitle: { fontWeight: '900', textAlign: 'center', color: themeColors.textDark, fontSize: 20 },
  badge: { position: 'absolute', top: 4, right: 4, backgroundColor: themeColors.danger, fontWeight: 'bold' },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
  
  bannerContainer: { height: 180, width: '100%', marginBottom: 20, borderRadius: 16, overflow: 'hidden' },
  bannerOverlay: { flex: 1, backgroundColor: 'rgba(0, 20, 0, 0.4)', padding: 20, justifyContent: 'center', alignItems: 'flex-start' },
  promoTag: { backgroundColor: themeColors.primary, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, marginBottom: 12 },
  promoTagText: { color: themeColors.surface, fontSize: 12, fontWeight: 'bold' },
  bannerTitle: { color: themeColors.surface, fontWeight: 'bold', marginBottom: 8 },
  bannerSubtitle: { color: themeColors.surface, marginBottom: 16, maxWidth: '70%', opacity: 0.9 },
  bannerButton: { borderRadius: 12, paddingHorizontal: 4 },
  
  categoriesContainer: { marginBottom: 24, flexDirection: 'row' },
  categoryChip: { backgroundColor: themeColors.surface, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 12, borderWidth: 1, borderColor: themeColors.border },
  categoryChipActive: { backgroundColor: themeColors.primary, borderColor: themeColors.primary },
  categoryText: { color: themeColors.textMuted, fontWeight: '600' },
  categoryTextActive: { color: themeColors.surface, fontWeight: 'bold' },
  
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontWeight: 'bold', color: themeColors.textDark },
  seeAllText: { color: themeColors.primary, fontWeight: 'bold' },
  
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});