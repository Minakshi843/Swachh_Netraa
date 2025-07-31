// app/tabs/analytics.tsx
import { StyleSheet, Text, View } from 'react-native';

export default function Analytics() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics Page</Text>
      <Text style={styles.body}>This is the Analytics screen where you can track various metrics.</Text>
      {/* Add more content or charts as per your requirement */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
    color: '#555',
  },
});
