import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Linking, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import AddressManager from '../../components/AddressManager';
import AppHeader from '../../components/AppHeader';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useOrderStore } from '../../store/useOrderStore'; // <-- 1. Importamos el store de pedidos

export default function CheckoutAddressScreen() {
  const navigation = useNavigation<any>();
  
  const { items, getTotal, getSubtotal, getShippingCost, getDiscount, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { createOrder } = useOrderStore(); // <-- 2. Extraemos la función de creación
  
  const [isProcessing, setIsProcessing] = useState(false); // <-- Estado para evitar doble clic

  const WHATSAPP_NUMBER = '573155800218'; 

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(amount);
  };

  const handleContinueToWhatsApp = async (selectedAddressId: string) => {
    if (isProcessing) return; // Prevenir múltiples toques
    
    const selectedAddress = user?.addresses.find(a => a.id === selectedAddressId);
    
    if (!selectedAddress) {
      Alert.alert('Error', 'No se pudo obtener la dirección seleccionada.');
      return;
    }

    setIsProcessing(true);

    // 3. Preparamos los datos tal cual los pide nuestro DTO del backend
    const fullAddressString = `${selectedAddress.address_line}, ${selectedAddress.city}, ${selectedAddress.department} ${selectedAddress.reference ? `(${selectedAddress.reference})` : ''}`;
    
    const orderPayload = {
      total_amount: getTotal(),
      shipping_address: fullAddressString,
      items: items.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }))
    };

    // 4. Enviamos silenciosamente la orden a nuestra base de datos
    const response = await createOrder(orderPayload);

    if (!response.success) {
      setIsProcessing(false);
      Alert.alert('Error', response.error || 'No pudimos registrar tu pedido. Por favor, intenta nuevamente.');
      return; // Detenemos el flujo si la base de datos falla (ej. falta de stock)
    }

    // 5. Armamos el mensaje, incluyendo ahora el ID corto del pedido para facilitar el tracking
    const shortOrderId = response.orderId ? response.orderId.split('-')[0].toUpperCase() : 'N/A';
    
    let message = `*¡Hola Fucsol! Quiero realizar un pedido* 🌿\n`;
    message += `*N° de Orden:* #${shortOrderId}\n\n`; // <-- Agregamos el ID de la base de datos
    message += `*🛒 DETALLE DEL PEDIDO:*\n`;
    
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.product.name} (${formatCurrency(item.product.price)})\n`;
    });

    message += `\n*💰 RESUMEN DE PAGO:*\n`;
    message += `Subtotal: ${formatCurrency(getSubtotal())}\n`;
    message += `Envío: ${formatCurrency(getShippingCost())}\n`;
    if (getDiscount() > 0) message += `Descuento: -${formatCurrency(getDiscount())}\n`;
    message += `*Total a pagar: ${formatCurrency(getTotal())}*\n\n`;

    message += `*📍 DATOS DE ENVÍO:*\n`;
    message += `Nombre: ${user?.full_name}\n`;
    message += `Dirección: ${selectedAddress.address_line}\n`;
    message += `Ciudad: ${selectedAddress.city}, ${selectedAddress.department}\n`;
    if (selectedAddress.reference) message += `Indicaciones: ${selectedAddress.reference}\n`;

    message += `\n¡Quedo atento(a) para confirmar el pago!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;

    try {
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
        clearCart();
        setIsProcessing(false);
        navigation.reset({ index: 0, routes: [{ name: 'Pedidos' }] });
      } else {
        setIsProcessing(false);
        Alert.alert('WhatsApp no instalado', 'Asegúrate de tener la aplicación instalada.');
      }
    } catch (error) {
      setIsProcessing(false);
      Alert.alert('Error', 'Ocurrió un problema al intentar abrir WhatsApp.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      {/* Si está cargando, mostramos un pequeño overlay visual para bloquear la pantalla */}
      {isProcessing && (
        <View style={styles.processingOverlay}>
          <ActivityIndicator size="large" color="#FF8C00" />
          <Text style={styles.processingText}>Asegurando tu pedido...</Text>
        </View>
      )}

      <AddressManager 
        isCheckout={true} 
        onContinue={handleContinueToWhatsApp} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8C00'
  }
});