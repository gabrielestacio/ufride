import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MOCKED_RIDES } from '../mocks/mockData';

const PRIMARY_COLOR = '#0922C1';
const BACKGROUND_COLOR = '#FFFFFF';

export default function RideDetailsScreen() {
    const params = useLocalSearchParams();
    const ride = MOCKED_RIDES.find(r => r.id === params.rideId) || MOCKED_RIDES[0];

    const handleRequestRide = () => {
        alert('Solicitação de carona enviada!');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Motorista</Text>
                    <Text style={styles.sectionContent}>{ride.driver}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preço</Text>
                    <Text style={styles.price}>R$ {ride.price}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Data / Hora</Text>
                    <Text style={styles.sectionContent}>{ride.date} às {ride.time}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Participantes</Text>
                    <View style={styles.participantsContainer}>
                        <View style={styles.participantCircle} />
                        <View style={styles.participantCircle} />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Local de Saída</Text>
                    <Text style={styles.sectionContent}>{ride.origin}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Local de Destino</Text>
                    <Text style={styles.sectionContent}>{ride.destination}</Text>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleRequestRide}>
                    <Text style={styles.buttonText}>Solicitar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: BACKGROUND_COLOR },
    section: { paddingHorizontal: 25, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    sectionTitle: { fontSize: 14, fontFamily: 'Poppins-Regular', color: '#A0A0A0', marginBottom: 5 },
    sectionContent: { fontSize: 18, fontFamily: 'Poppins-Regular' },
    price: { fontSize: 22, fontFamily: 'Poppins-Bold', color: '#000' },
    participantsContainer: { flexDirection: 'row', marginTop: 10 },
    participantCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0E0E0', marginRight: 10 },
    footer: { padding: 25, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
    button: { backgroundColor: PRIMARY_COLOR, paddingVertical: 18, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: BACKGROUND_COLOR, fontSize: 18, fontFamily: 'Poppins-Bold' },
});