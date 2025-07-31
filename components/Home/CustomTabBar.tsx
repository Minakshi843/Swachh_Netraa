// import React from 'react';
// import { Tabs } from 'expo-router';
// import { usePathname, useRouter } from 'expo-router';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function CustomTabBar({ state }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const tabs = [
//     { name: 'index', icon: 'home-outline', label: 'Home' },
//     { name: 'assignments', icon: 'clipboard-outline', label: 'Assign' },
//     { name: 'attendance', icon: 'calendar-outline', label: 'Attendance' },
//   ] as const;

//   return (
//     <View style={styles.tabBar}>
//       {tabs.map((tab, index) => {
//         const isFocused = pathname.includes(tab.name);
//         const isCenter = tab.name === 'assignments';

//         return (
//           <TouchableOpacity
//             key={tab.name}
//             onPress={() => router.replace(`/(tabs)/${tab.name}` as any)}
//             style={[styles.tabItem, isCenter && styles.centerTab]}
//           >
//             <Ionicons
//               name={tab.icon}
//               size={24}
//               color={isFocused ? '#2E7D32' : '#888'}
//             />
//             {!isCenter && <Text style={{ fontSize: 10 }}>{tab.label}</Text>}
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   tabBar: {
//     flexDirection: 'row',
//     height: 70,
//     backgroundColor: 'white',
//     elevation: 10,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingBottom: 10,
//   },
//   tabItem: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   centerTab: {
//     top: -20,
//     backgroundColor: '#fff',
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     elevation: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 2,
//     borderColor: '#2E7D32',
//   },
// });

//////////////////

import { Ionicons } from '@expo/vector-icons'; // Make sure this is imported
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Define the valid icon names
type IconNames =
  | 'home-outline'
  | 'clipboard-outline'
  | 'calendar-outline';

export default function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  // Define the tabs array with strict typing for icon
  const tabs: { name: string; icon: IconNames; label: string }[] = [
    { name: 'index', icon: 'home-outline', label: 'Home' },
    { name: 'assignments', icon: 'clipboard-outline', label: 'Assign' },
    { name: 'attendance', icon: 'calendar-outline', label: 'Attendance' },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const isFocused = pathname.includes(tab.name); // Check if the tab is focused
        const isCenter = tab.name === 'assignments';

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => router.replace(`/(tabs)/${tab.name}` as any)} // Navigate to the respective tab
            style={[styles.tabItem, isCenter && styles.centerTab]} // Style if the tab is focused
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={isFocused ? '#2E7D32' : '#888'}
            />
            <Text style={{ fontSize: 10 }}>{tab.label}</Text> {/* Show the label */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: 'white',
    elevation: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTab: {
    top: -20,
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#2E7D32',
  },
});








/////////////////////////
// // components/Home/CustomTabBar.tsx
// import { Ionicons } from '@expo/vector-icons';
// import { usePathname, useRouter } from 'expo-router';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function CustomTabBar({ state }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   // Add Analytics to the tabs array
//   const tabs = [
//     { name: 'index', icon: 'home-outline', label: 'Home' },
//     { name: 'assignments', icon: 'clipboard-outline', label: 'Assign' },
//     { name: 'analytics', icon: 'analytics-outline', label: 'Analytics' }, // New Tab
//     { name: 'attendance', icon: 'calendar-outline', label: 'Attendance' },
//   ];

//   return (
//     <View style={styles.tabBar}>
//       {tabs.map((tab) => {
//         const isFocused = pathname.includes(tab.name);
//         const isCenter = tab.name === 'assignments';

//         return (
//           <TouchableOpacity
//             key={tab.name}
//             onPress={() => router.replace(`/(tabs)/${tab.name}` as any)}
//             style={[styles.tabItem, isCenter && styles.centerTab]}
//           >
//             <Ionicons
//            name={tab.icon as keyof typeof Ionicons.glyphMap}  // Cast to valid icon key
//            size={24}
//            color={isFocused ? '#2E7D32' : '#888'}
// />

//             {!isCenter && <Text style={{ fontSize: 10 }}>{tab.label}</Text>}
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   tabBar: {
//     flexDirection: 'row',
//     height: 70,
//     backgroundColor: 'white',
//     elevation: 10,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingBottom: 10,
//   },
//   tabItem: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   centerTab: {
//     top: -20,
//     backgroundColor: '#fff',
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     elevation: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 2,
//     borderColor: '#2E7D32',
//   },
// });




// import { Ionicons } from '@expo/vector-icons';
// import { usePathname, useRouter } from 'expo-router';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// // Define the valid Ionicons icon names
// type IconNames = 
//   | "home-outline"
//   | "clipboard-outline"
//   | "analytics-outline"
//   | "calendar-outline"
//   | "filter"
//   | "infinite"
//   | "text"
//   | "push"
//   | "map"
//   | "at"
//   | "search"
//   | "repeat"
//   | "woman-sharp";

// export default function CustomTabBar() {
//   const router = useRouter();
//   const pathname = usePathname();

//   // Define tabs, including Analytics tab
//   const tabs = [
//     { name: 'index', icon: 'home-outline', label: 'Home' },
//     { name: 'assignments', icon: 'clipboard-outline', label: 'Assign' },
//     { name: 'analytics', icon: 'analytics-outline', label: 'Analytics' }, // Analytics tab
//     { name: 'attendance', icon: 'calendar-outline', label: 'Attendance' },
//   ];

//   return (
//     <View style={styles.tabBar}>
//       {tabs.map((tab) => {
//         const isFocused = pathname.includes(tab.name); // Check if the tab is focused

//          return (
//           <TouchableOpacity
//             key={tab.name}
//             onPress={() => router.replace(`/(tabs)/${tab.name}`)} // Navigate to the respective tab
//             style={[styles.tabItem, isFocused && styles.centerTab]} // Style if the tab is focused
//           >
//             <Ionicons
//               name={tab.icon} // Use the correct icon name here
//               size={24}
//               color={isFocused ? '#2E7D32' : '#888'} // Change color based on focus
//             />
//             <Text style={{ fontSize: 10 }}>{tab.label}</Text> {/* Show the label */}
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   tabBar: {
//     flexDirection: 'row',
//     height: 70,
//     backgroundColor: 'white',
//     elevation: 10,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingBottom: 10,
//   },
//   tabItem: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   centerTab: {
//     top: -20,
//     backgroundColor: '#fff',
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     elevation: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 2,
//     borderColor: '#2E7D32',
//   },
// });
