import {useState,useCallback,useEffect} from 'react'
import {SafeAreaView,View,Text,StyleSheet,TouchableOpacity} from "react-native"
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios';
import TransactionList from '../components/TransactionList';

const HomeScreen = () =>{
  const navigation = useNavigation();
  const [ticketCount, setTicketCount] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [fromDate, setFromDate] = useState(moment().subtract(1, 'days').toDate()); // Yesterday
  const [toDate, setToDate] = useState(new Date());
  const [totalAmount,setTotalAmount] = useState(0);
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
            const TicketCount = tickets.length;
            setTicketCount(TicketCount)

            const TotalAmount = tickets.reduce((accumulator,currentObject) =>{
            const price = parseFloat(currentObject.price)|| 0;
            return accumulator + price;
            },0);
  console.log(TotalAmount)
            setTotalAmount(TotalAmount);
          } catch (error) {
            console.error('Error fetching ticket history:', error);
          }
  };

        useFocusEffect(
          useCallback(() => {
            fetchTicketHistory(fromDate, toDate);
          }, [])
        );
 return(
 <SafeAreaView style = {styles.container}>
   <View style={styles.actions}>
     <View style = {styles.actionRow}>
      <TouchableOpacity style={styles.actionButton} onPress="">
        <Text style={styles.actionText}>Tickets</Text>
        <Text style={{color:"white",fontSize:25,fontWeight:"bold"}}>{ticketCount}</Text>
      </TouchableOpacity>
       <TouchableOpacity style={styles.actionButton} onPress="">
         <Text style={styles.actionText}>Transactions</Text>
         <Text style={{color:"white",fontSize:25,fontWeight:"bold"}}>value</Text>
       </TouchableOpacity>
     </View>
     <View style = {styles.actionRow}>
           <TouchableOpacity style={styles.actionButton} onPress="">
             <Text style={styles.actionText}>Number of Cars</Text>
             <Text style={{color:"white",fontSize:25,fontWeight:"bold"}}>{ticketCount}</Text>
           </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress="">
              <Text style={styles.actionText}>Total Amounts</Text>
              <Text style={{color:"white",fontSize:25,fontWeight:"bold"}}> GHC: {totalAmount}</Text>
            </TouchableOpacity>
          </View>
   </View>
   <TransactionList/>

   <TouchableOpacity style={styles.newPaymentButton} onPress={()=>navigation.navigate('carInput')}>
           <Text style={styles.newPaymentText}>Add New Ticket</Text>
         </TouchableOpacity>
 </SafeAreaView>
 )
}

const styles = StyleSheet.create({
container:{
flex:1,
backgroundColor:"#fff",
alignItems:"center"
},
actions: {
    padding: 10,
    backgroundColor:"#2328a0",
    width:"100%"
},
actionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
      height: 100,
},
actionButton: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#373dd1",
            padding: 16,
            borderRadius: 8,
            marginHorizontal: 4,
            height: '90%',
},
actionText: {
            color: "white",
            fontSize: 16,
            fontWeight:"200"
},
newPaymentButton: {
              backgroundColor: '#4B4ACF',
              padding: 15,
              borderRadius: 5,
              margin: 10,
              alignItems: 'center',
              width: '80%',
              height:50,
              justifyContent:"center"
},
newPaymentText: {
              color:"white",
              fontSize: 16,
              fontWeight: 'bold',
}
})

export default HomeScreen;