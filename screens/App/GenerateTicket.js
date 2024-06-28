import React from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "../utils/axios";


export default function GenerateTicket({ route }) {
  const { ticket } = route.params;
  const ticketNumber = ticket.ticketId;
  const carNumber = ticket.carNumber;
  const serviceId = String(ticket.selectedServiceId);
  const serviceItemId = String(ticket.selectedCarTypeId);
  const price = String(ticket.price);
  console.log(price, serviceId, serviceItemId, carNumber, ticketNumber);

  const navigation = useNavigation();


  const saveTicket =  async() => {
    console.log(price, serviceId, serviceItemId, carNumber, ticketNumber);
    try {
      console.log("Saving ticket...");
      const response = await axios.post(
        "/servicerequest",
        {
          "staff_id":"3",
          "car_number":carNumber,
          "service_id":serviceId,
          "serviceitem_id":serviceItemId,
          "price":price
      },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Response:", response);

      if (response.status === 200) {
        Alert.alert("Success", "Ticket saved for later");
        navigation.navigate('Tickets');
      } else {
        Alert.alert("Error", "Failed to save the ticket in try block");
        console.error("Failed to save ticket in try block");
      }
    } catch (error) {
      console.error("Failed to save ticket:", error);
      Alert.alert("Error", `Failed to save the ticket: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>Generated Ticket</Text>
      <View style={styles.table}>
        <View style={styles.tableHead}>
          <Text>Description</Text>
          <Text>Info</Text>
        </View>
        <View style={styles.tableContent}>
          <Text style={styles.text}>Car Number</Text>
          <Text style={styles.text}>{carNumber}</Text>
        </View>
        <View style={styles.tableContent}>
          <Text style={styles.text}>Start Time</Text>
          <Text style={styles.text}>{ticket.startTime}</Text>
        </View>
        <View style={styles.tableContent}>
          <Text style={styles.text}>Price</Text>
          <Text style={styles.text}>{ticket.price}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Proceed To Make Payment</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={saveTicket}
      >
        <Text style={styles.buttonText}>Save For Later</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerTxt: {
    fontSize: 20,
    color: "black",
    fontWeight: "200",
  },
  table: {
    borderColor: "#c0c0c0",
    borderWidth: 1,
    borderRadius: 5,
    height: "30%",
    width: "95%",
    alignSelf: "center",
    marginTop: "5%",
    display: "flex",
    flexDirection: "column",
  },
  tableHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#c0c0c0",
    height: "25%",
    backgroundColor: "dodgerblue",
  },
  tableContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#c0c0c0",
    height: "25%",
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "200",
    margin: 10,
  },
  button: {
    backgroundColor: "#2328a0",
    padding: 10,
    borderRadius: 5,
    marginTop: 40,
    width: "95%",
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
