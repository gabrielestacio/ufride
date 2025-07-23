import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import apiClient from '../api/axiosConfig';

const PRIMARY_COLOR = '#0922C1';
const SECONDARY_COLOR = '#A0A0A0';
const BACKGROUND_COLOR = '#FFFFFF';

export default function LoginScreen() {
    const [email, setEmail] = useState('user@ufride.com');
    const [password, setPassword] = useState('123');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        try {
            const response = await apiClient.post('/login', { email, password });
            Alert.alert('Sucesso', 'Login realizado com sucesso!');
            router.push({ pathname: '/chooseRole', params: { userId: response.data.userId } });
        } catch (error) {
            const message = error.response?.data?.message || 'Erro ao tentar fazer login.';
            Alert.alert('Erro no Login', message);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Bem-vindo de volta!</Text>
                    <Text style={styles.subtitle}>Login para continuar</Text>

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <Text style={styles.forgotPassword}>Esqueci minha senha</Text>

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>

                    <Text style={styles.signupText}>
                        Não tem uma conta?{' '}
                        <Text style={styles.signupLink} onPress={() => router.push('/register')}>
                            Cadastre-se
                        </Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        paddingHorizontal: 25,
    },
    title: {
        fontSize: 32,
        fontFamily: 'Poppins-Bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: PRIMARY_COLOR,
        marginBottom: 40,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: SECONDARY_COLOR,
        marginBottom: 8,
    },
    input: {
        height: 55,
        borderColor: '#E8E8E8',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        backgroundColor: '#F6F6F6',
    },
    forgotPassword: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: SECONDARY_COLOR,
        textAlign: 'right',
        marginBottom: 30,
    },
    button: {
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 18,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: BACKGROUND_COLOR,
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
    },
    signupText: {
        marginTop: 40,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: SECONDARY_COLOR,
        textAlign: 'center',
    },
    signupLink: {
        color: PRIMARY_COLOR,
        fontFamily: 'Poppins-Bold',
    },
});