import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddressManager from '../../components/AddressManager';

export default function AddressesScreen() {
  return (
    <View style={styles.container}>
      <AddressManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});