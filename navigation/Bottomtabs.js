import {useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View,Text,TouchableOpacity} from 'react-native'
import HomeScreen from '../screens/App/HomeScreen';
import Tickets from '../screens/App/Tickets';
import History from '../screens/App/History';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; // Import MaterialCommunityIcons
import {AuthContext} from '../screens/utils/AuthContext'
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
  const {logout} = useContext(AuthContext);
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen}
        options={{
          headerTransparent: false,
          headerTitle: () => (
             <TouchableOpacity onPress={()=>logout()} style={{ height: "60%", display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "center" }}>
             <Text style={{ fontSize: 20 ,color:"white",fontWeight:"bold"}}>
               Carwash
             </Text>
             </TouchableOpacity>
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
          },
          headerRight:()=>{
          <View style={{backgroundColor:"#000",height:"100%",width:"30%"}}>

          </View>}
        }}
      />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Tickets" component={Tickets} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
