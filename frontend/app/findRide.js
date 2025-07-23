import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import apiClient from '../api/axiosConfig';

const PRIMARY_COLOR = '#0922C1';

const RideCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: '/rideDetails', params: { rideId: item.id } })}>
        <View>
            <Text style={styles.cardLabel}>Origem:</Text>
            <Text style={styles.cardText} numberOfLines={1}>{item.origin}</Text>
        </View>
        <View style={{ marginVertical: 8 }}>
            <Text style={styles.cardLabel}>Destino:</Text>
            <Text style={styles.cardText} numberOfLines={1}>{item.destination}</Text>
        </View>
        <View style={styles.cardFooter}>
            <Text style={styles.cardPrice}>R$ {parseFloat(item.price).toFixed(2)}</Text>
            
            <Text style={styles.cardInfo}>{new Date(item.ride_date).toLocaleDateString('pt-BR')}</Text>
            <Text style={styles.cardInfo}>{item.seats} assentos</Text>
        </View>
    </TouchableOpacity>
);

export default function FindRideScreen() {
    const [rides, setRides] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRides = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get('/rides');
            setRides(response.data);
        } catch (error) {
            console.error("Erro ao buscar caronas:", error);
            Alert.alert("Erro", "Não foi possível carregar as caronas.");
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchRides();
        }, [])
    );

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                <Text>Buscando caronas...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={rides}
                renderItem={({ item }) => <RideCard item={item} />}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.list}
                ListEmptyComponent={() => (
                    <View style={styles.centerContainer}>
                        <Text style={styles.emptyText}>Nenhuma carona encontrada no momento.</Text>
                    </View>
                )}
                onRefresh={fetchRides}
                refreshing={isLoading}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F6F6F6' },
    list: { padding: 15 },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 },
    emptyText: { fontFamily: 'Poppins-Regular', fontSize: 16, color: '#A0A0A0' },
    card: { backgroundColor: 'white', padding: 20, borderRadius: 10, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
    cardLabel: { fontSize: 12, color: '#A0A0A0', fontFamily: 'Poppins-Regular' },
    cardText: { fontSize: 16, fontFamily: 'Poppins-Regular' },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 10 },
    cardPrice: { fontSize: 16, fontFamily: 'Poppins-Bold', color: PRIMARY_COLOR },
    cardInfo: { fontSize: 14, fontFamily: 'Poppins-Regular', color: '#333' },
});