import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const TransactionItem = ({ transaction }) => {
  const icon = transaction.end_time ? "check-square" : "times-circle";
  const iconColor = transaction.end_time ? "green" : "red";

  return (
    <View style={styles.transactionItem}>
      <FontAwesome name={icon} size={24} color={iconColor} />
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionText}>{transaction.ticket_number}</Text>
        <Text style={styles.transactionSubText}>{transaction.start_time}</Text>
      </View>
      <Text style={styles.transactionAmount}>GHC {transaction.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
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
  transactionDetails: {
    flex: 1,
    marginLeft: 16,
  },
  transactionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionSubText: {
    fontSize: 14,
    color: '#6b6b6b',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionItem;
