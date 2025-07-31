// import * as ImagePicker from 'expo-image-picker';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useRouter } from 'expo-router';
// import { useState } from 'react';
// import {
//   Alert,
//   Image,
//   Modal,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useTheme } from '../contexts/ThemeContext';

// export default function ManageWorkers() {
//   const router = useRouter();
//   const { colors } = useTheme();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
  
//   const [employees, setEmployees] = useState([
//     { 
//       id: 1, 
//       name: "Ram Kumar", 
//       mobile: "9876543210", 
//       empCode: "EMP001",
//       aadharNo: "1234-5678-9012",
//       role: "Vehicle Driver",
//       relieverFor: null,
//       photo: null,
//       status: "Active"
//     },
//     { 
//       id: 2, 
//       name: "Shyam Singh", 
//       mobile: "9876543211", 
//       empCode: "EMP002",
//       aadharNo: "2345-6789-0123",
//       role: "Swachh Worker",
//       relieverFor: null,
//       photo: null,
//       status: "Active"
//     },
//   ]);

//   const [formData, setFormData] = useState({
//     name: '',
//     mobile: '',
//     empCode: '',
//     aadharNo: '',
//     role: 'Swachh Worker',
//     relieverFor: null,
//     photo: null,
//     status: 'Active'
//   });

//   const [showRoleDropdown, setShowRoleDropdown] = useState(false);
//   const [showRelieverDropdown, setShowRelieverDropdown] = useState(false);
//   const [showStatusDropdown, setShowStatusDropdown] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState(null);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   const roles = ['Vehicle Driver', 'Swachh Worker', 'Helper', 'Reliever'];
//   const statusOptions = ['Active', 'Inactive'];
  
//   // Get workers for reliever dropdown (exclude current editing employee)
//   const availableWorkers = employees.filter(emp => emp.role !== 'Reliever');

//   const filteredEmployees = employees.filter(emp =>
//     emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     emp.empCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     emp.mobile.includes(searchQuery)
//   );

//   const handleAddEmployee = () => {
//     setEditingEmployee(null);
//     setFormData({
//       name: '',
//       mobile: '',
//       empCode: `EMP${String(employees.length + 1).padStart(3, '0')}`,
//       aadharNo: '',
//       role: 'Swachh Worker',
//       relieverFor: null,
//       photo: null,
//       status: 'Active'
//     });
//     setModalVisible(true);
//   };

//   const handleEditEmployee = (employee) => {
//     Alert.alert(
//       "Edit Employee",
//       "Do you really want to edit this employee's information?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Edit", onPress: () => {
//           setEditingEmployee(employee);
//           setFormData(employee);
//           setModalVisible(true);
//           setSelectedEmployee(null);
//         }}
//       ]
//     );
//   };

//   const handleImagePicker = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission needed', 'Please grant camera roll permissions');
//       return;
//     }

//     Alert.alert(
//       "Select Image",
//       "Choose an option",
//       [
//         { text: "Camera", onPress: openCamera },
//         { text: "Gallery", onPress: openGallery },
//         { text: "Cancel", style: "cancel" }
//       ]
//     );
//   };

//   const openCamera = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission needed', 'Please grant camera permissions');
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.8,
//     });

//     if (!result.canceled) {
//       setFormData({...formData, photo: result.assets[0].uri});
//     }
//   };

//   const openGallery = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.8,
//     });

//     if (!result.canceled) {
//       setFormData({...formData, photo: result.assets[0].uri});
//     }
//   };

//   const handleSubmit = () => {
//     if (!formData.name || !formData.mobile || !formData.empCode || !formData.aadharNo) {
//       Alert.alert("Error", "Please fill all required fields");
//       return;
//     }

