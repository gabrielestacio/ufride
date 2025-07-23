import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

const Maps_API_KEY = 'AIzaSyA97GIi8Yt__GfhGo9n_hN94hTxCKh3T9k';

export default function OfferRideStep2Screen() {
    const { origin, userId } = useLocalSearchParams();
    const [input, setInput] = useState('');
    const [predictions, setPredictions] = useState([]);
    const timeoutRef = useRef(null);

    const fetchPlaces = async (text) => {
        if (text.length < 3) { setPredictions([]); return; }
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${Maps_API_KEY}&language=pt-BR&components=country:br`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            if (json.status === 'OK') { setPredictions(json.predictions); } 
            else { setPredictions([]); }
        } catch (e) { console.error("Fetch error:", e); }
    };

    useEffect(() => {
        if (timeoutRef.current) { clearTimeout(timeoutRef.current); }
        timeoutRef.current = setTimeout(() => { fetchPlaces(input); }, 500);
    }, [input]);

    const handleSelectLocation = (place) => {
        const destination = place.description;
        // Passa o bastão para a última tela com todos os dados
        router.push({ pathname: '/offerRide/step3', params: { origin, destination, userId } });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.header}>E o destino?</Text>
                <TextInput style={styles.input} placeholder="Digite o endereço de destino" value={input} onChangeText={setInput} />
                <FlatList
                    data={predictions}
                    keyExtractor={(item) => item.place_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.predictionItem} onPress={() => handleSelectLocation(item)}>
                            <Text style={styles.predictionText}>{item.description}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.listView}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
    container: { flex: 1, padding: 20, paddingTop: 10 },
    header: { fontSize: 22, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginBottom: 20, textAlign: 'center' },
    input: { height: 55, fontFamily: 'Poppins-Regular', borderColor: '#E8E8E8', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, fontSize: 16, backgroundColor: '#F6F6F6' },
    listView: { marginTop: 10 },
    predictionItem: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    predictionText: { fontSize: 16, fontFamily: 'Poppins-Regular' },
});