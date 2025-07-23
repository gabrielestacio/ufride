import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import apiClient from '../../api/axiosConfig';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from 'dayjs'; // Importa a biblioteca de data

const PRIMARY_COLOR = '#0922C1';
const BACKGROUND_COLOR = '#FFFFFF';

export default function OfferRideStep3Screen() {
    const { origin, destination, userId } = useLocalSearchParams();
    const [date, setDate] = useState(new Date());
    const [price, setPrice] = useState('');
    const [seats, setSeats] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirmDate = (selectedDate) => {
      setDate(selectedDate);
      hideDatePicker();
    };


    const handleCreateRide = async () => {
        if (!price || !seats) {
            Alert.alert('Erro', 'Preencha o preço e os assentos.');
            return;
        }
        const rideData = { origin, destination, rideDate: date.toISOString(), price: parseFloat(price), seats: parseInt(seats, 10), userId: parseInt(userId, 10) };
        try {
            await apiClient.post('/rides', rideData);
            Alert.alert('Sucesso!', 'Sua carona foi cadastrada!');
            router.replace('/chooseRole');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível cadastrar a carona.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.header}>Detalhes Finais</Text>

                <Text style={styles.label}>Data e Hora</Text>
                <TouchableOpacity style={styles.input} onPress={showDatePicker}>
                    {/* Usamos o dayjs para formatar a data de forma bonita */}
                    <Text style={styles.inputText}>{dayjs(date).format('DD/MM/YYYY HH:mm')}</Text>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirmDate}
                    onCancel={hideDatePicker}
                    date={date}
                />
                
                <Text style={styles.label}>Preço (R$)</Text>
                <TextInput style={styles.input} placeholder="Ex: 30.00" value={price} onChangeText={setPrice} keyboardType="numeric" />
                
                <Text style={styles.label}>Assentos disponíveis</Text>
                <TextInput style={styles.input} placeholder="Ex: 3" value={seats} onChangeText={setSeats} keyboardType="numeric" />
                
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button} onPress={handleCreateRide}>
                        <Text style={styles.buttonText}>Confirmar e Criar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

// Os estilos permanecem os mesmos
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: BACKGROUND_COLOR },
    container: { flex: 1, padding: 20 },
    header: { fontSize: 22, fontFamily: 'Poppins-Bold', marginBottom: 30, textAlign: 'center' },
    label: { fontSize: 14, fontFamily: 'Poppins-Regular', color: '#A0A0A0', marginBottom: 8 },
    input: { height: 55, borderColor: '#E8E8E8', borderWidth: 1, borderRadius: 8, marginBottom: 20, paddingHorizontal: 15, justifyContent: 'center' },
    inputText: { fontSize: 16, fontFamily: 'Poppins-Regular' },
    footer: { marginTop: 'auto', paddingBottom: 20 },
    button: { backgroundColor: PRIMARY_COLOR, paddingVertical: 18, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: BACKGROUND_COLOR, fontSize: 18, fontFamily: 'Poppins-Bold' },
});