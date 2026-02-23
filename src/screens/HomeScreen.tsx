import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Snackbar } from 'react-native-paper'; 
import { useNavigation } from '@react-navigation/native';

import { themeColors } from '../theme/colors';

import LoadingSpinner from '../components/LoadingSpinner';
import AppHeader from '../components/AppHeader';
import PromoBanner from '../components/PromoBanner';
import ProductCard, { Product } from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';

import { useProductStore } from '../store/useProductStore';
import { useCartStore } from '../store/cartStore'; 
import { useAuthStore } from '../store/authStore'; 

const categories = ['Destacados', 'Frutas', 'Aceites', 'Bebidas', 'Cuidado'];

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const [activeCategory, setActiveCategory] = useState('Destacados');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('#4CAF50'); // Verde por defecto
  const [toastAction, setToastAction] = useState({ label: 'OK', onPress: () => setToastVisible(false) });
  
  const { products, isLoading, fetchProducts } = useProductStore();
  const { addToCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      if (modalVisible) setModalVisible(false);
      
      setToastMessage('Debes iniciar sesión para comprar');
      setToastColor('#D32F2F');
      setToastAction({
        label: 'INICIAR',
        onPress: () => {
          setToastVisible(false);
          navigation.navigate('Perfil');
        }
      });
      setToastVisible(true);
      return;
    }

    addToCart(product, 1);
    
    setToastMessage(`${product.name} agregado al carrito`);
    setToastColor('#4CAF50'); 
    setToastAction({
      label: 'OK',
      onPress: () => setToastVisible(false)
    });
    setToastVisible(true);
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

      <Snackbar
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
        duration={3000}
        style={[styles.snackbar, { backgroundColor: toastColor }]}
        action={{
          label: toastAction.label,
          textColor: '#FFF',
          onPress: toastAction.onPress,
        }}
      >
        <Text style={styles.snackbarText}>{toastMessage}</Text>
      </Snackbar>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: themeColors.background },
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
  snackbar: { borderRadius: 8 },
  snackbarText: { color: '#FFF', fontWeight: '500' }
});