//     if (editingEmployee) {
//       setEmployees(employees.map(emp => 
//         emp.id === editingEmployee.id ? { ...formData, id: editingEmployee.id } : emp
//       ));
//       Alert.alert("Success", "Employee updated successfully!");
//     } else {
//       const newEmployee = { ...formData, id: Date.now() };
//       setEmployees([...employees, newEmployee]);
//       Alert.alert("Success", "Employee added successfully!");
//     }
//     setModalVisible(false);
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={[]}>
//       {/* Header */}
//       <View style={{ backgroundColor: '#1E3A8A' }}>
//         <SafeAreaView edges={['top']}>
//           <LinearGradient
//             colors={['#1E3A8A', '#3B82F6']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.header}
//           >
//             <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
//               <Icon name="arrow-back" size={24} color="#fff" />
//             </TouchableOpacity>
//             <View style={styles.headerContent}>
//               <Text style={styles.headerTitle}>Manage Workers</Text>
//             </View>
//             <TouchableOpacity onPress={handleAddEmployee} style={styles.addButton}>
//               <Icon name="add" size={24} color="#fff" />
//             </TouchableOpacity>
//           </LinearGradient>
//         </SafeAreaView>
//       </View>

//       {/* Search Bar */}
//       <View style={[styles.searchContainer, { backgroundColor: colors.cardBackground }]}>
//         <Icon name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
//         <TextInput
//           style={[styles.searchInput, { color: colors.text }]}
//           placeholder="Search employees..."
//           placeholderTextColor={colors.textSecondary}
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//       </View>

//       {/* Employee List with Images and Role */}
//       <ScrollView style={styles.content}>
//         {filteredEmployees.map((employee) => (
//           <TouchableOpacity 
//             key={employee.id} 
//             style={[styles.employeeCard, { backgroundColor: colors.cardBackground }]}
//             onPress={() => setSelectedEmployee(selectedEmployee === employee.id ? null : employee.id)}
//           >
//             {/* Employee Photo */}
//             <View style={styles.employeePhotoContainer}>
//               {employee.photo ? (
//                 <Image source={{ uri: employee.photo }} style={styles.employeePhoto} />
//               ) : (
//                 <View style={[styles.employeePhotoPlaceholder, { backgroundColor: colors.background }]}>
//                   <Icon name="person" size={30} color={colors.textSecondary} />
//                 </View>
//               )}
//             </View>
            
//             <View style={styles.employeeInfo}>
//               <Text style={[styles.employeeName, { color: colors.text }]}>{employee.name}</Text>
//               <Text style={[styles.employeeRole, { color: '#1E3A8A' }]}>{employee.role}</Text>
//               <Text style={[styles.employeeDetails, { color: colors.textSecondary }]}>
//                 Mobile: {employee.mobile}
//               </Text>
//               <Text style={[styles.employeeDetails, { color: colors.textSecondary }]}>
//                 ID: {employee.empCode}
//               </Text>
//               {employee.relieverFor && (
//                 <Text style={[styles.employeeDetails, { color: '#FF6B35' }]}>
//                   Reliever for: {employee.relieverFor}
//                 </Text>
//               )}
//               <View style={[styles.statusBadge, { backgroundColor: employee.status === 'Active' ? '#4CAF50' : '#FF5722' }]}>
//                 <Text style={styles.statusText}>{employee.status}</Text>
//               </View>
//             </View>
            
//             {selectedEmployee === employee.id && (
//               <View style={styles.actionButtons}>
//                 <TouchableOpacity
//                   onPress={() => handleEditEmployee(employee)}
//                   style={[styles.actionButton, { backgroundColor: '#4facfe' }]}
//                 >
//                   <Icon name="pencil" size={16} color="#fff" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Modal with Photo Upload */}
//       <Modal visible={modalVisible} transparent={true} animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
//             <Text style={[styles.modalTitle, { color: colors.text }]}>
//               {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
//             </Text>
            
//             {/* Photo Upload Section */}
//             <TouchableOpacity 
//               style={[styles.photoContainer, { backgroundColor: colors.background }]}
//               onPress={handleImagePicker}
//             >
//               {formData.photo ? (
//                 <Image source={{ uri: formData.photo }} style={styles.photoPreview} />
//               ) : (
//                 <View style={styles.photoPlaceholder}>
//                   <Icon name="camera" size={40} color={colors.textSecondary} />
//                   <Text style={[styles.photoText, { color: colors.textSecondary }]}>Add Photo</Text>
//                 </View>
//               )}
//             </TouchableOpacity>
            
//             <TextInput
//               style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
//               placeholder="Enter name"
//               placeholderTextColor={colors.textSecondary}
//               value={formData.name}
//               onChangeText={(text) => setFormData({...formData, name: text})}
//             />
            
