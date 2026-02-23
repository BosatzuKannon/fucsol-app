import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colombiaData, departmentsList } from '../data/colombia';

interface LocationSelectorProps {
  department: string;
  city: string;
  onDepartmentChange: (dep: string) => void;
  onCityChange: (city: string) => void;
}

export default function LocationSelector({ department, city, onDepartmentChange, onCityChange }: LocationSelectorProps) {
  const [showDepartments, setShowDepartments] = useState(false);
  const [showCities, setShowCities] = useState(false);

  const handleSelectDepartment = (dep: string) => {
    onDepartmentChange(dep);
    onCityChange(''); // Reseteamos la ciudad al cambiar el departamento
    setShowDepartments(false);
  };

  const handleSelectCity = (c: string) => {
    onCityChange(c);
    setShowCities(false);
  };

  const citiesList = department ? colombiaData[department].sort() : [];

  return (
    <View style={styles.container}>
      {/* Selector de Departamento */}
      <Text style={styles.inputLabel}>Departamento</Text>
      <TouchableOpacity 
        style={styles.dropdownButton} 
        onPress={() => { setShowDepartments(!showDepartments); setShowCities(false); }}
        activeOpacity={0.8}
      >
        <Text style={department ? styles.selectedText : styles.placeholderText}>
          {department || 'Selecciona un departamento'}
        </Text>
        <MaterialCommunityIcons name={showDepartments ? "chevron-up" : "chevron-down"} size={24} color="#757575" />
      </TouchableOpacity>

      {showDepartments && (
        <View style={styles.dropdownList}>
          <ScrollView nestedScrollEnabled style={styles.scrollList}>
            {departmentsList.map((dep) => (
              <TouchableOpacity key={dep} style={styles.optionItem} onPress={() => handleSelectDepartment(dep)}>
                <Text style={styles.optionText}>{dep}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Selector de Ciudad */}
      <Text style={styles.inputLabel}>Ciudad</Text>
      <TouchableOpacity 
        style={[styles.dropdownButton, !department && styles.dropdownDisabled]} 
        onPress={() => { if (department) { setShowCities(!showCities); setShowDepartments(false); } }}
        activeOpacity={0.8}
        disabled={!department}
      >
        <Text style={city ? styles.selectedText : styles.placeholderText}>
          {city || (department ? 'Selecciona una ciudad' : 'Primero selecciona un departamento')}
        </Text>
        <MaterialCommunityIcons name={showCities ? "chevron-up" : "chevron-down"} size={24} color={department ? "#757575" : "#E0E0E0"} />
      </TouchableOpacity>

      {showCities && department && (
        <View style={styles.dropdownList}>
          <ScrollView nestedScrollEnabled style={styles.scrollList}>
            {citiesList.map((c) => (
              <TouchableOpacity key={c} style={styles.optionItem} onPress={() => handleSelectCity(c)}>
                <Text style={styles.optionText}>{c}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  inputLabel: { fontSize: 13, fontWeight: 'bold', color: '#616161', marginBottom: 8, marginTop: 15 },
  dropdownButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, padding: 15, backgroundColor: '#FFF' },
  dropdownDisabled: { backgroundColor: '#F5F5F5' },
  placeholderText: { fontSize: 15, color: '#9E9E9E' },
  selectedText: { fontSize: 15, color: '#212121' },
  dropdownList: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, marginTop: 5, backgroundColor: '#FFF', maxHeight: 150, elevation: 2 },
  scrollList: { padding: 5 },
  optionItem: { paddingVertical: 12, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  optionText: { fontSize: 15, color: '#212121' },
});