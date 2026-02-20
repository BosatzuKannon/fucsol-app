import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Portal, Modal, Text, Button, IconButton } from 'react-native-paper';
import { Product } from './ProductCard';
import { themeColors } from '../theme/colors';

interface ProductDetailModalProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetailModal({ visible, product, onClose, onAddToCart }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        
        <IconButton
          icon="close"
          size={24}
          style={styles.closeButton}
          iconColor={themeColors.surface}
          containerColor="rgba(0,0,0,0.4)"
          onPress={onClose}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: product.image_url }} style={styles.image} />
          </View>

          <View style={styles.detailsContainer}>
            {product.category && (
              <Text style={styles.category}>{product.category}</Text>
            )}
            <Text variant="headlineSmall" style={styles.title}>{product.name}</Text>
            <View style={styles.priceRow}>
              <Text variant="headlineMedium" style={styles.price}>${product.price.toLocaleString()}</Text>
              {product.stock !== undefined && (
                <View style={styles.stockBadge}>
                  <Text style={styles.stockText}>Cantidad: {product.stock}</Text>
                </View>
              )}
            </View>
            
            <View style={styles.divider} />
            
            <Text variant="titleMedium" style={styles.descriptionTitle}>Descripción</Text>
            <Text style={styles.description}>
              {product.description || 'Este producto es 100% natural, elaborado con los mejores ingredientes para cuidar de ti.'}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button 
            mode="contained" 
            icon="cart-plus" 
            buttonColor={themeColors.primary}
            style={styles.addButton}
            labelStyle={styles.addButtonLabel}
            onPress={() => {
              onAddToCart(product);
              onClose();
            }}
          >
            AGREGAR AL CARRITO
          </Button>
        </View>

      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: themeColors.background,
    margin: 20,
    borderRadius: 24,
    overflow: 'hidden',
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#F3F4F6',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  category: {
    color: themeColors.secondary,
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontWeight: 'bold',
    color: themeColors.textDark,
    marginBottom: 8,
  },
  price: {
    fontWeight: '900',
    color: themeColors.secondary,
    marginBottom: 0,
  },
  divider: {
    height: 1,
    backgroundColor: themeColors.border,
    marginBottom: 16,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    color: themeColors.textDark,
    marginBottom: 8,
  },
  description: {
    color: themeColors.textMuted,
    lineHeight: 22,
  },
  footer: {
    padding: 16,
    backgroundColor: themeColors.surface,
    borderTopWidth: 1,
    borderColor: themeColors.border,
  },
  addButton: {
    borderRadius: 12,
    paddingVertical: 6,
  },
  addButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stockBadge: {
    backgroundColor: themeColors.border,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stockText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: themeColors.textDark,
  },
});