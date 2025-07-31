import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';

export default function AssignFeederPoints() {
  const router = useRouter();
  const { colors } = useTheme();
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedFeederPoint, setSelectedFeederPoint] = useState(null);
  const [selectedFeederPoints, setSelectedFeederPoints] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignmentType, setAssignmentType] = useState(''); // 'worker', 'supervisor', 'vehicle', 'driver'
  const [searchText, setSearchText] = useState('');

  // Zones and Wards data
  const zones = [
    {
      id: 1,
      name: 'North Zone',
      wards: [
        { id: 1, name: 'Ward 1', feederPoints: 3 },
        { id: 2, name: 'Ward 2', feederPoints: 4 },
      ]
    },
    {
      id: 2,
      name: 'South Zone', 
      wards: [
        { id: 3, name: 'Ward 3', feederPoints: 2 },
        { id: 4, name: 'Ward 4', feederPoints: 5 },
      ]
    },
    {
      id: 3,
      name: 'East Zone',
      wards: [
        { id: 5, name: 'Ward 5', feederPoints: 3 },
        { id: 6, name: 'Ward 6', feederPoints: 2 },
      ]
    },
    {
      id: 4,
      name: 'West Zone',
      wards: [
        { id: 7, name: 'Ward 7', feederPoints: 4 },
        { id: 8, name: 'Ward 8', feederPoints: 3 },
      ]
    }
  ];

  // Sample data from Manage Workers/Vehicles
  const availableWorkers = [
    { id: 1, name: 'Ram Kumar', phone: '9876543210', zone: 'Zone 1' },
    { id: 2, name: 'Shyam Singh', phone: '9876543211', zone: 'Zone 1' },
    { id: 3, name: 'Gita Devi', phone: '9876543212', zone: 'Zone 2' },
  ];

  const availableSupervisors = [
    { id: 1, name: 'John Supervisor', phone: '9876543220', zone: 'Zone 1' },
    { id: 2, name: 'Jane Supervisor', phone: '9876543221', zone: 'Zone 2' },
  ];

  const availableVehicles = [
    { id: 1, number: 'DL-01-AB-1234', type: 'Garbage Truck', capacity: '5 tons' },
    { id: 2, number: 'DL-01-CD-5678', type: 'Compactor', capacity: '3 tons' },
    { id: 3, number: 'DL-01-EF-9012', type: 'Mini Truck', capacity: '2 tons' },
  ];

  const availableDrivers = [
    { id: 1, name: 'Rajesh Driver', phone: '9876543230', license: 'DL123456' },
    { id: 2, name: 'Suresh Driver', phone: '9876543231', license: 'DL789012' },
  ];

  // Current assignments for feeder points
  const [assignments, setAssignments] = useState({
    'FP-001': {
      workers: ['Ram Kumar'],
      supervisor: 'John Supervisor',
      vehicle: 'DL-01-AB-1234',
      driver: 'Rajesh Driver'
    }
  });

  // Generate feeder points for selected ward
  const generateFeederPoints = (ward) => {
    const feederPoints = [];
    for (let i = 1; i <= ward.feederPoints; i++) {
      const fpName = `FP-${String(ward.id).padStart(2, '0')}${String(i).padStart(2, '0')}`;
      feederPoints.push({
        id: `${ward.id}-${i}`,
        name: fpName,
        location: `Collection Point ${i}, ${ward.name}`,
      });
    }
    return feederPoints;
  };

  const handleAddAssignment = (type) => {
    setAssignmentType(type);
    setShowAssignModal(true);
    setSearchText('');
  };

  const assignToFeederPoint = (item) => {
    const fpName = selectedFeederPoint.name;
    
    setAssignments(prev => ({
      ...prev,
      [fpName]: {
        ...prev[fpName],
        [assignmentType]: assignmentType === 'workers' 
          ? [...(prev[fpName]?.workers || []), item.name]
          : item.name || item.number
      }
    }));
    
    setShowAssignModal(false);
  };

  const getFilteredData = () => {
    let data = [];
    switch(assignmentType) {
      case 'workers': data = availableWorkers; break;
      case 'supervisor': data = availableSupervisors; break;
      case 'vehicle': data = availableVehicles; break;
      case 'driver': data = availableDrivers; break;
    }
    
    if (!searchText) return data;
    
    return data.filter(item => 
      (item.name && item.name.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.number && item.number.toLowerCase().includes(searchText.toLowerCase()))
    );
  };

  const renderZoneCard = ({ item: zone }) => (
    <TouchableOpacity
      style={[styles.zoneCard, { backgroundColor: colors.cardBackground }]}
      onPress={() => setSelectedZone(zone)}
    >
      <View style={styles.zoneHeader}>
        <Text style={[styles.zoneName, { color: colors.text }]}>{zone.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: '#4CAF50' }]}>
          <Text style={styles.statusText}>{zone.wards.length} Wards</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderWardCard = ({ item: ward }) => (
    <TouchableOpacity
      style={[styles.wardCard, { backgroundColor: colors.cardBackground }]}
      onPress={() => setSelectedWard(ward)}
    >
      <View style={styles.wardHeader}>
        <Text style={[styles.wardName, { color: colors.text }]}>{ward.name}</Text>
        <Text style={[styles.wardStats, { color: colors.textSecondary }]}>
          {ward.feederPoints} Feeder Points
        </Text>
      </View>
      <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderFeederPoint = ({ item: fp }) => {
    const currentAssignments = assignments[fp.name] || {};
    
    return (
      <View style={[styles.feederCard, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.feederName, { color: colors.text }]}>{fp.name}</Text>
        <Text style={[styles.feederLocation, { color: colors.textSecondary }]}>{fp.location}</Text>
        
        {/* Workers Section */}
        <View style={styles.assignmentSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Workers</Text>
            <TouchableOpacity 
              style={[styles.addButton, { backgroundColor: '#4CAF50' }]}
              onPress={() => {
                setSelectedFeederPoint(fp);
                handleAddAssignment('workers');
              }}
            >
              <Icon name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.assignedList}>
            {(currentAssignments.workers || []).map((worker, index) => (
              <View key={index} style={[styles.assignedItem, { backgroundColor: '#E8F5E8' }]}>
                <Text style={styles.assignedText}>{worker}</Text>
              </View>
            ))}
            {(!currentAssignments.workers || currentAssignments.workers.length === 0) && (
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No workers assigned</Text>
            )}
          </View>
        </View>

        {/* Supervisor Section */}
        <View style={styles.assignmentSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Supervisor</Text>
            <TouchableOpacity 
              style={[styles.addButton, { backgroundColor: '#9C27B0' }]}
              onPress={() => {
                setSelectedFeederPoint(fp);
                handleAddAssignment('supervisor');
              }}
            >
              <Icon name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.assignedList}>
            {currentAssignments.supervisor ? (
              <View style={[styles.assignedItem, { backgroundColor: '#F3E5F5' }]}>
                <Text style={styles.assignedText}>{currentAssignments.supervisor}</Text>
              </View>
            ) : (
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No supervisor assigned</Text>
            )}
          </View>
        </View>

        {/* Vehicle Section */}
        <View style={styles.assignmentSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Vehicle</Text>
            <TouchableOpacity 
              style={[styles.addButton, { backgroundColor: '#2196F3' }]}
              onPress={() => {
                setSelectedFeederPoint(fp);
                handleAddAssignment('vehicle');
              }}
            >
              <Icon name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.assignedList}>
            {currentAssignments.vehicle ? (
              <View style={[styles.assignedItem, { backgroundColor: '#E3F2FD' }]}>
                <Text style={styles.assignedText}>{currentAssignments.vehicle}</Text>
              </View>
            ) : (
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No vehicle assigned</Text>
            )}
          </View>
        </View>

        {/* Driver Section */}
        <View style={styles.assignmentSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Driver</Text>
            <TouchableOpacity 
              style={[styles.addButton, { backgroundColor: '#FF9800' }]}
              onPress={() => {
                setSelectedFeederPoint(fp);
                handleAddAssignment('driver');
              }}
            >
              <Icon name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.assignedList}>
            {currentAssignments.driver ? (
              <View style={[styles.assignedItem, { backgroundColor: '#FFF3E0' }]}>
                <Text style={styles.assignedText}>{currentAssignments.driver}</Text>
              </View>
            ) : (
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No driver assigned</Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  // Bottom Sheet Modal
  const AssignmentModal = () => (
    <Modal visible={showAssignModal} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.bottomSheet, { backgroundColor: colors.cardBackground }]}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Select {assignmentType}
            </Text>
            <TouchableOpacity onPress={() => setShowAssignModal(false)}>
              <Icon name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={[styles.searchContainer, { backgroundColor: colors.background }]}>
            <Icon name="search" size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder={`Search ${assignmentType}...`}
              placeholderTextColor={colors.textSecondary}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* List */}
          <FlatList
            data={getFilteredData()}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => assignToFeederPoint(item)}
              >
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemName, { color: colors.text }]}>
                    {item.name || item.number}
                  </Text>
                  <Text style={[styles.itemDetails, { color: colors.textSecondary }]}>
                    {item.phone || item.type || item.license}
                  </Text>
                </View>
                <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
            style={styles.modalList}
          />
        </View>
      </View>
    </Modal>
  );

  // If ward is selected, show feeder points
  if (selectedWard) {
    const feederPoints = generateFeederPoints(selectedWard);
    
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <LinearGradient
          colors={['#2196F3', '#1976D2']}
          style={styles.header}
        >
          <TouchableOpacity onPress={() => setSelectedWard(null)} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{selectedWard.name}</Text>
            <Text style={styles.headerSubtitle}>Assign people to feeder points</Text>
          </View>
        </LinearGradient>

        <FlatList
          data={feederPoints}
          renderItem={renderFeederPoint}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />

        <AssignmentModal />
      </SafeAreaView>
    );
  }

  // If zone is selected, show wards
  if (selectedZone) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <LinearGradient
          colors={['#2196F3', '#1976D2']}
          style={styles.header}
        >
          <TouchableOpacity onPress={() => setSelectedZone(null)} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{selectedZone.name}</Text>
            <Text style={styles.headerSubtitle}>Select a ward to manage feeder points</Text>
          </View>
        </LinearGradient>

        <FlatList
          data={selectedZone.wards}
          renderItem={renderWardCard}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </SafeAreaView>
    );
  }

  // Default view - show zones
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={['#2196F3', '#1976D2']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Assign Feeder Points</Text>
          <Text style={styles.headerSubtitle}>Select a zone to begin assignment</Text>
        </View>
      </LinearGradient>

      <FlatList
        data={zones}
        renderItem={renderZoneCard}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  listContainer: {
    padding: 16,
  },
  feederCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  feederName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  feederLocation: {
    fontSize: 14,
    marginBottom: 16,
  },
  assignmentSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignedList: {
    minHeight: 40,
  },
  assignedItem: {
    padding: 8,
    borderRadius: 6,
    marginBottom: 4,
  },
  assignedText: {
    fontSize: 14,
    color: '#333',
  },
  emptyText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  modalList: {
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemDetails: {
    fontSize: 14,
    marginTop: 2,
  },
  zoneCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  zoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  zoneName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  wardCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  wardHeader: {
    flex: 1,
  },
  wardName: {
    fontSize: 16,
    fontWeight: '600',
  },
  wardStats: {
    fontSize: 14,
    marginTop: 4,
  },
});
