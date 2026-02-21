import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PrivacyScreen() {
  
  const BulletPoint = ({ text }: { text: string }) => (
    <View style={styles.bulletRow}>
      <MaterialCommunityIcons name="circle-small" size={24} color="#FF8A00" style={styles.bulletIcon} />
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );

  const IconBullet = ({ icon, text, boldText }: { icon: any, text: string, boldText?: string }) => (
    <View style={styles.iconBulletRow}>
      <MaterialCommunityIcons name={icon} size={20} color="#a5a2a2" style={styles.specificIcon} />
      <Text style={styles.bulletText}>
        {boldText && <Text style={{ fontWeight: 'bold', color: '#6A1B9A' }}>{boldText} </Text>}
        {text}
      </Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.introCard}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="shield-check-outline" size={28} color="#FFFFFF" />
          </View>
          <Text variant="titleLarge" style={styles.introTitle}>Tu Privacidad es Nuestra Prioridad</Text>
          <Text style={styles.introText}>
            En Fucsol nos comprometemos a proteger tu información personal y ser completamente transparentes sobre cómo la utilizamos.
          </Text>
        </View>

        <View style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>Información que Recopilamos</Text>
          <BulletPoint text="Información de perfil (nombre, correo electrónico, teléfono)." />
          <BulletPoint text="Direcciones de envío para la entrega de tus pedidos." />
          <BulletPoint text="Historial de compras y acumulación de puntos." />
        </View>

        <View style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>Cómo Utilizamos tu Información</Text>
          <BulletPoint text="Procesar y entregar tus pedidos de productos naturales." />
          <BulletPoint text="Gestionar tus Puntos Fucsol y recompensas." />
          <BulletPoint text="Mejorar nuestros servicios y la experiencia en la aplicación." />
        </View>

        <View style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>Compartición de Información</Text>
          
          <View style={styles.infoBox}>
            <MaterialCommunityIcons name="information-outline" size={24} color="#6A1B9A" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              <Text style={{ fontWeight: 'bold' }}>NO compartimos tu información personal con terceros </Text> 
              para fines publicitarios, excepto lo estrictamente necesario para la entrega de tu pedido.
            </Text>
          </View>

          <Text style={styles.subTitle}>Al realizar un pedido:</Text>
          <IconBullet 
            icon="truck-delivery-outline" 
            boldText="Compartimos con el repartidor" 
            text="únicamente la dirección de envío y teléfono de contacto." 
          />
          <IconBullet 
            icon="eye-off-outline" 
            text="Tu contraseña y datos sensibles nunca son visibles para el personal logístico ni administrativo." 
          />
        </View>

        <View style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>Protección de tus Datos</Text>
          <BulletPoint text="Contraseñas encriptadas de forma segura." />
          <BulletPoint text="Acceso restringido a información sensible." />
          <BulletPoint text="Cumplimiento con las normativas locales de protección de datos." />
        </View>

        <View style={styles.card}>
          <Text variant="titleMedium" style={styles.cardTitle}>Tus Derechos</Text>
          <BulletPoint text="Acceder a tu información personal en la sección 'Mi Información'." />
          <BulletPoint text="Corregir información inexacta o desactualizada." />
          <BulletPoint text="Solicitar la eliminación permanente de tu cuenta." />
        </View>

        <View style={styles.contactCard}>
          <Text variant="titleMedium" style={styles.cardTitle}>¿Preguntas o Consultas?</Text>
          <Text style={styles.paragraph}>
            Si tienes alguna pregunta sobre nuestra política de privacidad o el manejo de tus datos, contáctanos en:
            <Text style={styles.emailText}> fucsolinc@gmail.com</Text>
          </Text>
        </View>

        <Text style={styles.footerText}>Última actualización: Febrero 2026</Text>

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
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 1,
    marginBottom: 24,
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
    marginBottom: 12,
    marginTop: 12,
  },
  paragraph: {
    color: '#666666',
    lineHeight: 22,
  },
  emailText: {
    fontWeight: 'bold',
    color: '#6A1B9A',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
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
  iconBulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingRight: 16,
  },
  specificIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F3E5F5', 
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#6A1B9A',
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    color: '#333333',
    lineHeight: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#a5a2a2',
    fontStyle: 'italic',
    fontSize: 12,
    marginTop: 8,
  }
});