//             <TextInput
//               style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
//               placeholder="Enter mobile number"
//               placeholderTextColor={colors.textSecondary}
//               value={formData.mobile}
//               onChangeText={(text) => setFormData({...formData, mobile: text})}
//               keyboardType="phone-pad"
//               maxLength={10}
//             />
            
//             <TextInput
//               style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
//               placeholder="Employee code"
//               placeholderTextColor={colors.textSecondary}
//               value={formData.empCode}
//               onChangeText={(text) => setFormData({...formData, empCode: text})}
//               editable={!editingEmployee}
//             />

//             {/* Role/Designation Dropdown */}
//             <TouchableOpacity
//               style={[styles.dropdown, { backgroundColor: colors.background, borderColor: '#ddd' }]}
//               onPress={() => setShowRoleDropdown(!showRoleDropdown)}
//             >
//               <Text style={[styles.dropdownText, { color: colors.text }]}>
//                 {formData.role || 'Select Role'}
//               </Text>
//               <Icon name="chevron-down" size={20} color={colors.textSecondary} />
//             </TouchableOpacity>

//             {showRoleDropdown && (
//               <View style={[styles.dropdownList, { backgroundColor: colors.cardBackground }]}>
//                 {roles.map((role) => (
//                   <TouchableOpacity
//                     key={role}
//                     style={styles.dropdownItem}
//                     onPress={() => {
//                       setFormData({...formData, role: role, relieverFor: role !== 'Reliever' ? null : formData.relieverFor});
//                       setShowRoleDropdown(false);
//                     }}
//                   >
//                     <Text style={[styles.dropdownItemText, { color: colors.text }]}>{role}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             )}

//             {/* Reliever Reference Dropdown - Only show if role is Reliever */}
//             {formData.role === 'Reliever' && (
//               <>
//                 <TouchableOpacity
//                   style={[styles.dropdown, { backgroundColor: colors.background, borderColor: '#ddd' }]}
//                   onPress={() => setShowRelieverDropdown(!showRelieverDropdown)}
//                 >
//                   <Text style={[styles.dropdownText, { color: colors.text }]}>
//                     {formData.relieverFor || 'Select Worker to Relieve'}
//                   </Text>
//                   <Icon name="chevron-down" size={20} color={colors.textSecondary} />
//                 </TouchableOpacity>

//                 {showRelieverDropdown && (
//                   <View style={[styles.dropdownList, { backgroundColor: colors.cardBackground }]}>
//                     {availableWorkers.map((worker) => (
//                       <TouchableOpacity
//                         key={worker.id}
//                         style={styles.dropdownItem}
//                         onPress={() => {
//                           setFormData({...formData, relieverFor: worker.name});
//                           setShowRelieverDropdown(false);
//                         }}
//                       >
//                         <Text style={[styles.dropdownItemText, { color: colors.text }]}>
//                           {worker.name} ({worker.role})
//                         </Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 )}
//               </>
//             )}

//             {/* Status Dropdown */}
//             <TouchableOpacity
//               style={[styles.dropdown, { backgroundColor: colors.background, borderColor: '#ddd' }]}
//               onPress={() => setShowStatusDropdown(!showStatusDropdown)}
//             >
//               <Text style={[styles.dropdownText, { color: colors.text }]}>
//                 Status: {formData.status}
//               </Text>
//               <Icon name="chevron-down" size={20} color={colors.textSecondary} />
//             </TouchableOpacity>

//             {showStatusDropdown && (
//               <View style={[styles.dropdownList, { backgroundColor: colors.cardBackground }]}>
//                 {statusOptions.map((status) => (
//                   <TouchableOpacity
//                     key={status}
//                     style={styles.dropdownItem}
//                     onPress={() => {
//                       setFormData({...formData, status: status});
//                       setShowStatusDropdown(false);
//                     }}
//                   >
//                     <Text style={[styles.dropdownItemText, { color: colors.text }]}>{status}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             )}
            
