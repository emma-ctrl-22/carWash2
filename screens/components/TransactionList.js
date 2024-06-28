import React, { useEffect, useState,useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TransactionItem from './TransactionItem';
import moment from 'moment';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [fromDate, setFromDate] = useState(moment().subtract(1, 'days').toDate()); // Yesterday
    const [toDate, setToDate] = useState(new Date());

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

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Tickets</Text>
      <FlatList
        data={tickets.slice().reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: '100%',
    height:"30%"
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color:"#373dd1",marginLeft:"2%"
  },
});

export default TransactionsList;
