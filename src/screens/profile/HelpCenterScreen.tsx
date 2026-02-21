import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Text, Divider, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HelpCenterScreen() {
  
  const handleEmail = () => Linking.openURL('mailto:fucsolinc@gmail.com');
  const handleWhatsApp = () => Linking.openURL('https://wa.me/573155800218');

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.introCard}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="help" size={28} color="#FFFFFF" />
          </View>
          <Text variant="titleLarge" style={styles.introTitle}>¿Cómo podemos ayudarte?</Text>
          <Text style={styles.introText}>
            Encuentra respuestas a las preguntas más frecuentes y contacta con nuestro equipo de soporte.
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Preguntas Frecuentes</Text>

          <View style={styles.faqItem}>
            <Text style={styles.question}>¿Cómo realizo un pedido?</Text>
            <Text style={styles.answer}>Explora nuestro catálogo, agrega los productos naturales que desees al carrito y procede al pago desde la sección "Carrito".</Text>
          </View>
          <Divider style={styles.divider} />

          <View style={styles.faqItem}>
            <Text style={styles.question}>¿Cuánto tardan los envíos?</Text>
            <Text style={styles.answer}>Los despachos dentro del casco urbano de Pasto, Nariño, se entregan generalmente el mismo día o al día siguiente hábil.</Text>
          </View>
          <Divider style={styles.divider} />

          <View style={styles.faqItem}>
            <Text style={styles.question}>¿Qué métodos de pago aceptan?</Text>
            <Text style={styles.answer}>Actualmente aceptamos transferencias a través de Nequi, Daviplata y pago en efectivo contra entrega.</Text>
          </View>
          <Divider style={styles.divider} />

          <View style={styles.faqItem}>
            <Text style={styles.question}>¿Puedo cancelar o modificar mi pedido?</Text>
            <Text style={styles.answer}>Sí, siempre y cuando el estado del pedido no haya cambiado a "En Camino". Puedes hacerlo desde la pestaña "Pedidos".</Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Solución de Problemas</Text>

          <View style={styles.troubleItem}>
            <MaterialCommunityIcons name="refresh-circle" size={24} color="#a5a2a2" style={styles.troubleIcon} />
            <View style={styles.troubleTextContainer}>
              <Text style={styles.troubleTitle}>La aplicación no carga</Text>
              <Text style={styles.troubleDesc}>Verifica tu conexión a internet y reinicia la aplicación.</Text>
            </View>
          </View>
          <Divider style={styles.divider} />

          <View style={styles.troubleItem}>
            <MaterialCommunityIcons name="cart-off" size={24} color="#a5a2a2" style={styles.troubleIcon} />
            <View style={styles.troubleTextContainer}>
              <Text style={styles.troubleTitle}>No puedo agregar al carrito</Text>
              <Text style={styles.troubleDesc}>Asegúrate de haber iniciado sesión y de que el producto cuente con stock disponible.</Text>
            </View>
          </View>
          <Divider style={styles.divider} />

          <View style={styles.troubleItem}>
            <MaterialCommunityIcons name="login-variant" size={24} color="#a5a2a2" style={styles.troubleIcon} />
            <View style={styles.troubleTextContainer}>
              <Text style={styles.troubleTitle}>Problemas para iniciar sesión</Text>
              <Text style={styles.troubleDesc}>Verifica tu email y contraseña. Si olvidaste tu contraseña, usa la opción "Recuperar contraseña".</Text>
            </View>
          </View>
        </View>

        <View style={styles.contactContainer}>
          <Text variant="titleMedium" style={styles.contactTitle}>¿No encuentras lo que buscas?</Text>
          <Text style={styles.contactSubtitle}>Contáctanos directamente</Text>

          <Button 
            mode="contained" 
            icon="email-outline" 
            onPress={handleEmail}
            style={styles.contactButton}
            buttonColor="#6A1B9A"
          >
            Enviar Email
          </Button>

          <Button 
            mode="contained" 
            icon="whatsapp" 
            onPress={handleWhatsApp}
            style={styles.contactButton}
            buttonColor="#25D366"
          >
            WhatsApp
          </Button>

          <View style={styles.infoFooter}>
            <Text style={styles.infoText}><Text style={styles.infoBold}>Horario de atención:</Text> Lunes a Sábado 8:00 AM - 6:00 PM</Text>
            <Text style={styles.infoText}><Text style={styles.infoBold}>Email:</Text> fucsolinc@gmail.com</Text>
            <Text style={styles.infoText}><Text style={styles.infoBold}>Tiempo de respuesta:</Text> Máximo 24 horas</Text>
          </View>
        </View>

        <View style={styles.suggestionBanner}>
          <MaterialCommunityIcons name="bullhorn-outline" size={24} color="#FF8A00" style={styles.suggestionIcon} />
          <Text style={styles.suggestionText}>
            ¿Tienes sugerencias para mejorar la aplicación? ¡Nos encantaría escucharte!
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
    marginBottom: 24,
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
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 1,
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  divider: {
    backgroundColor: '#F0F0F0',
    marginVertical: 16,
  },
  faqItem: {
    marginBottom: 4,
  },
  question: {
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 15,
    marginBottom: 6,
  },
  answer: {
    color: '#666666',
    lineHeight: 22,
  },
  troubleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  troubleIcon: {
    marginRight: 16,
    marginTop: 2,
  },
  troubleTextContainer: {
    flex: 1,
  },
  troubleTitle: {
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  troubleDesc: {
    color: '#666666',
    fontSize: 13,
    lineHeight: 18,
  },
  contactContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  contactTitle: {
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  contactSubtitle: {
    color: '#666666',
    marginBottom: 20,
  },
  contactButton: {
    width: '100%',
    borderRadius: 8,
    marginBottom: 12,
    paddingVertical: 4,
  },
  infoFooter: {
    width: '100%',
    marginTop: 16,
  },
  infoText: {
    color: '#666666',
    fontSize: 13,
    marginBottom: 6,
  },
  infoBold: {
    fontWeight: 'bold',
    color: '#333333',
  },
  suggestionBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  suggestionIcon: {
    marginRight: 16,
  },
  suggestionText: {
    flex: 1,
    color: '#666666',
    fontSize: 13,
    lineHeight: 18,
  }
});