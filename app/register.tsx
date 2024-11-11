import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../components/styles/registerStyle';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    const user = { name, email, password, logado: true };
    try {
      const storedUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
      storedUsers.push(user);
      await AsyncStorage.setItem('users', JSON.stringify(storedUsers));
      console.log('Usuário salvo com sucesso no AsyncStorage');
      router.push('/home');
    } catch (error) {
      console.error('Erro ao salvar o usuário:', error);
    }
  };


  const validateFields = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!validateEmail(email)) newErrors.email = 'Email inválido';
    if (password.length < 6) newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    if (password !== confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return name && validateEmail(email) && password.length >= 6 && password === confirmPassword;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Preencha as informações abaixo</Text>

      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="Nome"
        placeholderTextColor="#a9a9a9"
        autoCapitalize="words"
        value={name}
        onChangeText={(text) => {
          setName(text);
          setErrors({ ...errors, name: '' });
        }}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        placeholderTextColor="#a9a9a9"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrors({ ...errors, email: '' });
        }}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, errors.password && styles.inputError, styles.passwordInput]}
          placeholder="Senha"
          placeholderTextColor="#a9a9a9"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: '' });
          }}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? 'eye' : 'eye-off'}
            size={24}
            color="grey"
          />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, errors.confirmPassword && styles.inputError, styles.passwordInput]}
          placeholder="Confirme a Senha"
          placeholderTextColor="#a9a9a9"
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setErrors({ ...errors, confirmPassword: '' });
          }}
        />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
          <Ionicons
            name={confirmPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color="grey"
          />
        </TouchableOpacity>
      </View>
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

      <TouchableOpacity
        onPress={() => {
          if (validateFields()) handleRegister();
        }}
        style={[styles.registerButton, !isFormValid() && styles.disabledButton]}
        disabled={!isFormValid()}
      >
        <Text style={styles.registerButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Já tem uma conta?</Text>
        <TouchableOpacity onPress={router.back}>
          <Text style={styles.loginButton}>Faça login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
