import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';

export default function Employees() {
  const router = useRouter();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  const [employees, setEmployees] = useState([
    {
      id: 1,
      swachhEmployeeId: 'SW001',
      name: 'John Doe',
      role: 'Supervisor',
      aadharNumber: '1234-5678-9012',
      phone: '9876543210',
      zone: 'Zone A',
      ward: 'Ward 1',
      feederPoint: 'FP-001',
      supervisor: null,
      status: 'Active'
    },
    {
      id: 2,
      swachhEmployeeId: 'SW002',
      name: 'Jane Smith',
      role: 'Swachh Worker',
      aadharNumber: '2345-6789-0123',
      phone: '9876543211',
      zone: 'Zone A',
      ward: 'Ward 2',
      feederPoint: 'FP-002',
      supervisor: 'John Doe',
      status: 'Active'
    }
  ]);

  const [formData, setFormData] = useState({
    swachhEmployeeId: '',
    name: '',
    role: 'Swachh Worker',
    aadharNumber: '',
    phone: '',
    zone: '',
    ward: '',
    feederPoint: '',
    supervisor: '',
    status: 'Active'
  });

  const supervisors = employees.filter(emp => emp.role === 'Supervisor');

  const filteredEmployees = employees.filter(employee => {
    return employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           employee.swachhEmployeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
           employee.role.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setFormData({
      swachhEmployeeId: `SW${String(employees.length + 1).padStart(3, '0')}`,
      name: '',
      role: 'Swachh Worker',
      aadharNumber: '',
      phone: '',
      zone: '',
      ward: '',
      feederPoint: '',
      supervisor: '',
      status: 'Active'
    });
    setModalVisible(true);
  };

  const handleEditEmployee = (employee) => {
    Alert.alert(
      "Edit Employee",
      "Are you sure you want to edit this employee's information?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Edit", onPress: () => {
          setEditingEmployee(employee);
          setFormData(employee);
          setModalVisible(true);
          setSelectedEmployee(null);
        }}
      ]
    );
  };

  const handleSaveEmployee = () => {
    if (!formData.name || !formData.aadharNumber || !formData.phone || !formData.zone || !formData.ward || !formData.feederPoint) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    if (formData.role === 'Swachh Worker' && !formData.supervisor) {
      Alert.alert("Error", "Please assign a supervisor for Swachh Worker");
      return;
    }

    if (editingEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id ? { ...formData, id: editingEmployee.id } : emp
      ));
      Alert.alert("Success", "Employee updated successfully!");
    } else {
      const newEmployee = { ...formData, id: Date.now() };
      setEmployees([...employees, newEmployee]);
      Alert.alert("Success", "Employee added successfully!");
    }
    setModalVisible(false);
  };

  const handleDeleteEmployee = (employeeId) => {
    Alert.alert(
      "Delete Employee",
      "Are you sure you want to delete this employee? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {
          setEmployees(employees.filter(emp => emp.id !== employeeId));
          Alert.alert("Success", "Employee deleted successfully!");
          setSelectedEmployee(null);
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={[]}>
      <View style={{ backgroundColor: '#1E3A8A' }}>
        <SafeAreaView edges={['top']}>
          <LinearGradient
            colors={['#1E3A8A', '#3B82F6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}
          >
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Employee Management</Text>
            </View>
            <TouchableOpacity onPress={handleAddEmployee} style={styles.addButton}>
              <Icon name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
        </SafeAreaView>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBox, { backgroundColor: colors.cardBackground }]}>
          <Icon name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search employees..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        {filteredEmployees.map((employee) => (
          <TouchableOpacity 
            key={employee.id} 
            style={[styles.employeeCard, { backgroundColor: colors.cardBackground }]}
            onPress={() => setSelectedEmployee(selectedEmployee === employee.id ? null : employee.id)}
          >
            <View style={styles.employeeInfo}>
              <Text style={[styles.employeeName, { color: colors.text }]}>{employee.name}</Text>
              <Text style={[styles.employeeId, { color: colors.textSecondary }]}>
                ID: {employee.swachhEmployeeId}
              </Text>
              <Text style={[styles.employeeDetails, { color: colors.textSecondary }]}>
                {employee.role} • {employee.zone} • {employee.ward}
              </Text>
              <Text style={[styles.employeeDetails, { color: colors.textSecondary }]}>
                📞 {employee.phone}
              </Text>
              <Text style={[styles.employeeDetails, { color: colors.textSecondary }]}>
                📍 Feeder Point: {employee.feederPoint}
              </Text>
            </View>
            
            {selectedEmployee === employee.id && (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  onPress={() => handleEditEmployee(employee)}
                  style={[styles.actionButton, { backgroundColor: '#4facfe' }]}
                >
                  <Icon name="pencil" size={16} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteEmployee(employee.id)}
                  style={[styles.actionButton, { backgroundColor: '#ff6b6b' }]}
                >
                  <Icon name="trash" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
                placeholder="Employee ID"
                placeholderTextColor={colors.textSecondary}
                value={formData.swachhEmployeeId}
                onChangeText={(text) => setFormData({...formData, swachhEmployeeId: text})}
                editable={!editingEmployee}
              />

              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
                placeholder="Employee Name"
                placeholderTextColor={colors.textSecondary}
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
              />

              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
                placeholder="Aadhar Number"
                placeholderTextColor={colors.textSecondary}
                value={formData.aadharNumber}
                onChangeText={(text) => setFormData({...formData, aadharNumber: text})}
              />

              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
                placeholder="Phone Number"
                placeholderTextColor={colors.textSecondary}
                value={formData.phone}
                onChangeText={(text) => setFormData({...formData, phone: text})}
                keyboardType="phone-pad"
              />

              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
                placeholder="Zone (e.g., Zone A)"
                placeholderTextColor={colors.textSecondary}
                value={formData.zone}
                onChangeText={(text) => setFormData({...formData, zone: text})}
              />

              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
                placeholder="Ward (e.g., Ward 1)"
                placeholderTextColor={colors.textSecondary}
                value={formData.ward}
                onChangeText={(text) => setFormData({...formData, ward: text})}
              />

              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
                placeholder="Feeder Point (e.g., FP-001)"
                placeholderTextColor={colors.textSecondary}
                value={formData.feederPoint}
                onChangeText={(text) => setFormData({...formData, feederPoint: text})}
              />

              {formData.role === 'Swachh Worker' && supervisors.length > 0 && (
                <View style={styles.supervisorSection}>
                  <Text style={[styles.sectionLabel, { color: colors.text }]}>Assign Supervisor:</Text>
                  {supervisors.map((supervisor) => (
                    <TouchableOpacity
                      key={supervisor.id}
                      onPress={() => setFormData({...formData, supervisor: supervisor.name})}
                      style={[
                        styles.supervisorOption,
                        { 
                          backgroundColor: formData.supervisor === supervisor.name ? '#1E3A8A' : colors.background,
                          borderColor: formData.supervisor === supervisor.name ? '#1E3A8A' : colors.textSecondary
                        }
                      ]}
                    >
                      <Text style={[
                        styles.supervisorText,
                        { color: formData.supervisor === supervisor.name ? '#fff' : colors.text }
                      ]}>
                        {supervisor.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={[styles.modalButton, { backgroundColor: '#6c757d' }]}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSaveEmployee}
                  style={[styles.modalButton, { backgroundColor: '#43e97b' }]}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  addButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  searchContainer: {
    padding: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 10,
    borderWidth: 2,
    borderColor: '#277e2cff',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  employeeCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  employeeId: {
    fontSize: 12,
    marginBottom: 4,
  },
  employeeDetails: {
    fontSize: 14,
    marginBottom: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    borderRadius: 16,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  supervisorSection: {
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  supervisorOption: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  supervisorText: {
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
