import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../components/styles/loginStyle';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  console.log(navigation)

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      setLoading(true);
      try {
        const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
        console.log('Usuários armazenados:', users);

        const loggedInUser = users.find(user => user.logado);

        if (loggedInUser) {
          router.push('/(private)/(tabs)/home');
        }
      } catch (error) {
        console.error('Erro ao verificar usuário logado:', error);
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, [navigation]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const users = JSON.parse(await AsyncStorage.getItem('users')) || [];

      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        const updatedUsers = users.map(u =>
          u.email === user.email ? { ...u, logado: true } : { ...u, logado: false }
        );
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

        console.log('Login bem-sucedido');
        router.push('/(private)/(tabs)/home');
      } else {
        console.error('Email ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => {
    router.push('/register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#a9a9a9"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        accessibilityLabel="Email"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Senha"
          placeholderTextColor="#a9a9a9"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          accessibilityLabel="Senha"
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} accessible={true} accessibilityLabel="Mostrar senha">
          <Icon
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="#a9a9a9"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton} disabled={loading}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Novo por aqui?</Text>
        <TouchableOpacity onPress={goToRegister}>
          <Text style={styles.registerButton}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
