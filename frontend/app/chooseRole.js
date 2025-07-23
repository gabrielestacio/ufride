import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router'; // Importa o useLocalSearchParams

export default function ChooseRoleScreen() {
    const { userId } = useLocalSearchParams(); // Pega o userId que veio da tela de Login

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Que tal uma carona?</Text>
                <Image
                    source={require('../assets/car_isometric.png')}
                    style={styles.carImage}
                    resizeMode="contain"
                />
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.roleButton} onPress={() => router.push('/findRide')}>
                        <Text style={styles.roleText}>Passageiro</Text>
                    </TouchableOpacity>
                    {/* AQUI ESTÁ A MUDANÇA: passamos o userId para a próxima tela */}
                    <TouchableOpacity style={styles.roleButton} onPress={() => router.push({ pathname: '/offerRide/step1', params: { userId } })}>
                        <Text style={styles.roleText}>Motorista</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#EFEFEF' },
    container: { flex: 1, justifyContent: 'space-around', alignItems: 'center', padding: 20 },
    title: { fontFamily: 'Poppins-Bold', fontSize: 24, textAlign: 'center', color: '#333' },
    carImage: { width: '90%', height: 200 },
    modalView: { backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, width: '100%' },
    roleButton: { width: '100%', padding: 20, marginVertical: 10, borderWidth: 1, borderColor: '#DDD', borderRadius: 10 },
    roleText: { fontFamily: 'Poppins-Bold', fontSize: 18, textAlign: 'center' },
});