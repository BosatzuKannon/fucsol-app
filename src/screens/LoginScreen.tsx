import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';

type AuthStackParamList = { Login: undefined; Register: undefined; };
type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const login = useAuthStore((state) => state.login);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showToast('Por favor llena todos los campos');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await login(email, password);
      
      if (!result.success) {
        showToast(result.error || 'Error al iniciar sesión');
      }
    } catch (error) {
       showToast('Ocurrió un error inesperado');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Image source={require('../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
            </View>
          </View>

          <View style={styles.headerTextContainer}>
            <Text variant="headlineMedium" style={styles.title}>Fucsol</Text>
            <Text style={styles.slogan}>Más natural ¡Imposible!</Text>
            <Text variant="bodyLarge" style={styles.subtitle}>Bienvenido de nuevo</Text>
          </View>

          <TextInput
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            disabled={isLoading}
            style={styles.input}
            outlineColor="#E0E0E0"
            activeOutlineColor="#6A1B9A"
            theme={{ roundness: 12 }}
            left={<TextInput.Icon icon="email-outline" color="#a5a2a2" />} 
          />

          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry={!showPassword}
            disabled={isLoading}
            style={styles.input}
            outlineColor="#E0E0E0"
            activeOutlineColor="#6A1B9A"
            theme={{ roundness: 12 }}
            left={<TextInput.Icon icon="lock-outline" color="#a5a2a2" />}
            right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} color="#a5a2a2" onPress={() => setShowPassword(!showPassword)} disabled={isLoading} />}
          />

          <TouchableOpacity style={styles.forgotPassword} disabled={isLoading}>
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={isLoading} 
            disabled={isLoading} 
            style={styles.button}
            buttonColor="#FF8A00"
            textColor="white"
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            INICIAR SESIÓN
          </Button>

          <View style={styles.registerContainer}>
            <Text variant="bodyMedium" style={styles.registerHintText}>¿No tienes cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')} disabled={isLoading}>
              <Text variant="bodyMedium" style={styles.registerText}>Regístrate</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
        duration={4000}
        style={styles.snackbar} 
        wrapperStyle={styles.snackbarWrapper} 
        action={{ label: 'OK', textColor: '#FFFFFF', onPress: () => setToastVisible(false) }}
      >
        <Text style={styles.snackbarText}>{toastMessage}</Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 24, justifyContent: 'center', paddingBottom: 40 },
  logoContainer: { alignItems: 'center', marginBottom: 24 },
  logoCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center', marginBottom: 0, borderWidth: 1.5, borderColor: '#6A1B9A' },
  logoImage: { width: 60, height: 60 },
  headerTextContainer: { marginBottom: 32, alignItems: 'center' },
  title: { fontWeight: 'bold', color: '#1A1A1A', marginBottom: 0 },
  slogan: { fontSize: 15, color: '#6A1B9A', fontWeight: 'bold', marginTop: 0 },
  subtitle: { color: '#666666', fontWeight: '500', marginTop: 30 },
  input: { marginBottom: 16, backgroundColor: '#FFFFFF' },
  forgotPassword: { alignItems: 'flex-end', marginBottom: 32 },
  forgotPasswordText: { color: '#6A1B9A', fontWeight: '600' },
  button: { borderRadius: 25, marginBottom: 32, elevation: 2 },
  buttonContent: { paddingVertical: 10 },
  buttonLabel: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  registerContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  registerHintText: { color: '#666666' },
  registerText: { color: '#6A1B9A', fontWeight: 'bold' },

  snackbarWrapper: {
    marginBottom: 20, 
  },
  snackbar: {
    backgroundColor: '#D32F2F',
    borderRadius: 12, 
    elevation: 4,
  },
  snackbarText: {
    color: '#FFFFFF',
    fontWeight: '500',
  }
});