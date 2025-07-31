// import { Stack } from 'expo-router';
// import React from 'react';
// import { ThemeProvider } from '../contexts/ThemeContext'; // update path if needed

// export default function RootLayout() {
//   return (
//     <ThemeProvider>
//       <Stack screenOptions={{ headerShown: false }}>
//         {/* Auth Screens */}
//         <Stack.Screen name="auth/signIn" />
//         <Stack.Screen name="auth/signUp" />

//         {/* Tabs layout group */}
//         <Stack.Screen name="(tabs)" />

//         {/* Other screens */}
//         <Stack.Screen name="assign-feeder-points" />
//         <Stack.Screen name="assign-routes" />
//         <Stack.Screen name="assign-vehicles" />
//         <Stack.Screen name="employees" />
//         <Stack.Screen name="feeder" />
//         <Stack.Screen name="home" />
//         <Stack.Screen name="index" />
//         <Stack.Screen name="manage-workers" />
//         <Stack.Screen name="settings" />
//         <Stack.Screen name="view-assignments" />
//         <Stack.Screen name="analytics" /> {/* optional if you have this screen */}
//       </Stack>
//     </ThemeProvider>
//   );
// }
import { Slot } from 'expo-router';
import { ThemeProvider } from '../contexts/ThemeContext';

export default function Layout() {
  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}


