import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import apiClient from '../api/axiosConfig'; // Importa nosso cliente de API

const PRIMARY_COLOR = '#0922C1';
const SECONDARY_COLOR = '#A0A0A0';
const BACKGROUND_COLOR = '#FFFFFF';

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        // Validação no frontend
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        try {
            // Chamada para a API de cadastro
            const response = await apiClient.post('/register', { name, email, password });
            Alert.alert('Sucesso!', response.data.message);
            router.replace('/'); // Volta para a tela de login após o sucesso
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || 'Não foi possível realizar o cadastro.';
            Alert.alert('Erro no Cadastro', message);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Cadastro</Text>
                
                <Text style={styles.label}>Nome</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />
                
                <Text style={styles.label}>Email Institucional</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                
                <Text style={styles.label}>Senha</Text>
                <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
                
                <Text style={styles.label}>Confirmação de senha</Text>
                <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Criar</Text>
                </TouchableOpacity>

                <Text style={styles.loginText}>
                    Já tem cadastro?{' '}
                    <Text style={styles.loginLink} onPress={() => router.replace('/')}>
                        Entrar
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: BACKGROUND_COLOR },
    container: { flex: 1, paddingHorizontal: 25, paddingTop: 20 },
    title: { fontSize: 32, fontFamily: 'Poppins-Bold', marginBottom: 30 },
    label: { fontSize: 14, fontFamily: 'Poppins-Regular', color: SECONDARY_COLOR, marginBottom: 8 },
    input: { height: 55, borderColor: '#E8E8E8', borderWidth: 1, borderRadius: 8, marginBottom: 20, paddingHorizontal: 15, fontSize: 16, fontFamily: 'Poppins-Regular', backgroundColor: '#F6F6F6' },
    button: { backgroundColor: PRIMARY_COLOR, paddingVertical: 18, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    buttonText: { color: BACKGROUND_COLOR, fontSize: 18, fontFamily: 'Poppins-Bold' },
    loginText: { marginTop: 30, fontSize: 14, fontFamily: 'Poppins-Regular', color: SECONDARY_COLOR, textAlign: 'center' },
    loginLink: { color: PRIMARY_COLOR, fontFamily: 'Poppins-Bold' },
});