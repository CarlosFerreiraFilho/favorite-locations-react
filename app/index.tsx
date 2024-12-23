import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../components/styles/loginStyle';
import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { CURRENT_USER, SELECT_USER_LOGGED, TB_USERS_NAME } from '@/Database/AppDatabase';
import UserBodyModel from '@/models//Users/UserBodyModel';

export default function LoginScreen() {
  const db = useSQLiteContext();
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

        const loggedInUser = await db.getFirstAsync<UserBodyModel>(SELECT_USER_LOGGED);

        // const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
        // console.log('Usuários armazenados:', users);

        // const loggedInUser = users.find(user => user.logado);

        if (loggedInUser) {
          CURRENT_USER.user_id = loggedInUser.id;
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
      //   const users = JSON.parse(await AsyncStorage.getItem('users')) || [];

      //   const user = users.find(user => user.email === email && user.password === password);

      const user = await db.getFirstAsync<UserBodyModel>(`SELECT * FROM ${TB_USERS_NAME} WHERE email = ? and password = ?`, email, password);

      if (user) {
        // const updatedUsers = users.map(u =>
        //   u.email === user.email ? { ...u, logado: true } : { ...u, logado: false }
        // );
        // await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

        CURRENT_USER.user_id = user.id;
        await db.runAsync(`UPDATE ${TB_USERS_NAME} SET logado = 1, updated_at = ? where id = ?`, Date(), user.id);

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
