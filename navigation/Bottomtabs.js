import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View,Text} from 'react-native'
import HomeScreen from '../screens/App/HomeScreen';
import Tickets from '../screens/App/Tickets';
import History from '../screens/App/History';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; // Import MaterialCommunityIcons

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const screenOptions = ({ route }) => ({
    tabBarShowLabel: false,
    headerShown: true,
    tabBarStyle: {
      height: '6%',
      elevation: 0,
      backgroundColor: '#050c1c',
      borderTopColor: 'transparent',
    },
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === 'Home') {
        iconName = 'home';
      } else if (route.name === 'Tickets') {
        iconName = 'robot-angry';
      } else if (route.name === 'History') {
        iconName = 'av-timer';
      }
      return (
        <MaterialCommunityIcons name={iconName} size={size} color={focused ? '#7f4fe0' : '#4B5563'} />
      );
    },
    tabBarActiveTintColor: '#FFFFFF',
    tabBarInactiveTintColor: '#4B5563',
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen}
        options={{
          headerTransparent: false,
          headerTitle: () => (
             <View style={{ height: "80%", display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "center" }}>
             <Text style={{ fontSize: 20 ,color:"white",fontWeight:"bold"}}>
               Carwash
             </Text>
             </View>
             ),
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: '#2328a0',
                    height: 80,
                  },
                  headerTitleStyle: {
                    fontSize: 15,
                    color: '#333',
                  },
          headerRightContainerStyle: {
          marginLeft: "2%"
          }
        }}
      />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Tickets" component={Tickets} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
