import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Importing icons from expo vector icons
import moment from 'moment';
import axios from 'axios';

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [fromDate, setFromDate] = useState(moment().subtract(1, 'days').toDate()); // Yesterday
  const [toDate, setToDate] = useState(new Date());
  const navigation = useNavigation();

  const fetchTicketHistory = async (fromDate = new Date(), toDate = new Date()) => {
    try {
      const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
      const formattedToDate = moment(toDate).format('YYYY-MM-DD');

      const response = await axios.post('https://shaboshabo.wigal.com.gh/api/servicehistory', {
        start_date: formattedFromDate,
        end_date: formattedToDate,
      });

      const tickets = response.data.data || [];
      setTickets(tickets);
    } catch (error) {
      console.error('Error fetching ticket history:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTicketHistory(fromDate, toDate);
    }, [])
  );

  const handleTicketPress = (ticket) => {
    navigation.navigate('TicketDetail', { ticket });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleTicketPress(item)}>
      <View style={styles.ticket}>
        <View style={styles.iconContainer}>
          {item.end_time ? (
            <FontAwesome name="check" size={24} color="green" />
          ) : (
            <FontAwesome name="times" size={24} color="red" />
          )}
        </View>
        <View style={styles.ticketInfo}>
          <Text style={styles.text}>Ticket Number: {item.ticket_number}</Text>
          <Text style={styles.text}>Start Time: {item.start_time}</Text>
          <Text style={styles.text}>Price: {item.price}</Text>
          <Text style={styles.text}>Car Number: {item.car_number}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {tickets.length > 0 ? (
        <FlatList
          data={tickets.slice().reverse()}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text style={styles.noTicketsText}>No tickets saved</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  ticket: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#e3e5fe',
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  iconContainer: {
    marginRight: 10,
  },
  ticketInfo: {
    flex: 1,
  },
  text: {
    fontSize: 18,
  },
  noTicketsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});
