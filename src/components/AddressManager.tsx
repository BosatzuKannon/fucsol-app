import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import LocationSelector from './LocationSelector';
import { useAuthStore, Address } from '../store/authStore';

interface AddressManagerProps {
  isCheckout?: boolean;
  onContinue?: (selectedAddressId: string) => void;
}

export default function AddressManager({ isCheckout = false, onContinue }: AddressManagerProps) {

  const { user, addAddress, removeAddress, setDefaultAddress } = useAuthStore();
  const [city, setCity] = useState('');
  const [department, setDepartment] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);


  useEffect(() => {
    if (user?.addresses) {
      const defaultAddr = user.addresses.find(a => a.is_default);
      if (defaultAddr) setSelectedId(defaultAddr.id);
    }
  }, [user?.addresses]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('#D32F2F');

  const [title, setTitle] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [reference, setReference] = useState('');

  const showToast = (message: string, type: 'success' | 'error' = 'error') => {
    setToastMessage(message);
    setToastColor(type === 'success' ? '#4CAF50' : '#D32F2F');
    setToastVisible(true);
  };

  const resetForm = () => {
    setTitle('');
    setAddressLine('');
    setReference('');
    setCity('');
    setDepartment('');
    setModalVisible(false);
  };

  const getIconName = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('casa')) return 'home';
    if (t.includes('trabajo') || t.includes('oficina')) return 'briefcase';
    if (t.includes('novia') || t.includes('pareja')) return 'heart';
    return 'map-marker';
  };

  const handleSelectAddress = async (id: string) => {
    setSelectedId(id);

    if (!isCheckout) {
      const res = await setDefaultAddress(id);
      if (res.success) {
        showToast('Dirección principal actualizada', 'success');
      } else {
        showToast(res.error || 'Error al actualizar dirección', 'error');
      }
    }
  };

  const handleSaveAddress = async () => {
    if (!title || !addressLine || !city) {
      showToast('Por favor completa el nombre, la dirección y la ciudad.');
      return;
    }

    setIsLoading(true);
    const isFirst = !user?.addresses || user.addresses.length === 0;
    
    const res = await addAddress({
      title,
      address_line: addressLine,
      reference,
      city, 
      is_default: isFirst, 
    });

    setIsLoading(false);

    if (res.success) {
      showToast('Dirección agregada correctamente', 'success');
      resetForm(); 
    } else {
      showToast(res.error || 'Error al guardar la dirección');
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Eliminar', '¿Estás seguro de eliminar esta dirección?', [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: 'Eliminar', 
        style: 'destructive',
        onPress: async () => {
          const res = await removeAddress(id);
          if (res && res.success) {
            showToast('Dirección eliminada correctamente', 'success');
          } else if (res && !res.success) {
            showToast(res.error || 'Error al eliminar');
          }
        } 
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>MIS DIRECCIONES GUARDADAS</Text>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.listContainer}>
        {user?.addresses?.map((item: Address) => {
          const isSelected = selectedId === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => handleSelectAddress(item.id)}
              activeOpacity={0.8}
            >
              <View style={styles.radioContainer}>
                <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </View>

              <View style={styles.infoContainer}>
                <View style={styles.titleRow}>
                  <MaterialCommunityIcons 
                    name={getIconName(item.title) as any} 
                    size={20} 
                    color={isSelected ? '#6A1B9A' : '#757575'} 
                  />
                  <Text style={styles.addressTitle}>
                    {item.title} {item.is_default && !isCheckout ? '(Principal)' : ''}
                  </Text>
                </View>
                <Text style={styles.addressText}>{item.address_line}</Text>
                {item.reference ? <Text style={styles.referenceText}>{item.reference}</Text> : null}
                <Text style={styles.cityText}>{item.city}, {item.department}</Text>
              </View>

              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.editButton}>
                <MaterialCommunityIcons name="trash-can-outline" size={22} color="#D32F2F" />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="plus-circle" size={20} color="#6A1B9A" />
          <Text style={styles.addButtonText}>AGREGAR NUEVA DIRECCIÓN</Text>
        </TouchableOpacity>

        {isCheckout && (
          <View style={styles.mapPlaceholder}>
            <MaterialCommunityIcons name="map-marker-radius" size={32} color="#6A1B9A" />
            <Text style={styles.mapText}>VISTA DE MAPA</Text>
          </View>
        )}
      </ScrollView>

      {isCheckout && (
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={() => onContinue && selectedId && onContinue(selectedId)}
          disabled={!selectedId}
        >
          <Text style={styles.checkoutButtonText}>CONTINUAR AL PAGO</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#FFF" />
        </TouchableOpacity>
      )}

      <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={resetForm}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Nueva Dirección</Text>

            <Text style={styles.inputLabel}>Nombre de la ubicación</Text>
            <TextInput style={styles.input} placeholder="Ej: Casa, Oficina..." value={title} onChangeText={setTitle} />

            <Text style={styles.inputLabel}>Dirección completa</Text>
            <TextInput style={styles.input} placeholder="Calle y número" value={addressLine} onChangeText={setAddressLine} />

            <Text style={styles.inputLabel}>Ciudad</Text>
            <LocationSelector 
              department={department}
              city={city}
              onDepartmentChange={setDepartment}
              onCityChange={setCity}
            />

            <Text style={styles.inputLabel}>Indicaciones adicionales</Text>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="Piso, departamento, referencias..." 
              value={reference} 
              onChangeText={setReference}
              multiline
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.saveButtonText}>GUARDAR</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={resetForm} disabled={isLoading}>
              <Text style={styles.cancelButtonText}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Snackbar
          visible={toastVisible && isModalVisible}
          onDismiss={() => setToastVisible(false)}
          duration={3000}
          style={[styles.snackbar, { backgroundColor: toastColor }]} 
          wrapperStyle={styles.snackbarWrapper} 
          action={{ label: 'OK', textColor: '#FFFFFF', onPress: () => setToastVisible(false) }}
        >
          <Text style={styles.snackbarText}>{toastMessage}</Text>
        </Snackbar>
      </Modal>

      <Snackbar
        visible={toastVisible && !isModalVisible}
        onDismiss={() => setToastVisible(false)}
        duration={3000}
        style={[styles.snackbar, { backgroundColor: toastColor }]} 
        wrapperStyle={styles.snackbarWrapper} 
        action={{ label: 'OK', textColor: '#FFFFFF', onPress: () => setToastVisible(false) }}
      >
        <Text style={styles.snackbarText}>{toastMessage}</Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#9E9E9E', marginTop: 20, marginBottom: 15, paddingHorizontal: 20 },
  listContainer: { paddingHorizontal: 20 },
  card: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 16, padding: 15, marginBottom: 15, borderWidth: 1.5, borderColor: '#EEEEEE', alignItems: 'center' },
  cardSelected: { borderColor: '#6A1B9A', backgroundColor: '#FDFBFF' },
  radioContainer: { marginRight: 15 },
  radioOuter: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#BDBDBD', justifyContent: 'center', alignItems: 'center' },
  radioOuterSelected: { borderColor: '#6A1B9A' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#6A1B9A' },
  infoContainer: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  addressTitle: { fontSize: 16, fontWeight: 'bold', color: '#212121', marginLeft: 8 },
  addressText: { fontSize: 14, color: '#616161', lineHeight: 20 },
  referenceText: { fontSize: 13, color: '#9E9E9E', marginTop: 2 },
  cityText: { fontSize: 13, color: '#9E9E9E', marginTop: 2 },
  editButton: { padding: 5 },
  addButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 15, marginBottom: 20 },
  addButtonText: { color: '#6A1B9A', fontWeight: 'bold', marginLeft: 8, fontSize: 14 },
  mapPlaceholder: { backgroundColor: '#E0D4EB', borderRadius: 16, height: 120, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  mapText: { color: '#6A1B9A', fontWeight: 'bold', marginTop: 8, fontSize: 12 },
  checkoutButton: { backgroundColor: '#FF8C00', flexDirection: 'row', margin: 20, padding: 18, borderRadius: 12, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  checkoutButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginRight: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 25, paddingBottom: 40 },
  modalHandle: { width: 40, height: 4, backgroundColor: '#E0E0E0', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#212121', marginBottom: 20 },
  inputLabel: { fontSize: 13, fontWeight: 'bold', color: '#616161', marginBottom: 8, marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, padding: 15, fontSize: 15, color: '#212121' },
  textArea: { height: 80, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#FF8C00', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 30 },
  saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  cancelButton: { padding: 15, alignItems: 'center', marginTop: 10 },
  cancelButtonText: { color: '#757575', fontWeight: 'bold', fontSize: 14 },
  snackbarWrapper: { marginBottom: 20 },
  snackbar: { borderRadius: 12, elevation: 4 },
  snackbarText: { color: '#FFFFFF', fontWeight: '500' }
});