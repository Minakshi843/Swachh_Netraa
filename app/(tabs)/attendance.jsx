import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../contexts/ThemeContext';


const { width } = Dimensions.get('window');

export default function Attendance() {
  const router = useRouter();
  const { colors } = useTheme();
  const scrollViewRef = useRef(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [showRelieverModal, setShowRelieverModal] = useState(false);
  const [selectedReliever, setSelectedReliever] = useState(null);
  
  // Dropdown states
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

   // ✅ Fixed: Missing function to handle search input
  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  // Sample attendance data
  const attendanceData = [
    { id: 1, name: "Ram Kumar", role: "Swachh Worker", zone: "Zone A", status: "Present", checkIn: "08:00 AM", checkOut: "05:00 PM" },
    { id: 2, name: "Shyam Singh", role: "Supervisor", zone: "Zone B", status: "Present", checkIn: "07:30 AM", checkOut: "04:30 PM" },
    { id: 3, name: "Gita Devi", role: "Swachh Worker", zone: "Zone A", status: "Absent", checkIn: "-", checkOut: "-" },
    { id: 4, name: "Mohan Lal", role: "Driver", zone: "Zone C", status: "Reliever", checkIn: "09:00 AM", checkOut: "-", relieverFor: "Rajesh Kumar", originalRole: "Swachh Worker" },
    { id: 5, name: "Priya Sharma", role: "Swachh Worker", zone: "Zone B", status: "Present", checkIn: "08:05 AM", checkOut: "05:10 PM" },
    { id: 6, name: "Amit Singh", role: "Helper", zone: "Zone A", status: "Reliever", checkIn: "08:30 AM", checkOut: "-", relieverFor: "Suresh Yadav", originalRole: "Helper" },
  ];

  const attendanceStats = {
    totalEmployees: 156,
    present: 142,
    absent: 8,
    reliever: 6,
    attendanceRate: 91.0
  };

  // Chart data with meaningful weekly trends
  const pieChartData = [
    { name: "Present", population: attendanceStats.present, color: "#4CAF50", legendFontColor: colors.text, legendFontSize: 12 },
    { name: "Absent", population: attendanceStats.absent, color: "#F44336", legendFontColor: colors.text, legendFontSize: 12 },
    { name: "Reliever", population: attendanceStats.reliever, color: "#2196F3", legendFontColor: colors.text, legendFontSize: 12 },
  ];

  const barChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [{
      data: [89, 92, 88, 94, 91, 87]
    }]
  };

  const filters = ['Today', 'This Week', 'This Month'];
  const zones = ['All Zones', 'Zone A', 'Zone B', 'Zone C'];
  const roles = ['All Roles', 'Swachh Worker', 'Supervisor', 'Driver', 'Helper'];

  const filteredAttendance = attendanceData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = selectedZone === 'All Zones' || employee.zone === selectedZone;
    const matchesRole = selectedRole === 'All Roles' || employee.role === selectedRole;
    return matchesSearch && matchesZone && matchesRole;
  });

  const StatCard = ({ title, value, icon, color }) => (
    <View style={[styles.statCard, { backgroundColor: colors.cardBackground }]}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <Icon name={icon} size={20} color="#fff" />
      </View>
      <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.statTitle, { color: colors.textSecondary }]}>{title}</Text>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return '#4CAF50';
      case 'Absent': return '#F44336';
      case 'Reliever': return '#2196F3';
      default: return colors.textSecondary;
    }
  };

  const handleRelieverTap = (employee) => {
    if (employee.status === 'Reliever') {
      setSelectedReliever(employee);
      setShowRelieverModal(true);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const CalendarModal = () => (
    <Modal
      visible={showCalendar}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowCalendar(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.calendarContainer, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity
              onPress={() => {
                const newDate = new Date(selectedDate);
                newDate.setMonth(newDate.getMonth() - 1);
                setSelectedDate(newDate);
              }}
            >
              <Icon name="chevron-back" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text style={[styles.calendarTitle, { color: colors.text }]}>
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </Text>
            <TouchableOpacity
              onPress={() => {
                const newDate = new Date(selectedDate);
                newDate.setMonth(newDate.getMonth() + 1);
                setSelectedDate(newDate);
              }}
            >
              <Icon name="chevron-forward" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.weekDays}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <Text key={day} style={[styles.weekDay, { color: colors.textSecondary }]}>{day}</Text>
            ))}
          </View>
          
          <View style={styles.calendarGrid}>
            {generateCalendarDays().map((date, index) => {
              const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = date.toDateString() === selectedDate.toDateString();
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.calendarDay,
                    isSelected && styles.selectedDay,
                    isToday && styles.todayDay
                  ]}
                  onPress={() => {
                    setSelectedDate(date);
                    setShowCalendar(false);
                    Alert.alert('Date Selected', `Attendance for ${formatDate(date)}`);
                  }}
                >
                  <Text style={[
                    styles.calendarDayText,
                    { color: isCurrentMonth ? colors.text : colors.textSecondary },
                    isSelected && styles.selectedDayText,
                    isToday && styles.todayDayText
                  ]}>
                    {date.getDate()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: colors.primary }]}
            onPress={() => setShowCalendar(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const RelieverModal = () => (
    <Modal visible={showRelieverModal} transparent={true} animationType="fade">
      <View style={styles.relieverModalContainer}>
        <View style={[styles.relieverModalContent, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.relieverModalHeader}>
            <Text style={[styles.relieverModalTitle, { color: colors.text }]}>Reliever Details</Text>
            <TouchableOpacity onPress={() => setShowRelieverModal(false)}>
              <Icon name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          
          {selectedReliever && (
            <View style={styles.relieverInfo}>
              <View style={styles.relieverRow}>
                <Text style={[styles.relieverLabel, { color: colors.textSecondary }]}>Reliever:</Text>
                <Text style={[styles.relieverValue, { color: colors.text }]}>{selectedReliever.name}</Text>
              </View>
              
              <View style={styles.relieverRow}>
                <Text style={[styles.relieverLabel, { color: colors.textSecondary }]}>Relieving for:</Text>
                <Text style={[styles.relieverValue, { color: colors.primary }]}>{selectedReliever.relieverFor}</Text>
              </View>
              
              <View style={styles.relieverRow}>
                <Text style={[styles.relieverLabel, { color: colors.textSecondary }]}>Original Role:</Text>
                <Text style={[styles.relieverValue, { color: colors.text }]}>{selectedReliever.originalRole}</Text>
              </View>
              
              <View style={styles.relieverRow}>
                <Text style={[styles.relieverLabel, { color: colors.textSecondary }]}>Zone:</Text>
                <Text style={[styles.relieverValue, { color: colors.text }]}>{selectedReliever.zone}</Text>
              </View>
              
              <View style={styles.relieverRow}>
                <Text style={[styles.relieverLabel, { color: colors.textSecondary }]}>Check-in:</Text>
                <Text style={[styles.relieverValue, { color: colors.text }]}>{selectedReliever.checkIn}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );

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
              <Text style={styles.headerTitle}>Attendance Management</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => setShowCalendar(true)}>
              <Icon name="calendar" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
        </SafeAreaView>
      </View>

      <ScrollView ref={scrollViewRef} style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <StatCard title="Total Employees" value={attendanceStats.totalEmployees} icon="people" color="#667eea" />
          <StatCard title="Present" value={attendanceStats.present} icon="checkmark-circle" color="#4CAF50" />
          <StatCard title="Absent" value={attendanceStats.absent} icon="close-circle" color="#F44336" />
          <StatCard title="Reliever" value={attendanceStats.reliever} icon="repeat" color="#2196F3" />
        </View>

        {/* Attendance Rate */}
        <View style={[styles.rateCard, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.rateTitle, { color: colors.text }]}>
            {selectedDate.toDateString() === new Date().toDateString() ? "Today's" : formatDate(selectedDate)} Attendance Rate
          </Text>
          <Text style={[styles.rateValue, { color: '#4CAF50' }]}>{attendanceStats.attendanceRate}%</Text>
        </View>

        {/* Charts Section */}
        <View style={styles.chartsSection}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>Attendance Overview</Text>
          
          <View style={[styles.chartContainer, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.chartTitle, { color: colors.text }]}>
              {selectedDate.toDateString() === new Date().toDateString() ? "Today's" : formatDate(selectedDate)} Status Distribution
            </Text>
            <PieChart
              data={pieChartData}
              width={width - 80}
              height={200}
              chartConfig={{
                backgroundColor: colors.cardBackground,
                backgroundGradientFrom: colors.cardBackground,
                backgroundGradientTo: colors.cardBackground,
                color: (opacity = 1) => colors.text,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              center={[10, 10]}
              absolute
            />
          </View>

          <View style={[styles.chartContainer, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.chartTitle, { color: colors.text }]}>Weekly Attendance Trends (%)</Text>
            <Text style={[styles.chartSubtitle, { color: colors.textSecondary }]}>
              Average: 90.2% | Best: 94% (Thu) | Lowest: 87% (Sat)
            </Text>
            <BarChart
              data={barChartData}
              width={width - 80}
              height={200}
              chartConfig={{
                backgroundColor: colors.cardBackground,
                backgroundGradientFrom: colors.cardBackground,
                backgroundGradientTo: colors.cardBackground,
                decimalPlaces: 0,
                color: (opacity = 1) => '#1E3A8A',
                labelColor: (opacity = 1) => colors.text,
              }}
              style={styles.chart}
            />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBox, { backgroundColor: colors.cardBackground }]}>
            <Icon name="search" size={18} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search employees..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={handleSearchChange}
            />
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersSection}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>Filter Attendance</Text>
          
          <View style={styles.filtersRow}>
            {/* Period Dropdown */}
            <View style={styles.filterColumn}>
              <TouchableOpacity
                style={[styles.dropdownBox, { backgroundColor: colors.cardBackground, borderColor: colors.textSecondary }]}
                onPress={() => {
                  setShowPeriodDropdown(!showPeriodDropdown);
                  setShowZoneDropdown(false);
                  setShowRoleDropdown(false);
                }}
              >
                <Text style={[styles.dropdownText, { color: colors.text }]}>{selectedFilter}</Text>
                <Icon name="chevron-down" size={16} color={colors.textSecondary} />
              </TouchableOpacity>
              
              {showPeriodDropdown && (
                <View style={[styles.dropdownList, { backgroundColor: colors.cardBackground }]}>
                  {filters.map((filter) => (
                    <TouchableOpacity
                      key={filter}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedFilter(filter);
                        setShowPeriodDropdown(false);
                      }}
                    >
                      <Text style={[styles.dropdownItemText, { color: colors.text }]}>{filter}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Zone Dropdown */}
            <View style={styles.filterColumn}>
              <TouchableOpacity
                style={[styles.dropdownBox, { backgroundColor: colors.cardBackground, borderColor: colors.textSecondary }]}
                onPress={() => {
                  setShowZoneDropdown(!showZoneDropdown);
                  setShowPeriodDropdown(false);
                  setShowRoleDropdown(false);
                }}
              >
                <Text style={[styles.dropdownText, { color: colors.text }]}>{selectedZone}</Text>
                <Icon name="chevron-down" size={16} color={colors.textSecondary} />
              </TouchableOpacity>
              
              {showZoneDropdown && (
                <View style={[styles.dropdownList, { backgroundColor: colors.cardBackground }]}>
                  {zones.map((zone) => (
                    <TouchableOpacity
                      key={zone}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedZone(zone);
                        setShowZoneDropdown(false);
                      }}
                    >
                      <Text style={[styles.dropdownItemText, { color: colors.text }]}>{zone}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Role Dropdown */}
            <View style={styles.filterColumn}>
              <TouchableOpacity
                style={[styles.dropdownBox, { backgroundColor: colors.cardBackground, borderColor: colors.textSecondary }]}
                onPress={() => {
                  setShowRoleDropdown(!showRoleDropdown);
                  setShowPeriodDropdown(false);
                  setShowZoneDropdown(false);
                }}
              >
                <Text style={[styles.dropdownText, { color: colors.text }]}>{selectedRole}</Text>
                <Icon name="chevron-down" size={16} color={colors.textSecondary} />
              </TouchableOpacity>
              
              {showRoleDropdown && (
                <View style={[styles.dropdownList, { backgroundColor: colors.cardBackground }]}>
                  {roles.map((role) => (
                    <TouchableOpacity
                      key={role}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedRole(role);
                        setShowRoleDropdown(false);
                      }}
                    >
                      <Text style={[styles.dropdownItemText, { color: colors.text }]}>{role}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Attendance List */}
        <View style={styles.attendanceSection}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>Employee Attendance</Text>
          
          {filteredAttendance.map((employee) => (
            <TouchableOpacity 
              key={employee.id} 
              style={[styles.attendanceCard, { backgroundColor: colors.cardBackground }]}
              onPress={() => handleRelieverTap(employee)}
              disabled={employee.status !== 'Reliever'}
            >
              <View style={styles.employeeInfo}>
                <Text style={[styles.employeeName, { color: colors.text }]}>{employee.name}</Text>
                <Text style={[styles.employeeRole, { color: colors.textSecondary }]}>
                  {employee.role} • {employee.zone}
                </Text>
                <View style={styles.timeInfo}>
                  <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                    Check-in: {employee.checkIn}
                  </Text>
                  {employee.status === 'Reliever' && (
                    <Text style={[styles.relieverText, { color: '#2196F3' }]}>
                      Tap for details
                    </Text>
                  )}
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(employee.status) }]}>
                <Text style={styles.statusText}>{employee.status}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <CalendarModal />
      <RelieverModal />
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 60) / 2,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  rateCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  rateTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  rateValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  chartsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  chartContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 8,
  },
  filtersSection: {
    marginBottom: 20,
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  filterColumn: {
    flex: 1,
    position: 'relative',
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: 60,
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: '#1E3A8A',
    borderColor: '#1E3A8A',
  },
  filterText: {
    fontSize: 12,
    textAlign: 'center',
  },
  activeFilterText: {
    color: '#fff',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: '#277e2cff',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  attendanceSection: {
    marginBottom: 20,
  },
  attendanceCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  employeeRole: {
    fontSize: 14,
    marginBottom: 4,
  },
  timeInfo: {
    marginTop: 4,
  },
  timeText: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dateCard: {
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    width: width - 40,
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDay: {
    fontSize: 14,
    fontWeight: '600',
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  calendarDay: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    borderRadius: 20,
  },
  selectedDay: {
    backgroundColor: '#1E3A8A',
  },
  todayDay: {
    backgroundColor: '#4CAF50',
  },
  calendarDayText: {
    fontSize: 16,
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  todayDayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  relieverModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  relieverModalContent: {
    width: width - 40,
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  relieverModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  relieverModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  relieverInfo: {
    gap: 10,
  },
  relieverRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  relieverLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  relieverValue: {
    fontSize: 16,
  },
  dropdownBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 44,
  },
  dropdownText: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  dropdownList: {
    position: 'absolute',
    top: 46,
    left: 0,
    right: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    maxHeight: 150,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 12,
  },
});
























