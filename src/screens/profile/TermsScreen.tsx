import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TermsScreen() {
  
  const BulletPoint = ({ text }: { text: string }) => (
    <View style={styles.bulletRow}>
      <MaterialCommunityIcons name="circle-small" size={24} color="#FF8A00" style={styles.bulletIcon} />
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.introCard}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="file-document-outline" size={28} color="#FFFFFF" />
          </View>
          <Text variant="titleLarge" style={styles.introTitle}>Términos de Uso</Text>
          <Text style={styles.introText}>
            Al utilizar Fucsol, aceptas los siguientes términos y condiciones. Por favor léelos cuidadosamente.
          </Text>
        </View>

        <View style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>1. Aceptación de los Términos</Text>
          <Text style={styles.paragraph}>
            Al registrarte y utilizar la aplicación Fucsol, aceptas cumplir con estos términos y condiciones en su totalidad para la compra de productos naturales en la región de Nariño.
          </Text>
        </View>

        <View style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>2. Uso de la Plataforma</Text>
          <Text style={styles.subTitle}>Como Usuario Comprador:</Text>
          <BulletPoint text="Debes proporcionar información veraz y actualizada para tus envíos." />
          <BulletPoint text="Eres responsable de mantener la confidencialidad de tu cuenta y contraseña." />
          <BulletPoint text="Aceptas que los productos son para uso personal y no para reventa no autorizada." />
        </View>

        <View style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>3. Productos y Precios</Text>
          <BulletPoint text="Nos esforzamos por mostrar los productos con la mayor precisión posible." />
          <BulletPoint text="Los colores y empaques reales pueden variar ligeramente de las fotografías." />
          <BulletPoint text="Todos los precios están en pesos colombianos (COP)." />
          <BulletPoint text="Nos reservamos el derecho de modificar los precios sin previo aviso." />
        </View>

        <View style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>4. Pedidos y Envíos</Text>
          <BulletPoint text="Los tiempos de entrega mostrados son estimados y pueden variar." />
          <BulletPoint text="Nos reservamos el derecho de rechazar o cancelar pedidos en caso de falta de stock o sospecha de fraude." />
          <BulletPoint text="Para pagos contra entrega, agradecemos tener el monto exacto disponible." />
        </View>

        <View style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>5. Conducta Prohibida</Text>
          <View style={styles.warningBox}>
            <MaterialCommunityIcons name="alert-outline" size={24} color="#FF8A00" style={styles.warningIcon} />
            <Text style={styles.warningText}>
              No está permitido: Realizar pedidos falsos, utilizar la plataforma para fines ilícitos, acosar a nuestros repartidores o suplantar identidades.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>6. Propiedad Intelectual</Text>
          <Text style={styles.paragraph}>
            Todos los derechos de propiedad intelectual, marcas, logotipos y contenido visual de la plataforma son propiedad exclusiva de Fucsol y sus creadores.
          </Text>
        </View>

        <View style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>7. Modificaciones</Text>
          <Text style={styles.paragraph}>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios importantes serán notificados a través de la aplicación.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  introCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 2,
    marginBottom: 20,
    marginTop: 10,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6A1B9A', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  introTitle: {
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  introText: {
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 1,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  subTitle: {
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    marginTop: 4,
  },
  paragraph: {
    color: '#666666',
    lineHeight: 22,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingRight: 16,
  },
  bulletIcon: {
    marginTop: -2,
    marginLeft: -8, 
  },
  bulletText: {
    color: '#666666',
    lineHeight: 22,
    flex: 1,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0', 
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF8A00',
    marginTop: 8,
  },
  warningIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  warningText: {
    flex: 1,
    color: '#333333',
    lineHeight: 20,
  }
});