import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // 3 সেকেন্ড পর Main Screen এ যাবে
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 3000);

    return () => clearTimeout(timer); // Cleanup
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logo.jpg')} // তোমার লোগো ফাইলের পাথ
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // ব্যাকগ্রাউন্ড কালার
  },
  logo: {
    width: 200, // লোগোর সাইজ
    height: 200,
  },
});

export default SplashScreen;