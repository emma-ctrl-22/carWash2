import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from '@env';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const ApiKey = API_KEY;
    const [isLoading, setLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const login = (username, password) => {
        console.log("Logging in");
        setLoading(true);
        axios.post("https://shaboshabo.wigal.com.gh/api/login", { username, password }, {
            headers: {
                'X-API-KEY': ApiKey
            }
        })
        .then(res => {
            const { statuscode, message, data } = res.data;
            if (statuscode === "00") {
                const { email, username, id, mobilenumber } = data;
                const userInfo = { email, mobilenumber, username, id };
                console.log("UserInfo:", userInfo);
                setUserInfo(userInfo);
                setUserToken(username);  // Use username or any token you have
                AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));     
                AsyncStorage.setItem("userToken", username);   
            } else {
                console.error("Login error:", message);
            }
        })
        .catch(error => {
            console.error("Login error", error);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const logout = () => {
        setLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem("userInfo");
        AsyncStorage.removeItem("userToken");
        setLoading(false);
        console.log("logged out");
    };

    const isLogged = async () => {
        try {
            setLoading(true);
            let userInfo = await AsyncStorage.getItem("userInfo");
            let userToken = await AsyncStorage.getItem("userToken");
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserInfo(userInfo);
                setUserToken(userToken);
                console.log("User is logged in:", userInfo);
            }
            setLoading(false);
        } catch (error) {
            console.log("Error checking login status", error);
        }
    };

    useEffect(() => {
        isLogged();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
