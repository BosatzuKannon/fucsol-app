import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCartStore, CartItem } from '../../store/cartStore';

// 1. Importamos el AppHeader
import AppHeader from '../../components/AppHeader';

export default function CartScreen() {
  const navigation = useNavigation<any>();
  
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    getSubtotal, 
    getShippingCost, 
    getDiscount, 
    getTotal 
  } = useCartStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartCard}>
      <Image 
        source={{ uri: item.product.image_url || 'https://via.placeholder.com/80' }} 
        style={styles.productImage} 
        resizeMode="cover"
      />
      
      <View style={styles.productInfo}>
        <View style={styles.titleRow}>
          <Text style={styles.productName} numberOfLines={1}>{item.product.name}</Text>
          <TouchableOpacity onPress={() => removeFromCart(item.product.id)} style={styles.deleteButton}>
            <MaterialCommunityIcons name="trash-can-outline" size={20} color="#9E9E9E" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.productVariant}>{item.product.category || 'Producto Fucsol'}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>{formatCurrency(item.product.price)}</Text>
          
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityBtn}
              onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
            >
              <MaterialCommunityIcons name="minus" size={16} color="#212121" />
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{item.quantity}</Text>
            
            <TouchableOpacity 
              style={[styles.quantityBtn, styles.quantityBtnAdd]}
              onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
            >
              <MaterialCommunityIcons name="plus" size={16} color="#FF8C00" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        {/* 2. Usamos AppHeader */}
        <AppHeader />
        
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="cart-outline" size={80} color="#E0E0E0" />
          <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
          <Text style={styles.emptyText}>¡Agrega algunos productos naturales para continuar!</Text>
          <TouchableOpacity 
            style={styles.continueShoppingBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.continueShoppingText}>Ir a la tienda</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 2. Usamos AppHeader aquí también */}
      <AppHeader />

      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        renderItem={renderCartItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatCurrency(getSubtotal())}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Envío</Text>
          <Text style={styles.summaryValue}>{formatCurrency(getShippingCost())}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryText, styles.discountText]}>Descuento (10%)</Text>
          <Text style={[styles.summaryValue, styles.discountText]}>-{formatCurrency(getDiscount())}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.summaryRow}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalValue}>{formatCurrency(getTotal())}</Text>
        </View>

        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('CheckoutAddresses')} 
        >
          <Text style={styles.checkoutButtonText}>CONTINUAR AL PAGO</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  listContainer: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  cartCard: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 16, padding: 12, marginBottom: 15, borderWidth: 1, borderColor: '#EEEEEE', alignItems: 'center' },
  productImage: { width: 70, height: 70, borderRadius: 10, backgroundColor: '#F5F5F5' },
  productInfo: { flex: 1, marginLeft: 15, justifyContent: 'space-between', height: 70 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  productName: { fontSize: 15, fontWeight: 'bold', color: '#212121', flex: 1, marginRight: 10 },
  deleteButton: { padding: 2 },
  productVariant: { fontSize: 12, color: '#9E9E9E', marginTop: 2 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: '#FF8C00' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 8, borderWidth: 1, borderColor: '#EEEEEE' },
  quantityBtn: { paddingHorizontal: 8, paddingVertical: 4 },
  quantityBtnAdd: { backgroundColor: '#FFF3E0', borderTopRightRadius: 7, borderBottomRightRadius: 7 },
  quantityText: { fontSize: 14, fontWeight: 'bold', paddingHorizontal: 10, color: '#212121' },
  summaryContainer: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 25, shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 10 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryText: { fontSize: 14, color: '#757575' },
  summaryValue: { fontSize: 14, fontWeight: '600', color: '#212121' },
  discountText: { color: '#FF8C00' },
  divider: { height: 1, backgroundColor: '#EEEEEE', marginVertical: 15 },
  totalText: { fontSize: 18, fontWeight: 'bold', color: '#212121' },
  totalValue: { fontSize: 20, fontWeight: 'bold', color: '#212121' },
  checkoutButton: { backgroundColor: '#FF8C00', flexDirection: 'row', borderRadius: 12, paddingVertical: 18, justifyContent: 'center', alignItems: 'center', marginTop: 20, elevation: 2 },
  checkoutButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginRight: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#212121', marginTop: 20, marginBottom: 10 },
  emptyText: { fontSize: 14, color: '#757575', textAlign: 'center', marginBottom: 30, lineHeight: 22 },
  continueShoppingBtn: { backgroundColor: '#6A1B9A', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 12 },
  continueShoppingText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 }
});