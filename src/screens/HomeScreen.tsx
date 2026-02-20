import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, Badge, Text, Button, Avatar, ActivityIndicator } from 'react-native-paper';

import { themeColors } from '../theme/colors';

import LoadingSpinner from '../components/LoadingSpinner';
import AppHeader from '../components/AppHeader';
import PromoBanner from '../components/PromoBanner';
import ProductCard, { Product } from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';

import { useProductStore } from '../store/useProductStore';

const categories = ['Destacados', 'Frutas', 'Aceites', 'Bebidas', 'Cuidado'];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Destacados');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const { products, isLoading, fetchProducts } = useProductStore();

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedProduct(null), 300); // Limpia después de la animación
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    console.log('Se agregó al carrito:', product.name);
  };

  return (
    <View style={styles.container}>
      
      <AppHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        <PromoBanner />

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
                onCardPress={handleOpenModal} 
              />
            ))
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      <ProductDetailModal 
        visible={modalVisible}
        product={selectedProduct}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />

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