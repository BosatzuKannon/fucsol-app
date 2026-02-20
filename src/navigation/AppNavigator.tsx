import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { useAuthStore } from '../store/authStore';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';

const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

export default function AppNavigator() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#e77e06',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: '#7b1fa2b4',
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof MaterialCommunityIcons.glyphMap = 'help-circle';

          if (route.name === 'Inicio') iconName = 'home';
          else if (route.name === 'Pedidos') iconName = 'format-list-bulleted';
          else if (route.name === 'Carrito') iconName = 'cart';
          else if (route.name === 'Perfil') iconName = 'account';

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      
      <Tab.Screen name="Inicio" component={HomeScreen} />

      {isAuthenticated ? (
        <>
          <Tab.Screen name="Pedidos" component={OrdersScreen} />
          <Tab.Screen name="Carrito" component={CartScreen} />
          <Tab.Screen name="Perfil" component={ProfileScreen} />
        </>
      ) : (
        <>
          <Tab.Screen name="Perfil" component={AuthStackNavigator} />
        </>
      )}
    </Tab.Navigator>
  );
}