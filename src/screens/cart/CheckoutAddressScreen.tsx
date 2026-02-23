import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import AddressManager from '../../components/AddressManager';
import AppHeader from '../../components/AppHeader';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

export default function CheckoutAddressScreen() {
  const navigation = useNavigation<any>();
  
  const { items, getTotal, getSubtotal, getShippingCost, getDiscount, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const WHATSAPP_NUMBER = '573155800218'; 

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(amount);
  };

  const handleContinueToWhatsApp = async (selectedAddressId: string) => {
    const selectedAddress = user?.addresses.find(a => a.id === selectedAddressId);
    
    if (!selectedAddress) {
      Alert.alert('Error', 'No se pudo obtener la dirección seleccionada.');
      return;
    }

    let message = `*¡Hola Fucsol! Quiero realizar un pedido* 🌿\n\n`;
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
    const whatsappUrl = `whatsapp://send?phone=573155800218&text=${encodedMessage}`;

    try {
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
        clearCart();
        navigation.reset({ index: 0, routes: [{ name: 'Pedidos' }] });
      } else {
        Alert.alert('WhatsApp no instalado', 'Asegúrate de tener la aplicación instalada.');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un problema al intentar abrir WhatsApp.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <AddressManager 
        isCheckout={true} 
        onContinue={handleContinueToWhatsApp} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15, backgroundColor: '#FAFAFA' },
  backButton: { padding: 5, marginLeft: -5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#212121' },
});