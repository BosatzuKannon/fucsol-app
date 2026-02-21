import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/profile/ProfileScreen';
import MyInfoScreen from '../screens/profile/MyInfoScreen';
import AddressesScreen from '../screens/profile/AddressesScreen';
import HelpCenterScreen from '../screens/profile/HelpCenterScreen';
import TermsScreen from '../screens/profile/TermsScreen';
import PrivacyScreen from '../screens/profile/PrivacyScreen';

export type ProfileStackParamList = {
  ProfileMain: undefined;
  MyInfo: undefined;
  Addresses: undefined;
  HelpCenter: undefined;
  Terms: undefined;
  Privacy: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerTitleAlign: 'center', headerTintColor: '#6A1B9A', headerBackTitle: '' }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="MyInfo" component={MyInfoScreen} options={{ title: 'Mi Información' }} />
      <ProfileStack.Screen name="Addresses" component={AddressesScreen} options={{ title: 'Direcciones de Envío' }} />
      <ProfileStack.Screen name="HelpCenter" component={HelpCenterScreen} options={{ title: 'Centro de Ayuda' }} />
      <ProfileStack.Screen name="Terms" component={TermsScreen} options={{ title: 'Términos y Condiciones' }} />
      <ProfileStack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'Política de Privacidad' }} />
    </ProfileStack.Navigator>
  );
}