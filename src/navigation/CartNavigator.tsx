import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CartScreen from '../screens/cart/CartScreen';
import CheckoutAddressScreen from '../screens/cart/CheckoutAddressScreen';

export type CartStackParamList = {
  CartMain: undefined;
  CheckoutAddresses: undefined;
};

const CartStack = createNativeStackNavigator<CartStackParamList>();

export default function CartNavigator() {
  return (
    <CartStack.Navigator screenOptions={{ headerTitleAlign: 'center', headerTintColor: '#6A1B9A', headerBackTitle: '' }}>
      <CartStack.Screen name="CartMain" component={CartScreen} options={{ headerShown: false }} />
      <CartStack.Screen name="CheckoutAddresses" component={CheckoutAddressScreen} options={{ headerShown: false }} />
    </CartStack.Navigator>
  );
}