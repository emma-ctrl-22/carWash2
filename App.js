import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";
import AppStack from "./navigation/AppStack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, AuthContext } from "./screens/utils/AuthContext";

import { enableScreens } from "react-native-screens";
enableScreens();

const AppContent = () => {
    const { isLoading, userToken } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {userToken ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </GestureHandlerRootView>
    );
};

export default App;
