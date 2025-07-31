import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';

export default function ViewAssignments() {
  const router = useRouter();
  const { colors } = useTheme();

  // Sample assignment data
  const assignments = {
    feederPoints: [
      { supervisor: "John Doe", feederPoint: "FP-001", location: "Main Street Corner" },
      { supervisor: "Jane Smith", feederPoint: "FP-002", location: "Park Avenue" },
      { supervisor: "Mike Johnson", feederPoint: "FP-003", location: "Market Square" },
    ],
    routes: [
      { worker: "Ram Kumar", route: "Route A1", area: "Sector 1-5" },
      { worker: "Shyam Singh", route: "Route B2", area: "Sector 6-10" },
      { worker: "Gita Devi", route: "Route C3", area: "Sector 11-15" },
    ],
    vehicles: [
      { worker: "Ram Kumar", vehicle: "DL-01-AB-1234", type: "Garbage Truck" },
      { worker: "Shyam Singh", vehicle: "DL-01-CD-5678", type: "Compactor" },
      { worker: "Mohan Lal", vehicle: "DL-01-EF-9012", type: "Garbage Truck" },
    ]
  };

  const AssignmentSection = ({ title, data, icon, color }) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Icon name={icon} size={24} color={color} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      </View>
      {data.map((item, index) => (
        <View key={index} style={[styles.assignmentCard, { backgroundColor: colors.cardBackground }]}>
          {Object.entries(item).map(([key, value]) => (
            <Text key={key} style={[styles.assignmentText, { color: colors.textSecondary }]}>
              <Text style={[styles.assignmentLabel, { color: colors.text }]}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </Text> {value}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={['#43e97b', '#38f9d7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>View Assignments</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <AssignmentSection
          title="Feeder Point Assignments"
          data={assignments.feederPoints}
          icon="location-outline"
          color="#667eea"
        />
        
        <AssignmentSection
          title="Route Assignments"
          data={assignments.routes}
          icon="map-outline"
          color="#f093fb"
        />
        
        <AssignmentSection
          title="Vehicle Assignments"
          data={assignments.vehicles}
          icon="car-outline"
          color="#4facfe"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  headerContent: { flex: 1, alignItems: 'center' },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  content: { flex: 1, padding: 24 },
  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  assignmentCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  assignmentText: {
    fontSize: 14,
    marginBottom: 4,
  },
  assignmentLabel: {
    fontWeight: '600',
  },
});