//             <TextInput
//               style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
//               placeholder="Enter Aadhar number"
//               placeholderTextColor={colors.textSecondary}
//               value={formData.aadharNo}
//               onChangeText={(text) => setFormData({...formData, aadharNo: text})}
//               keyboardType="numeric"
//               maxLength={14}
//             />
            
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 onPress={() => setModalVisible(false)}
//                 style={[styles.modalButton, styles.cancelButton]}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={handleSubmit}
//                 style={[styles.modalButton, styles.submitButton]}
//               >
//                 <Text style={styles.submitButtonText}>Submit</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
  
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 16,
//   },
//   backButton: {
//     padding: 8,
//     borderRadius: 8,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//   },
//   headerContent: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   addButton: {
//     padding: 8,
//     borderRadius: 8,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//   },
  
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     margin: 16,
//     padding: 12,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   searchIcon: { marginRight: 12 },
//   searchInput: { flex: 1, fontSize: 16 },
  
//   content: { flex: 1, paddingHorizontal: 16 },
//   employeeCard: {
//     flexDirection: 'row',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   employeePhotoContainer: {
//     marginRight: 12,
//   },
//   employeePhoto: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//   },
//   employeePhotoPlaceholder: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   employeeInfo: { flex: 1 },
//   employeeName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   employeeRole: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   employeeDetails: {
//     fontSize: 14,
//     marginBottom: 2,
//   },
//   dropdown: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//     borderWidth: 1,
//   },
//   dropdownText: {
//     fontSize: 16,
//   },
//   dropdownList: {
//     width: '100%',
//     borderRadius: 10,
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     maxHeight: 150,
//   },
//   dropdownItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   dropdownItemText: {
//     fontSize: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: '90%',
//     borderRadius: 20,
//     padding: 20,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   photoContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 2,
//     borderColor: '#ddd',
//     borderStyle: 'dashed',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     overflow: 'hidden',
//   },
//   photoPreview: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 60,
//   },
//   photoPlaceholder: {
//     alignItems: 'center',
//   },
//   photoText: {
//     fontSize: 12,
//     marginTop: 5,
//   },
//   input: {
//     width: '100%',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop: 20,
//   },
//   modalButton: {
//     flex: 1,
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   cancelButton: {
//     backgroundColor: '#6c757d',
//   },
//   submitButton: {
//     backgroundColor: '#1E3A8A',
//   },
//   cancelButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   statusBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     alignSelf: 'flex-start',
//     marginTop: 4,
//   },
//   statusText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   actionButtons: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   actionButton: {
//     padding: 8,
//     borderRadius: 20,
//     marginVertical: 2,
//   },
// });


import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';

export default function ManageWorkers() {
  const router = useRouter();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  
  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      name: "Ram Kumar", 
      mobile: "9876543210", 
      empCode: "EMP001",
      aadharNo: "1234-5678-9012",
      role: "Vehicle Driver",
      relieverFor: null,
      photo: null,
      status: "Active"
    },
    { 
      id: 2, 
      name: "Shyam Singh", 
      mobile: "9876543211", 
      empCode: "EMP002",
      aadharNo: "2345-6789-0123",
      role: "Swachh Worker",
      relieverFor: null,
      photo: null,
      status: "Active"
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    empCode: '',
    aadharNo: '',
    role: 'Swachh Worker',
    relieverFor: null,
    photo: null,
    status: 'Active'
  });

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [viewEmployee, setViewEmployee] = useState(null);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showRelieverDropdown, setShowRelieverDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const roles = ['Vehicle Driver', 'Swachh Worker', 'Helper', 'Reliever'];
  const statusOptions = ['Active', 'Inactive'];
  
  // Get workers for reliever dropdown (exclude current editing employee)
  const availableWorkers = employees.filter(emp => emp.role !== 'Reliever');

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.empCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.mobile.includes(searchQuery)
  );

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setFormData({
      name: '',
      mobile: '',
      empCode: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      aadharNo: '',
      role: 'Swachh Worker',
      relieverFor: null,
      photo: null,
      status: 'Active'
    });
    setModalVisible(true);
  };

  const handleEditEmployee = (employee) => {
    Alert.alert(
      "Edit Employee",
      "Do you really want to edit this employee's information?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Edit", onPress: () => {
          setEditingEmployee(employee);
          setFormData(employee);
          setModalVisible(true);
          setViewModalVisible(false);
        }}
      ]
    );
  };

  const handleViewEmployee = (employee) => {
    setViewEmployee(employee);
    setViewModalVisible(true);
  };

  // ... (existing image picker functions remain unchanged) ...

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions');
      return;
    }

    Alert.alert(
      "Select Image",
      "Choose an option",
      [
        { text: "Camera", onPress: openCamera },
        { text: "Gallery", onPress: openGallery },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera permissions');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setFormData({...formData, photo: result.assets[0].uri});
    }
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setFormData({...formData, photo: result.assets[0].uri});
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.mobile || !formData.empCode || !formData.aadharNo) {
      Alert.alert("Error", "Please fill all required fields");
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={[]}>
      {/* Header */}
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
              <Text style={styles.headerTitle}>Manage Workers</Text>
            </View>
            <TouchableOpacity onPress={handleAddEmployee} style={styles.addButton}>
              <Icon name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
        </SafeAreaView>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.cardBackground }]}>
        <Icon name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search employees..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Employee List */}
      <ScrollView style={styles.content}>
        {filteredEmployees.map((employee) => (
          <TouchableOpacity 
            key={employee.id} 
            style={[styles.employeeCard, { backgroundColor: colors.cardBackground }]}
          >
            {/* Employee Photo */}
            <View style={styles.employeePhotoContainer}>
              {employee.photo ? (
                <Image source={{ uri: employee.photo }} style={styles.employeePhoto} />
              ) : (
                <View style={[styles.employeePhotoPlaceholder, { backgroundColor: colors.background }]}>
                  <Icon name="person" size={30} color={colors.textSecondary} />
                </View>
              )}
            </View>
            
            <View style={styles.employeeInfo}>
              <Text style={[styles.employeeName, { color: colors.text }]}>{employee.name}</Text>
              <Text style={[styles.employeeRole, { color: '#1E3A8A' }]}>{employee.role}</Text>
              <Text style={[styles.employeeDetails, { color: colors.textSecondary }]}>
                Mobile: {employee.mobile}
              </Text>
              <Text style={[styles.employeeDetails, { color: colors.textSecondary }]}>
                ID: {employee.empCode}
              </Text>
              {employee.relieverFor && (
                <Text style={[styles.employeeDetails, { color: '#FF6B35' }]}>
                  Reliever for: {employee.relieverFor}
                </Text>
              )}
              <View style={[styles.statusBadge, { backgroundColor: employee.status === 'Active' ? '#4CAF50' : '#FF5722' }]}>
                <Text style={styles.statusText}>{employee.status}</Text>
              </View>
            </View>
            
            {/* View Button */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                onPress={() => handleViewEmployee(employee)}
                style={[styles.actionButton, { backgroundColor: '#4facfe' }]}
              >
                <Text style={{ color: '#fff', fontSize: 14 }}>View</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* View Modal */}
      <Modal visible={viewModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
            {viewEmployee && (
              <>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  {viewEmployee.name}
                </Text>
                {/* Display additional details as needed */}
                <Text style={[styles.modalText, { color: colors.text }]}>
                  Mobile: {viewEmployee.mobile}
                </Text>
                <Text style={[styles.modalText, { color: colors.text }]}>
                  Employee Code: {viewEmployee.empCode}
                </Text>
                <Text style={[styles.modalText, { color: colors.text }]}>
                  Role: {viewEmployee.role}
                </Text>
                <Text style={[styles.modalText, { color: colors.text }]}>
                  Status: {viewEmployee.status}
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    onPress={() => setViewModalVisible(false)}
                    style={[styles.modalButton, styles.cancelButton]}
                  >
                    <Text style={styles.cancelButtonText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleEditEmployee(viewEmployee)}
                    style={[styles.modalButton, styles.submitButton]}
                  >
                    <Text style={styles.submitButtonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Add/Edit Employee Modal (existing modal) */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
            </Text>
            
            {/* Photo Upload Section */}
            <TouchableOpacity 
              style={[styles.photoContainer, { backgroundColor: colors.background }]}
              onPress={handleImagePicker}
            >
              {formData.photo ? (
                <Image source={{ uri: formData.photo }} style={styles.photoPreview} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Icon name="camera" size={40} color={colors.textSecondary} />
                  <Text style={[styles.photoText, { color: colors.textSecondary }]}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>
            
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
              placeholder="Enter name"
              placeholderTextColor={colors.textSecondary}
              value={formData.name}
              onChangeText={(text) => setFormData({...formData, name: text})}
            />
            
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
              placeholder="Enter mobile number"
              placeholderTextColor={colors.textSecondary}
              value={formData.mobile}
              onChangeText={(text) => setFormData({...formData, mobile: text})}
              keyboardType="phone-pad"
              maxLength={10}
            />
            
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
              placeholder="Employee code"
              placeholderTextColor={colors.textSecondary}
              value={formData.empCode}
              onChangeText={(text) => setFormData({...formData, empCode: text})}
              editable={!editingEmployee}
            />

            {/* Role/Designation Dropdown */}
            <TouchableOpacity
              style={[styles.dropdown, { backgroundColor: colors.background, borderColor: '#ddd' }]}
              onPress={() => setShowRoleDropdown(!showRoleDropdown)}
            >
              <Text style={[styles.dropdownText, { color: colors.text }]}>
                {formData.role || 'Select Role'}
              </Text>
              <Icon name="chevron-down" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            {showRoleDropdown && (
              <View style={[styles.dropdownList, { backgroundColor: colors.cardBackground }]}>
                {roles.map((role) => (
                  <TouchableOpacity
                    key={role}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setFormData({...formData, role: role, relieverFor: role !== 'Reliever' ? null : formData.relieverFor});
                      setShowRoleDropdown(false);
                    }}
                  >
                    <Text style={[styles.dropdownItemText, { color: colors.text }]}>{role}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Reliever Reference Dropdown - Only show if role is Reliever */}
            {formData.role === 'Reliever' && (
              <>
                <TouchableOpacity
                  style={[styles.dropdown, { backgroundColor: colors.background, borderColor: '#ddd' }]}
                  onPress={() => setShowRelieverDropdown(!showRelieverDropdown)}
                >
                  <Text style={[styles.dropdownText, { color: colors.text }]}>
                    {formData.relieverFor || 'Select Worker to Relieve'}
                  </Text>
                  <Icon name="chevron-down" size={20} color={colors.textSecondary} />
                </TouchableOpacity>

                {showRelieverDropdown && (
                  <View style={[styles.dropdownList, { backgroundColor: colors.cardBackground }]}>
                    {availableWorkers.map((worker) => (
                      <TouchableOpacity
                        key={worker.id}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setFormData({...formData, relieverFor: worker.name});
                          setShowRelieverDropdown(false);
                        }}
                      >
                        <Text style={[styles.dropdownItemText, { color: colors.text }]}>
                          {worker.name} ({worker.role})
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </>
            )}

            {/* Status Dropdown */}
            <TouchableOpacity
              style={[styles.dropdown, { backgroundColor: colors.background, borderColor: '#ddd' }]}
              onPress={() => setShowStatusDropdown(!showStatusDropdown)}
            >
              <Text style={[styles.dropdownText, { color: colors.text }]}>
                Status: {formData.status}
              </Text>
              <Icon name="chevron-down" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            {showStatusDropdown && (
              <View style={[styles.dropdownList, { backgroundColor: colors.cardBackground }]}>
                {statusOptions.map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setFormData({...formData, status: status});
                      setShowStatusDropdown(false);
                    }}
                  >
                    <Text style={[styles.dropdownItemText, { color: colors.text }]}>{status}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
              placeholder="Enter Aadhar number"
              placeholderTextColor={colors.textSecondary}
              value={formData.aadharNo}
              onChangeText={(text) => setFormData({...formData, aadharNo: text})}
              keyboardType="numeric"
              maxLength={14}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.modalButton, styles.submitButton]}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  addButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16 },
  
  content: { flex: 1, paddingHorizontal: 16 },
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
  employeePhotoContainer: {
    marginRight: 12,
  },
  employeePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  employeePhotoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  employeeInfo: { flex: 1 },
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  employeeRole: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  employeeDetails: {
    fontSize: 14,
    marginBottom: 2,
  },
  actionButtons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
    marginVertical: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  submitButton: {
    backgroundColor: '#1E3A8A',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  photoPlaceholder: {
    alignItems: 'center',
  },
  photoText: {
    fontSize: 12,
    marginTop: 5,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownList: {
    width: '100%',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    maxHeight: 150,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});