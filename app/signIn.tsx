import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Link } from 'expo-router';
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons'; 

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false); 

  return (
    <LinearGradient
      colors={['rgba(222, 184, 135, 1)', 'rgba(162, 130, 89, 1)']}
      start={[0, 0.1]}
      end={[1, 0.9]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
          <Text style={styles.message}>Bem-Vindo(a)</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
          <Text style={styles.title}>Email</Text>
          <TextInput
            placeholder="Digite seu email.."
            placeholderTextColor="#999"
            style={styles.input}
          />

          <Text style={styles.title}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Sua senha"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              style={[styles.input, styles.passwordInput]}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          <Link href="/search" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/signUp" asChild>
            <TouchableOpacity style={styles.buttonRegistrar}>
              <Text style={styles.registerText}>Não possui uma conta? Cadastra-se</Text>
            </TouchableOpacity>
          </Link>
        </Animatable.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%"
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF"
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%"
  },
  title: {
    fontSize: 20,
    marginTop: 28
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    color: "#666",
    letterSpacing: 0.5
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  passwordInput: {
    flex: 1, 
  },
  button: {
    backgroundColor: '#A28259',
    width: "100%",
    borderRadius: 20,
    paddingVertical: 13,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold"
  },
  buttonRegistrar: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: "#a1a1a1"
  }
});
