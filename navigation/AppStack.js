import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {View,Text} from 'react-native'
import BottomTabs from './Bottomtabs';
import NewTicket from '../screens/App/NewTicket';
import GenerateTicket from '../screens/App/GenerateTicket'
import TicketDetail from '../screens/App/TicketDetail'

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabs">
      <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="NewTicket" component={NewTicket} options={{headerShown:false}} />
      <Stack.Screen
       options={{
             headerTransparent: false,
             headerTitle: () => (
              <View style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "center" }}>
                <Text style={{ fontSize: 20,margin:10 ,color:"white"}}>
                 Generate Ticket
                </Text>
              </View>
              ),
              headerTitleAlign: 'center',
              headerStyle: {
              backgroundColor: '#2328a0',
              height: 100,
              },
              headerTitleStyle: {
              fontSize: 15,
              color: '#333',
              },
              headerLeft: () => null,}}
       name="GenerateTicket" component={GenerateTicket}  />
      <Stack.Screen
        options={{
           headerTransparent: false,
           headerTitle: () => (
           <View style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "center" }}>
             <Text style={{ fontSize: 20,margin:10 ,color:"white"}}>
             Ticket Details
            </Text>
           </View>
           ),
          headerTitleAlign: 'center',
          headerStyle: {
          backgroundColor: '#2328a0',
          height: 100,
          },
          headerTitleStyle: {
          fontSize: 15,
          color: '#333',
          },
        }}
       name="TicketDetail" component={TicketDetail} />
    </Stack.Navigator>
  );
};

export default AppStack;
