// import { LinearGradient } from 'expo-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
// filepath: c:\Users\HP\Downloads\react-native project\Swachh-Netra-app\App.js
import React from 'react';
global.React = React;
// ...existing code...
import { useTheme } from 'contexts/ThemeContext';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { PieChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// Gen-Z Glassmorphism StatCard Component
const StatCard = ({ title, count, icon, color, delay }) => {
  return (
    <Animatable.View 
      animation="fadeInUp" 
      delay={delay} 
      style={styles.statCard}
    >
      <LinearGradient
        colors={color}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statGradient}
      >
        <View style={styles.statContent}>
          <View style={styles.statIconContainer}>
            <Icon name={icon} size={20} color="#fff" />
          </View>
          <View style={styles.statInfo}>
            <Text style={styles.statCount}>{count}</Text>
            <Text style={styles.statTitle}>{title}</Text>
          </View>
        </View>
      </LinearGradient>
    </Animatable.View>
  );
};

// Professional ModuleCard with clean design
const ModuleCard = ({ title, icon, path, delay, router, colors, featured = false }) => {
  return (
    <Animatable.View 
      animation="fadeInUp" 
      delay={delay} 
      style={styles.moduleCardWrapper}
    >
      <TouchableOpacity
        style={[
          styles.moduleCard, 
          { backgroundColor: colors.cardBackground }
        ]}
        onPress={() => router.push(path)}
        activeOpacity={0.8}
      >
        <View style={styles.moduleContent}>
          <View style={[
            styles.moduleIconContainer,
            { backgroundColor: featured ? 'rgba(102, 126, 234, 0.1)' : 'rgba(148, 163, 184, 0.1)' }
          ]}>
            <Icon 
              name={icon} 
              size={24} 
              color={featured ? "#667eea" : "#64748B"} 
            />
          </View>
          
          <Text style={[
            styles.moduleTitle, 
            { color: colors.text }
          ]}>{title}</Text>
          
          <View style={styles.moduleArrow}>
            <Icon 
              name="chevron-forward" 
              size={16} 
              color={colors.textSecondary} 
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default function AdminDashboard() {
  const router = useRouter();
  const { isDarkMode, colors } = useTheme();

  // Enhanced stats data
  const statsData = {
    totalZones: 12,
    totalWards: 45,
    totalSupervisors: 8,
    totalSwachhWorkers: 156,
    totalFeederPoints: 89,
    totalVehicles: 42,
  };

  // Gen-Z color palette for charts
  const chartData = [
    {
      name: "Workers",
      population: statsData.totalSwachhWorkers,
      color: "#8B5CF6", // Purple
      legendFontColor: colors.text,
      legendFontSize: 11,
    },
    {
      name: "Feeder Points",
      population: statsData.totalFeederPoints,
      color: "#EC4899", // Pink
      legendFontColor: colors.text,
      legendFontSize: 11,
    },
    {
      name: "Wards", 
      population: statsData.totalWards,
      color: "#3B82F6", // Blue
      legendFontColor: colors.text,
      legendFontSize: 11,
    },
    {
      name: "Vehicles",
      population: statsData.totalVehicles,
      color: "#10B981", // Emerald
      legendFontColor: colors.text,
      legendFontSize: 11,
    },
    {
      name: "Zones",
      population: statsData.totalZones,
      color: "#F59E0B", // Amber
      legendFontColor: colors.text,
      legendFontSize: 11,
    },
    {
      name: "Supervisors",
      population: statsData.totalSupervisors,
      color: "#EF4444", // Red
      legendFontColor: colors.text,
      legendFontSize: 11,
    },
  ];

  // Enhanced module cards with icons - reduced list
  const cardData = [
    { title: "Manage Workers", icon: "people-outline", path: "/manage-workers", delay: 150, featured: true },
    { title: "Zones & Wards", icon: "location-outline", path: "/zone-ward", delay: 200 },
    { title: "Feeder Points", icon: "globe-outline", path: "/feeder", delay: 250 },
    { title: "Routes", icon: "git-branch-outline", path: "/routes", delay: 300 },
    { title: "Vehicles & Shifts", icon: "car-outline", path: "/vehicles", delay: 400 },
    { title: "Activity Logs", icon: "bar-chart-outline", path: "/activityLog", delay: 450 },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} backgroundColor="transparent" />

      {/* Gen-Z Header with personality */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.replace('/AdminDashboard')} style={styles.headerButton}>
            <LinearGradient
              colors={['rgba(168, 85, 247, 0.2)', 'rgba(236, 72, 153, 0.2)']}
              style={styles.headerButtonGradient}
            >
              <Icon name="Home" size={18} color="#A855F7" />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/settings')} style={styles.headerButton}>
            <LinearGradient
              colors={['rgba(59, 130, 246, 0.2)', 'rgba(16, 185, 129, 0.2)']}
              style={styles.headerButtonGradient}
            >
              <Icon name="Setting" size={18} color="#3B82F6" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.headerContent}>
          <Text style={[styles.headerGreeting, { color: colors.textSecondary }]}>
            Good morning! Welcome back
          </Text>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Admin Dashboard
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            Let's manage the cleanliness operations
          </Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Unified Overview Section - All Stats in One */}
        <View style={styles.overviewSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Overview
            </Text>
            <View style={styles.sectionAccent} />
          </View>
          
          {/* 2x3 Grid Layout for All Stats */}
          <View style={styles.statsGrid}>
            <View style={styles.statsRow}>
              <StatCard 
                title="Total Workers" 
                count={statsData.totalSwachhWorkers} 
                icon="people" 
                color={['#667eea', '#764ba2']} 
                delay={100}
              />
              <StatCard 
                title="Zones" 
                count={statsData.totalZones} 
                icon="location" 
                color={['#f093fb', '#f5576c']} 
                delay={150}
              />
            </View>
            <View style={styles.statsRow}>
              <StatCard 
                title="Wards" 
                count={statsData.totalWards} 
                icon="map-outline" 
                color={['#4facfe', '#00f2fe']} 
                delay={200}
              />
              <StatCard 
                title="Feeder Points" 
                count={statsData.totalFeederPoints} 
                icon="pin-outline" 
                color={['#43e97b', '#38f9d7']} 
                delay={250}
              />
            </View>
            <View style={styles.statsRow}>
              <StatCard 
                title="Supervisors" 
                count={statsData.totalSupervisors} 
                icon="person-outline" 
                color={['#fa709a', '#fee140']} 
                delay={300}
              />
              <StatCard 
                title="Vehicles" 
                count={statsData.totalVehicles} 
                icon="car" 
                color={['#47d4cdff', '#a1cfe5ff']} 
                delay={350}
              />
            </View>
          </View>
        </View>

        {/* Enhanced Chart Section */}
        <Animatable.View animation="fadeInUp" delay={400} style={styles.chartSection}>
          <View style={[styles.chartCard, { backgroundColor: colors.cardBackground }]}>
            {/* Holographic border */}
            <LinearGradient
              colors={['rgba(168, 85, 247, 0.3)', 'rgba(236, 72, 153, 0.3)', 'rgba(59, 130, 246, 0.3)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.chartBorder}
            />
            
            <View style={styles.chartHeader}>
              <View style={styles.chartTitleContainer}>
                <Icon name="bar-chart" size={20} color={colors.primary} />
                <Text style={[styles.chartTitle, { color: colors.text }]}>Distribution</Text>
              </View>
            </View>
            <PieChart
              data={chartData}
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
              center={[10, 0]}
              absolute
            />
          </View>
        </Animatable.View>

        {/* Management Modules with Gen-Z flair */}
        <View style={styles.modulesSection}>
          <View style={styles.modulesSectionHeader}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Quick Actions
              </Text>
              <View style={styles.sectionAccent} />
            </View>
            <TouchableOpacity style={styles.seeAllContainer}>
              <LinearGradient
                colors={['rgba(168, 85, 247, 0.15)', 'rgba(236, 72, 153, 0.15)']}
                style={styles.seeAllGradient}
              >
                <Text style={styles.seeAllButton}>See all</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          
          <View style={styles.modulesGrid}>
            {cardData.map((card, index) => (
              <ModuleCard
                key={index}
                title={card.title}
                icon={card.icon}
                path={card.path}
                delay={card.delay}
                router={router}
                colors={colors}
                featured={card.featured}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
  },
  headerButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonEmoji: {
    fontSize: 18,
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  headerGreeting: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.8,
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: '400',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  overviewSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  sectionAccent: {
    width: 40,
    height: 3,
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
  },
  heroCardContainer: {
    marginBottom: 16,
  },
  statsGrid: {
    gap: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  statsRowSingle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statCardLarge: {
    height: 120,
  },
  statGradient: {
    padding: 16,
    height: 100,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statInfo: {
    flex: 1,
  },
  statCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  statTitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  statTrendContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 2,
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  trendText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '600',
  },
  chartSection: {
    marginBottom: 32,
  },
  chartCard: {
    borderRadius: 24,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  chartBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chartEmoji: {
    fontSize: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  chartMoreButton: {
    padding: 4,
  },
  chartMoreGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartMoreEmoji: {
    fontSize: 16,
  },
  modulesSection: {
    marginBottom: 32,
  },
  modulesSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  seeAllGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  seeAllButton: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
  },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  moduleCardWrapper: {
    width: (width - 52) / 2,
    marginBottom: 16,
  },
  moduleCardFeatured: {
    transform: [{ scale: 1.02 }],
  },
  moduleCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  moduleCardFeaturedBg: {
    elevation: 4,
    shadowOpacity: 0.12,
  },
  moduleGradient: {
    padding: 16,
    minHeight: 90,
    justifyContent: 'space-between',
    position: 'relative',
  },
  neonBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.5)',
    borderRadius: 20,
  },
  moduleContent: {
    padding: 16,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'space-between',
  },
  moduleIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  moduleTitle: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 6,
  },
  moduleArrow: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleArrowFeatured: {
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
  },
  sparkleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sparkle: {
    position: 'absolute',
    backgroundColor: 'rgba(168, 85, 247, 0.3)',
    borderRadius: 50,
  },
  sparkle1: {
    width: 4,
    height: 4,
    top: 15,
    left: 15,
  },
  sparkle2: {
    width: 3,
    height: 3,
    bottom: 20,
    right: 25,
  },
  sparkle3: {
    width: 5,
    height: 5,
    top: 35,
    right: 15,
  },
});
