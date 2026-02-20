import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text, Button, IconButton } from 'react-native-paper';
import { themeColors } from '../theme/colors';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
}

interface ProductCardProps {
  product: Product;
  onAddPress: (product: Product) => void;
}

export default function ProductCard({ product, onAddPress }: ProductCardProps) {
  return (
    <Card style={styles.productCard} mode="contained">
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image_url }} style={styles.productImage} />
        <IconButton 
          icon="heart-outline" 
          size={20} 
          style={styles.favoriteButton}
          iconColor={themeColors.textMuted}
        />
      </View>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.productCategory}>{product.category}</Text>
        <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.price.toLocaleString()}</Text>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <Button 
          mode="contained" 
          icon="cart-plus" 
          buttonColor={themeColors.primary}
          style={styles.addButton}
          labelStyle={styles.addButtonLabel}
          onPress={() => onAddPress(product)}
        >
          AGREGAR
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  productCard: { width: '48%', marginBottom: 16, backgroundColor: themeColors.surface, borderRadius: 16 },
  imageContainer: { position: 'relative', height: 140, backgroundColor: '#F3F4F6', borderTopLeftRadius: 16, borderTopRightRadius: 16, overflow: 'hidden' },
  productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  favoriteButton: { position: 'absolute', top: 4, right: 4, backgroundColor: 'rgba(255,255,255,0.8)' },
  cardContent: { paddingHorizontal: 12, paddingTop: 12, paddingBottom: 4 },
  productCategory: { fontSize: 10, color: themeColors.secondary, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 },
  productName: { fontSize: 14, fontWeight: 'bold', color: themeColors.textDark, marginBottom: 4 },
  productPrice: { fontSize: 16, fontWeight: '900', color: themeColors.secondary },
  cardActions: { paddingHorizontal: 12, paddingBottom: 12, paddingTop: 0 },
  addButton: { width: '100%', borderRadius: 8 },
  addButtonLabel: { fontSize: 12, fontWeight: 'bold' },
});