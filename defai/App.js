import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from './components/Search';
import Ocr from './components/Ocr';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';

export default function App() {
  // inintialize a BottomTabNavigator instance
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Header
        backgroundColor="#b5b3b3"
        centerComponent={{
          text: 'DefAI',
          style: {
            marginTop: 4,
            fontSize: 40,
            color: 'white',
            alignContent: 'center',
          },
        }}
      />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            // Render icon for each tab
            if (route.name === 'Search') {
              iconName = 'search-outline';
            } else if (route.name === 'OCR') {
              iconName = 'image-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          // if chosen
          activeTintColor: 'tomato',
          // otherwise
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="OCR" component={Ocr} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
