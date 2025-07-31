import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';

export default function AssignVehicles() {
  const router = useRouter();
  const { colors } = useTheme();
  const [assignments, setAssignments] = useState({});

  // Sample data
  const workers = [
    { id: 1, name: "Ram Kumar", shift: "Morning" },
    { id: 2, name: "Shyam Singh", shift: "Evening" },
    { id: 3, name: "Gita Devi", shift: "Morning" },
    { id: 4, name: "Mohan Lal", shift: "Evening" },
  ];

  const vehicles = [
    { id: 1, number: "DL-01-AB-1234", type: "Garbage Truck", capacity: "5 tons" },
    { id: 2, number: "DL-01-CD-5678", type: "Compactor", capacity: "8 tons" },
    { id: 3, number: "DL-01-EF-9012", type: "Garbage Truck", capacity: "5 tons" },
    { id: 4, number: "DL-01-GH-3456", type: "Mini Truck", capacity: "3 tons" },
  ];

  const handleAssign = (workerId, vehicleId) => {
    setAssignments(prev => ({
      ...prev,
      [vehicleId]: workerId
    }));
  };

  const saveAssignments = () => {
    Alert.alert("Success", "Vehicle assignments saved successfully!");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={[]}>
      <View style={{ backgroundColor: '#667eea' }}>
        <SafeAreaView edges={['top']}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}
          >
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Assign Vehicles</Text>
            </View>
          </LinearGradient>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.content}>
        {vehicles.map((vehicle) => (
          <View key={vehicle.id} style={[styles.card, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.vehicleNumber, { color: colors.text }]}>{vehicle.number}</Text>
              <Text style={[styles.vehicleType, { color: colors.textSecondary }]}>{vehicle.type}</Text>
              <Text style={[styles.vehicleCapacity, { color: colors.textSecondary }]}>{vehicle.capacity}</Text>
            </View>
            
            <Text style={[styles.assignLabel, { color: colors.text }]}>Assign to Worker:</Text>
            
            {workers.map((worker) => (
              <TouchableOpacity
                key={worker.id}
                style={[
                  styles.workerOption,
                  assignments[vehicle.id] === worker.id && styles.selectedOption
                ]}
                onPress={() => handleAssign(worker.id, vehicle.id)}
              >
                <Text style={[
                  styles.workerName,
                  assignments[vehicle.id] === worker.id ? styles.selectedText : { color: colors.text }
                ]}>
                  {worker.name} ({worker.shift} Shift)
                </Text>
                {assignments[vehicle.id] === worker.id && (
                  <Icon name="checkmark-circle" size={20} color="#fff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
        
        <TouchableOpacity style={styles.saveButton} onPress={saveAssignments}>
          <LinearGradient
            colors={['#1B5E20', '#2E7D32']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveGradient}
          >
            <Text style={styles.saveText}>Save Assignments</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: { flex: 1, padding: 20 },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: { marginBottom: 12 },
  vehicleNumber: { fontSize: 18, fontWeight: 'bold' },
  vehicleType: { fontSize: 14, marginTop: 2 },
  vehicleCapacity: { fontSize: 12, marginTop: 2 },
  assignLabel: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  workerOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  workerName: { fontSize: 14 },
  selectedText: { color: '#fff', fontWeight: '600' },
  saveButton: { marginTop: 20, marginBottom: 40 },
  saveGradient: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
