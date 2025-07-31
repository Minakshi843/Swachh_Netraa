import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../contexts/ThemeContext';


export default function Assignments() {
  const router = useRouter();
  const { colors } = useTheme();

  const assignmentOptions = [
    {
      title: "Assign Feeder Points",
      description: "Assign feeder points to supervisors",
      icon: "location-outline",
      path: "/assign-feeder-points",
      color: ['#2E7D32', '#66BB6A']
    },
    {
      title: "Assign Routes", 
      description: "Assign collection routes to workers",
      icon: "map-outline",
      path: "/assign-routes",
      color: ['#388E3C', '#81C784']
    },
    {
      title: "Assign Vehicles",
      description: "Assign vehicles to workers", 
      icon: "car-outline",
      path: "/assign-vehicles",
      color: ['#1B5E20', '#4CAF50']
    }
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={[]}>
      <View style={{ backgroundColor: '#1B5E20' }}>
        <SafeAreaView edges={['top']}>
          <LinearGradient
            colors={['#1B5E20', '#2E7D32']}
            style={styles.header}
          >
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Assignments</Text>
            </View>
          </LinearGradient>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.content}>
        {assignmentOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: colors.cardBackground }]}
            onPress={() => router.push(option.path)}
          >
            <Icon name={option.icon} size={32} color="#2E7D32" />
            <Text style={[styles.cardTitle, { color: colors.text }]}>{option.title}</Text>
            <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>{option.description}</Text>
          </TouchableOpacity>
        ))}
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
    padding: 20, 
    borderRadius: 16, 
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#2E7D32',
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 8 
  },
  cardDescription: { 
    fontSize: 14, 
    marginTop: 4 
  },
});
