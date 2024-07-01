import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, SafeAreaView, TextInput, TouchableOpacity, Alert, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_KEY } from '@env';

const NewTicket = () => {
  const ApiKey = API_KEY;
  const [selectedService, setSelectedService] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedCarType, setSelectedCarType] = useState('');
  const [selectedCarTypeId, setSelectedCarTypeId] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [services, setServices] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const [carTypeModalVisible, setCarTypeModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://shaboshabo.wigal.com.gh/api/services', {
          headers: {
            'X-API-KEY': ApiKey
          }
        });
        console.log("The services-response",response)
        if (response.data.statuscode === "00") {
          setServices(response.data.data);
          console.log("The services",services)
        } else {
          Alert.alert('Error', 'Failed to fetch services');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while fetching services');
      } finally {
        setLoading(false);
      }
    };

    const fetchCarTypes = async () => {
      try {
        const response = await axios.get('https://shaboshabo.wigal.com.gh/api/serviceitems', {
          headers: {
            'X-API-KEY': ApiKey
          }
        });
        console.log("The serviceItems-response",response)
        if (response.data.statuscode === "00") {
          setCarTypes(response.data.data);
          console.log("The Cars", carTypes)
        } else {
          Alert.alert('Error', 'Failed to fetch car types');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while fetching car types');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
    fetchCarTypes();
  }, []);

  const getCurrentTime = () => {
    return new Date().toLocaleString();
  };

  const handleTicket = async () => {
    const startTime = getCurrentTime();
    try {
      const response = await axios.post('https://shaboshabo.wigal.com.gh/api/price', {
        itemid: selectedCarTypeId,
        servicetypeid: selectedServiceId
      }, {
        headers: {
          'X-API-KEY': ApiKey
        }
      });
      console.log("The Price Response",response);

      if (response.data.statuscode === "00") {
        const price = response.data.Price;
        console.log(price)

        const ticket = {
          startTime,
          carNumber,
          selectedService,
          selectedServiceId,
          selectedCarType,
          selectedCarTypeId,
          price
        };

        navigation.navigate('GenerateTicket', { ticket });
      } else {
        Alert.alert('Error', 'Failed to fetch price');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching price', [
        { text: 'Retry', onPress: handleTicket },
        { text: 'Cancel', style: 'cancel' }
      ]);
    }
  };

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setSelectedService(item.service);
        setSelectedServiceId(item.id);
        setServiceModalVisible(false);
      }}
    >
      <Text style={styles.modalItemText}>{item.service}</Text>
    </TouchableOpacity>
  );

  const renderCarTypeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setSelectedCarType(item.item_name);
        setSelectedCarTypeId(item.id);
        setCarTypeModalVisible(false);
      }}
    >
      <Text style={styles.modalItemText}>{item.item_name}</Text>
    </TouchableOpacity>
  );

  const keyExtractor = (item) => item?.id?.toString() || '';

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={{ marginTop: "7%" }}>Car Number</Text>
        <TextInput placeholder="Enter Car Number" onChangeText={(text) => setCarNumber(text)} style={styles.TextInput} />
      </View>
      <View style={styles.inputGroup}>
        <Text>Service Type</Text>
        <TouchableOpacity style={styles.selector} onPress={() => setServiceModalVisible(true)}>
          <Text style={styles.selectorText}>{selectedService || 'Select Service'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputGroup}>
        <Text>Service Item</Text>
        <TouchableOpacity style={styles.selector} onPress={() => setCarTypeModalVisible(true)}>
          <Text style={styles.selectorText}>{selectedCarType || 'Select Service Item'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.Btn} onPress={handleTicket}>
        <Text style={{ color: 'white' }}>Next</Text>
      </TouchableOpacity>

      <Modal visible={serviceModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Select Service</Text>
          <FlatList
            data={services}
            renderItem={renderServiceItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.modalList}
          />
          <TouchableOpacity style={styles.modalCloseButton} onPress={() => setServiceModalVisible(false)}>
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={carTypeModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Select Car Type</Text>
          <FlatList
            data={carTypes}
            renderItem={renderCarTypeItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.modalList}
          />
          <TouchableOpacity style={styles.modalCloseButton} onPress={() => setCarTypeModalVisible(false)}>
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTxt: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'left',
    marginTop: 15,
    marginLeft: '4%',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    height: '13%',
    justifyContent: 'space-between',
    width: '93%',
    alignSelf: 'center',
    marginTop: '5%',
  },
  TextInput: {
    borderWidth: 1,
    borderColor: '#c0c0c0',
    borderRadius: 5,
    height: '50%',
    paddingHorizontal: 10,
  },
  selector: {
    borderWidth: 1,
    borderColor: '#c0c0c0',
    borderRadius: 5,
    height: '50%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  selectorText: {
    color: '#000',
  },
  Btn: {
    width: '95%',
    height: 60,
    backgroundColor: '#2328a0',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '45%',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalList: {
    width: '100%',
    paddingHorizontal: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2328a0',
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default NewTicket;
