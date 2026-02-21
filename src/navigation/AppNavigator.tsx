import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { useAuthStore } from '../store/authStore';

// Vistas Principales (Raíz)
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';

// Navegadores Modulares
import AuthNavigator from './AuthNavigator';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator();

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
          <Tab.Screen 
            name="Carrito" 
            component={CartScreen} 
            options={{ 
              tabBarBadge: 2, 
              tabBarBadgeStyle: { 
                backgroundColor: '#D32F2F', 
                color: 'white', 
                fontSize: 10,
                textAlign: 'center',
                textAlignVertical: 'center',
                lineHeight: 16,
                minWidth: 16,
                height: 16,
              } 
            }} 
          />
          {/* Usamos el ProfileNavigator modular */}
          <Tab.Screen name="Perfil" component={ProfileNavigator} />
        </>
      ) : (
        <>
          {/* Usamos el AuthNavigator modular */}
          <Tab.Screen name="Perfil" component={AuthNavigator} />
        </>
      )}
    </Tab.Navigator>
  );
}