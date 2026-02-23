import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrdersScreen from '../screens/orders/OrdersScreen';

export type OrderStackParamList = {
  OrdersList: undefined;
};

const OrderStack = createNativeStackNavigator<OrderStackParamList>();

export default function OrderNavigator() {
  return (
    <OrderStack.Navigator screenOptions={{ headerShown: false }}>

      <OrderStack.Screen name="OrdersList" component={OrdersScreen} />
      
    </OrderStack.Navigator>
  );
}