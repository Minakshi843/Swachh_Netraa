import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  FlatList,
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

export default function FeederPoints() {
  const router = useRouter();
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);
  const [showWardDropdown, setShowWardDropdown] = useState(false);

  const [feederPoints, setFeederPoints] = useState([
    {
      id: 1,
      name: 'FP-001',
      location: 'Main Street Corner',
      fullAddress: '123 Main Street, Sector 1, New Delhi',
      latitude: 28.6139,
      longitude: 77.2090,
      zone: 'North Zone',
      ward: 'Ward 1',
      status: 'Active',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'FP-002',
      location: 'Park Avenue',
      fullAddress: '456 Park Avenue, Sector 2, New Delhi',
      latitude: 28.6129,
      longitude: 77.2080,
      zone: 'South Zone',
      ward: 'Ward 3',
      status: 'Active',
      createdAt: '2024-01-16'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    fullAddress: '',
    latitude: '',
    longitude: '',
    zone: '',
    ward: '',
    status: 'Active'
  });

  // Sample zones and wards data
  const zones = [
    {
      id: 1,
      name: 'North Zone',
      wards: ['Ward 1', 'Ward 2']
    },
    {
      id: 2,
      name: 'South Zone',
      wards: ['Ward 3', 'Ward 4']
    },
    {
      id: 3,
      name: 'East Zone',
      wards: ['Ward 5', 'Ward 6']
    },
    {
      id: 4,
      name: 'West Zone',
      wards: ['Ward 7', 'Ward 8']
    }
  ];

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        setIsLoadingLocation(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Reverse geocoding to get address
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        const fullAddress = `${address.name || ''} ${address.street || ''}, ${address.city || ''}, ${address.region || ''}, ${address.country || ''}`.trim();
        
        setFormData(prev => ({
          ...prev,
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          fullAddress: fullAddress,
          location: address.name || address.street || 'Current Location'
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        }));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to get current location');
    }
    setIsLoadingLocation(false);
  };

  const handleAddFeederPoint = () => {
    setFormData({
      name: `FP-${String(feederPoints.length + 1).padStart(3, '0')}`,
      location: '',
      fullAddress: '',
      latitude: '',
      longitude: '',
      zone: '',
      ward: '',
      status: 'Active'
    });
    setModalVisible(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.location || !formData.fullAddress || !formData.zone || !formData.ward) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const newFeederPoint = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setFeederPoints([...feederPoints, newFeederPoint]);
    Alert.alert("Success", "Feeder point created successfully!");
    setModalVisible(false);
  };

  const getSelectedWards = () => {
    const selectedZone = zones.find(zone => zone.name === formData.zone);
    return selectedZone ? selectedZone.wards : [];
  };

  const filteredFeederPoints = feederPoints.filter(fp =>
    fp.name.toLowerCase().includes(searchText.toLowerCase()) ||
    fp.location.toLowerCase().includes(searchText.toLowerCase()) ||
    fp.zone.toLowerCase().includes(searchText.toLowerCase()) ||
    fp.ward.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderFeederPoint = ({ item }) => (
    <View style={[styles.feederCard, { backgroundColor: colors.cardBackground }]}>
      <View style={styles.feederHeader}>
        <Text style={[styles.feederName, { color: colors.text }]}>{item.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'Active' ? '#4CAF50' : '#FF5722' }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <Text style={[styles.feederLocation, { color: colors.text }]}>{item.location}</Text>
      <Text style={[styles.feederAddress, { color: colors.textSecondary }]}>{item.fullAddress}</Text>
      
      <View style={styles.feederDetails}>
        <View style={styles.detailRow}>
          <Icon name="location-outline" size={16} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {item.zone} • {item.ward}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Icon name="navigate-outline" size={16} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {item.latitude}, {item.longitude}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Icon name="calendar-outline" size={16} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            Created: {item.createdAt}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={['#4CAF50', '#45a049']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Feeder Points</Text>
          <Text style={styles.headerSubtitle}>Manage collection points</Text>
        </View>
        <TouchableOpacity onPress={handleAddFeederPoint} style={styles.addButton}>
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.cardBackground }]}>
        <Icon name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search feeder points..."
          placeholderTextColor={colors.textSecondary}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Stats */}
      <View style={[styles.statsContainer, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.text }]}>{feederPoints.length}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Points</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#4CAF50' }]}>
            {feederPoints.filter(fp => fp.status === 'Active').length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Active</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#FF5722' }]}>
            {feederPoints.filter(fp => fp.status === 'Inactive').length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Inactive</Text>
        </View>
      </View>

      {/* Feeder Points List */}
      <FlatList
        data={filteredFeederPoints}
        renderItem={renderFeederPoint}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Feeder Point Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Create Feeder Point</Text>
              
              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
                placeholder="Feeder Point Name"
                placeholderTextColor={colors.textSecondary}
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
              />

              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
                placeholder="Location Name"
                placeholderTextColor={colors.textSecondary}
                value={formData.location}
                onChangeText={(text) => setFormData({...formData, location: text})}
              />

              {/* Get Current Location Button */}
              <TouchableOpacity
                style={[styles.locationButton, { backgroundColor: '#2196F3' }]}
                onPress={getCurrentLocation}
                disabled={isLoadingLocation}
              >
                <Icon name="location" size={20} color="#fff" />
                <Text style={styles.locationButtonText}>
                  {isLoadingLocation ? 'Getting Location...' : 'Get Current Location'}
                </Text>
              </TouchableOpacity>

              <TextInput
                style={[styles.input, styles.textArea, { backgroundColor: colors.background, color: colors.text }]}
                placeholder="Full Address"
                placeholderTextColor={colors.textSecondary}
                value={formData.fullAddress}
                onChangeText={(text) => setFormData({...formData, fullAddress: text})}
                multiline={true}
                numberOfLines={3}
              />

              <View style={styles.coordinatesRow}>
                <TextInput
                  style={[styles.input, styles.halfInput, { backgroundColor: colors.background, color: colors.text }]}
                  placeholder="Latitude"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.latitude}
                  onChangeText={(text) => setFormData({...formData, latitude: text})}
                  keyboardType="numeric"
                />
                <TextInput
                  style={[styles.input, styles.halfInput, { backgroundColor: colors.background, color: colors.text }]}
                  placeholder="Longitude"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.longitude}
                  onChangeText={(text) => setFormData({...formData, longitude: text})}
                  keyboardType="numeric"
                />
              </View>

              {/* Zone Dropdown */}
              <TouchableOpacity
                style={[styles.dropdown, { backgroundColor: colors.background, borderColor: '#ddd' }]}
                onPress={() => setShowZoneDropdown(!showZoneDropdown)}
              >
                <Text style={[styles.dropdownText, { color: colors.text }]}>
                  {formData.zone || 'Select Zone'}
                </Text>
                <Icon name="chevron-down" size={20} color={colors.textSecondary} />
              </TouchableOpacity>

              {showZoneDropdown && (
                <View style={[styles.dropdownList, { backgroundColor: colors.cardBackground }]}>
                  {zones.map((zone) => (
                    <TouchableOpacity
                      key={zone.id}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setFormData({...formData, zone: zone.name, ward: ''});
                        setShowZoneDropdown(false);
                      }}
                    >
                      <Text style={[styles.dropdownItemText, { color: colors.text }]}>{zone.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Ward Dropdown */}
              <TouchableOpacity
                style={[styles.dropdown, { backgroundColor: colors.background, borderColor: '#ddd' }]}
                onPress={() => setShowWardDropdown(!showWardDropdown)}
                disabled={!formData.zone}
              >
                <Text style={[styles.dropdownText, { color: formData.zone ? colors.text : colors.textSecondary }]}>
                  {formData.ward || 'Select Ward'}
                </Text>
                <Icon name="chevron-down" size={20} color={colors.textSecondary} />
              </TouchableOpacity>

              {showWardDropdown && (
                <View style={[styles.dropdownList, { backgroundColor: colors.cardBackground }]}>
                  {getSelectedWards().map((ward) => (
                    <TouchableOpacity
                      key={ward}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setFormData({...formData, ward: ward});
                        setShowWardDropdown(false);
                      }}
                    >
                      <Text style={[styles.dropdownItemText, { color: colors.text }]}>{ward}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.submitButton]}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitButtonText}>Create</Text>
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
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
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
    elevation: 2,
  },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16 },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  feederCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  feederHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  feederName: {
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
    fontWeight: 'bold',
  },
  feederLocation: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  feederAddress: {
    fontSize: 14,
    marginBottom: 12,
  },
  feederDetails: {
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '90%',
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  coordinatesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  halfInput: {
    flex: 1,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    gap: 8,
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
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
});