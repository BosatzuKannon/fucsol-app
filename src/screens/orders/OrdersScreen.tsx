import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppHeader from '../../components/AppHeader';
import { useOrderStore, Order } from '../../store/useOrderStore';
import { useAuthStore } from '../../store/authStore';

export default function OrdersScreen() {
  const navigation = useNavigation<any>();
  const { orders, isLoading, fetchOrders } = useOrderStore();
  const { isAuthenticated } = useAuthStore();

  // Se ejecuta cada vez que el usuario entra a la pestaña de "Pedidos"
  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated) {
        fetchOrders();
      }
    }, [isAuthenticated])
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'PENDIENTE': return { color: '#FF8C00', icon: 'clock-outline', label: 'Pendiente' };
      case 'EN_CAMINO': return { color: '#2196F3', icon: 'truck-delivery-outline', label: 'En Camino' };
      case 'ENTREGADO': return { color: '#4CAF50', icon: 'check-circle-outline', label: 'Entregado' };
      case 'CANCELADO': return { color: '#F44336', icon: 'close-circle-outline', label: 'Cancelado' };
      default: return { color: '#757575', icon: 'help-circle-outline', label: status };
    }
  };

  // --- VISTAS CONDICIONALES ---

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader />
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons name="account-lock-outline" size={64} color="#BDBDBD" />
          <Text style={styles.emptyTitle}>Inicia sesión</Text>
          <Text style={styles.emptyText}>Para ver tu historial de pedidos necesitas acceder a tu cuenta.</Text>
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Perfil')}>
            <Text style={styles.loginButtonText}>IR AL PERFIL</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // --- RENDER DEL ITEM ---

  const renderOrderItem = ({ item }: { item: Order }) => {
    const status = getStatusConfig(item.status);
    const shortId = item.id.split('-')[0].toUpperCase();

    return (
      <View style={styles.orderCard}>
        {/* Cabecera del pedido */}
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderId}>Orden #{shortId}</Text>
            <Text style={styles.orderDate}>{formatDate(item.created_at)}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: status.color + '1A' }]}>
            <MaterialCommunityIcons name={status.icon as any} size={14} color={status.color} />
            <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
          </View>
        </View>

        {/* Resumen de productos */}
        <View style={styles.itemsContainer}>
          {item.order_items.map((orderItem, index) => (
            <Text key={index} style={styles.itemRow}>
              <Text style={styles.itemQuantity}>{orderItem.quantity}x </Text>
              <Text style={styles.itemName} numberOfLines={1}>{orderItem.products.name}</Text>
            </Text>
          ))}
        </View>

        {/* Footer del pedido */}
        <View style={styles.orderFooter}>
          <Text style={styles.totalLabel}>Total pagado:</Text>
          <Text style={styles.totalAmount}>{formatCurrency(item.total_amount)}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Mi Historial de Compras</Text>

        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#6A1B9A" />
            <Text style={styles.loadingText}>Cargando tus pedidos...</Text>
          </View>
        ) : orders.length === 0 ? (
          <View style={styles.centerContainer}>
            <MaterialCommunityIcons name="shopping-outline" size={64} color="#E0E0E0" />
            <Text style={styles.emptyTitle}>Aún no tienes pedidos</Text>
            <Text style={styles.emptyText}>Explora nuestra tienda y descubre los mejores productos naturales.</Text>
            <TouchableOpacity style={styles.exploreButton} onPress={() => navigation.navigate('Inicio')}>
              <Text style={styles.exploreButtonText}>EXPLORAR PRODUCTOS</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={renderOrderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  content: { flex: 1, paddingHorizontal: 16 },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#212121', marginVertical: 15 },
  
  // Estados vacíos / Carga
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  loadingText: { marginTop: 10, color: '#757575', fontSize: 16 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#424242', marginTop: 15, marginBottom: 5 },
  emptyText: { fontSize: 14, color: '#757575', textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  exploreButton: { backgroundColor: '#6A1B9A', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 8 },
  exploreButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  loginButton: { backgroundColor: '#FF8C00', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 8 },
  loginButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },

  // Tarjeta de Pedido
  listContainer: { paddingBottom: 30 },
  orderCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 15, borderWidth: 1, borderColor: '#EEEEEE', elevation: 1 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  orderId: { fontSize: 16, fontWeight: 'bold', color: '#212121' },
  orderDate: { fontSize: 12, color: '#9E9E9E', marginTop: 2 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
  
  itemsContainer: { backgroundColor: '#F5F5F5', padding: 10, borderRadius: 8, marginBottom: 12 },
  itemRow: { marginBottom: 4 },
  itemQuantity: { fontWeight: 'bold', color: '#424242' },
  itemName: { color: '#616161' },
  
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#EEEEEE', paddingTop: 12 },
  totalLabel: { fontSize: 14, color: '#757575' },
  totalAmount: { fontSize: 16, fontWeight: 'bold', color: '#212121' }
});