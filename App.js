import * as React from 'react';
import { useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Splash Screen
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate 3-second auto-play for splash screen (Flowchart: B)
    const timer = setTimeout(() => {
      navigation.replace('Main'); // Navigate to Main Interface (Flowchart: C)
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Sugamo Navi Logo</Text>
      <Text>Travel Video Playing...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

// Main Interface (Flowchart: C)
const MainScreen = ({ navigation }) => (
  <View style={styles.center}>
    <Text style={styles.title}>Sugamo Navi</Text>
    <Button title="Login" onPress={() => navigation.navigate('UserType')} />
    <Button title="Register" onPress={() => navigation.navigate('RegisterType')} />
  </View>
);

// User Type Selection (Flowchart: G, BB)
const UserTypeScreen = ({ navigation }) => (
  <View style={styles.center}>
    <Text style={styles.title}>Select User Type</Text>
    <Button title="User" onPress={() => navigation.navigate('LoginOptions', { userType: 'User' })} />
    <Button title="Shop Owner" onPress={() => navigation.navigate('LoginOptions', { userType: 'ShopOwner' })} />
    <Button title="Admin" onPress={() => navigation.navigate('AdminLogin')} />
  </View>
);

// Login Options (Flowchart: K, L)
const LoginOptionsScreen = ({ navigation, route }) => {
  const { userType } = route.params;
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Login as {userType}</Text>
      <Button title="Gmail OAuth" onPress={() => navigation.navigate('Validate', { method: 'Gmail', userType })} />
      <Button title="Mobile OTP" onPress={() => navigation.navigate('Validate', { method: 'OTP', userType })} />
      <Button title="Email & Password" onPress={() => navigation.navigate('EmailPassword', { userType })} />
    </View>
  );
};

// Email & Password Login (Flowchart: O, R, S)
const EmailPasswordScreen = ({ navigation, route }) => {
  const { userType } = route.params;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    // Mock validation (Flowchart: V, W)
    console.log(`Validating ${userType} credentials: ${email}, ${password}`);
    const success = true; // Replace with actual validation logic
    if (success) {
      navigation.navigate(userType === 'Admin' ? 'AdminDashboard' : userType === 'ShopOwner' ? 'ShopOwnerDashboard' : 'UserDashboard');
    } else {
      navigation.navigate('Error', { message: 'Invalid credentials. Please retry.' });
    }
  };

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Login with Email & Password</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

// Validation Screen for Gmail/OTP (Flowchart: T, U)
const ValidateScreen = ({ navigation, route }) => {
  const { method, userType } = route.params;
  useEffect(() => {
    // Mock validation (Flowchart: T, U)
    console.log(`Validating ${method} for ${userType}`);
    const success = true; // Replace with actual validation (e.g., OAuth token, OTP)
    setTimeout(() => {
      if (success) {
        navigation.navigate(userType === 'ShopOwner' ? 'ShopOwnerDashboard' : 'UserDashboard');
      } else {
        navigation.navigate('Error', { message: `Invalid ${method}. Please retry.` });
      }
    }, 1000);
  }, [navigation, method, userType]);

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Validating {method}...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

// Registration Type Selection (Flowchart: BB)
const RegisterTypeScreen = ({ navigation }) => (
  <View style={styles.center}>
    <Text style={styles.title}>Register as</Text>
    <Button title="User" onPress={() => navigation.navigate('UserRegister')} />
    <Button title="Shop Owner" onPress={() => navigation.navigate('ShopOwnerRegister')} />
  </View>
);

// User Registration (Flowchart: EE, GG)
const UserRegisterScreen = ({ navigation }) => {
  const [gmail, setGmail] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleRegister = () => {
    // Mock validation (Flowchart: GG)
    console.log(`Registering User: ${gmail}, ${mobile}, ${username}, ${password}`);
    const success = password === confirmPassword; // Basic validation
    if (success) {
      // Save to DB, send verification (Flowchart: II)
      console.log('Saving to DB...');
      navigation.navigate('LoginOptions', { userType: 'User' }); // Flowchart: KK
    } else {
      navigation.navigate('Error', { message: 'Passwords do not match. Please retry.' }); // Flowchart: JJ
    }
  };

  return (
    <View style={styles.center}>
      <Text style={styles.title}>User Registration</Text>
      <TextInput style={styles.input} placeholder="Gmail" value={gmail} onChangeText={setGmail} />
      <TextInput style={styles.input} placeholder="Mobile" value={mobile} onChangeText={setMobile} />
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

// Shop Owner Registration (Flowchart: FF, HH)
const ShopOwnerRegisterScreen = ({ navigation }) => {
  const [shopName, setShopName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [gmail, setGmail] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleRegister = () => {
    // Mock validation (Flowchart: HH)
    console.log(`Registering Shop Owner: ${shopName}, ${category}, ${gmail}, ${mobile}, ${username}, ${password}`);
    const success = password === confirmPassword; // Basic validation
    if (success) {
      // Save to DB, send verification (Flowchart: II)
      console.log('Saving to DB...');
      navigation.navigate('LoginOptions', { userType: 'ShopOwner' }); // Flowchart: KK
    } else {
      navigation.navigate('Error', { message: 'Passwords do not match. Please retry.' }); // Flowchart: JJ
    }
  };

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Shop Owner Registration</Text>
      <TextInput style={styles.input} placeholder="Shop Name" value={shopName} onChangeText={setShopName} />
      <TextInput style={styles.input} placeholder="Category" value={category} onChangeText={setCategory} />
      <TextInput style={styles.input} placeholder="Gmail" value={gmail} onChangeText={setGmail} />
      <TextInput style={styles.input} placeholder="Mobile" value={mobile} onChangeText={setMobile} />
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

// Error Screen (Flowchart: Y, JJ)
const ErrorScreen = ({ navigation, route }) => {
  const { message } = route.params;
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Error</Text>
      <Text>{message}</Text>
      <Button title="Retry" onPress={() => navigation.goBack()} />
    </View>
  );
};

// Dashboards (Flowchart: X, Z, AA)
const UserDashboardScreen = () => (
  <View style={styles.center}>
    <Text style={styles.title}>User Dashboard</Text>
    <Text>Welcome, User!</Text>
  </View>
);

const ShopOwnerDashboardScreen = () => (
  <View style={styles.center}>
    <Text style={styles.title}>Shop Owner Dashboard</Text>
    <Text>Welcome, Shop Owner!</Text>
  </View>
);

const AdminDashboardScreen = () => (
  <View style={styles.center}>
    <Text style={styles.title}>Admin Dashboard</Text>
    <Text>Welcome, Admin!</Text>
  </View>
);

// Navigation Setup
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Sugamo Navi' }} />
        <Stack.Screen name="UserType" component={UserTypeScreen} options={{ title: 'Select User Type' }} />
        <Stack.Screen name="LoginOptions" component={LoginOptionsScreen} options={{ title: 'Login Options' }} />
        <Stack.Screen name="EmailPassword" component={EmailPasswordScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Validate" component={ValidateScreen} options={{ title: 'Validating' }} />
        <Stack.Screen name="AdminLogin" component={EmailPasswordScreen} options={{ title: 'Admin Login' }} />
        <Stack.Screen name="RegisterType" component={RegisterTypeScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="UserRegister" component={UserRegisterScreen} options={{ title: 'User Registration' }} />
        <Stack.Screen name="ShopOwnerRegister" component={ShopOwnerRegisterScreen} options={{ title: 'Shop Owner Registration' }} />
        <Stack.Screen name="Error" component={ErrorScreen} options={{ title: 'Error' }} />
        <Stack.Screen name="UserDashboard" component={UserDashboardScreen} options={{ title: 'User Dashboard' }} />
        <Stack.Screen name="ShopOwnerDashboard" component={ShopOwnerDashboardScreen} options={{ title: 'Shop Owner Dashboard' }} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ title: 'Admin Dashboard' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
});