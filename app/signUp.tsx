import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons'; 
import { Link } from "expo-router";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <LinearGradient
      colors={['rgba(222, 184, 135, 1)', 'rgba(162, 130, 89, 1)']}
      start={[0, 0.1]}
      end={[1, 0.9]}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
              <View style={styles.headerContent}>
                <Text style={styles.message}>Realize seu Cadastro</Text>
                <Image
                  style={styles.image}
                  source={require('../assets/images/LogoPrincipal.png')}
                />
              </View>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
              
            <Text style={styles.title}>Digite seu Nome</Text>
              <TextInput
                placeholder="Digite seu Nome"
                placeholderTextColor="#999"
                style={styles.input}
              />

              
              <Text style={styles.title}>Digite seu Usuário</Text>
              <TextInput
                placeholder="Digite seu nome de Usuário"
                placeholderTextColor="#999"
                style={styles.input}
              />

              <Text style={styles.title}>Email</Text>
              <TextInput
                placeholder="Cadastre seu Email"
                placeholderTextColor="#999"
                style={styles.input}
              />

              <Text style={styles.title}>Senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Sua Senha"
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

              <Text style={styles.title}>Confirme sua Senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Digite sua senha novamente.."
                  placeholderTextColor="#999"
                  secureTextEntry={!showConfirmPassword}
                  style={[styles.input, styles.passwordInput]}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>

              <Link href="/signIn" asChild>
                <TouchableOpacity style={styles.buttonLogin}>
                  <Text style={styles.registerText}>Já tem uma conta? Faça login.</Text>
                </TouchableOpacity>
              </Link>
            </Animatable.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    marginTop: "18%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginRight: 30,
  },
  image: {
    width: 70,
    height: 70,
  },
  containerForm: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    color: "#666",
    letterSpacing: 0.5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    bottom: 25
  },
  passwordInput: {
    flex: 1,
  },
  info: {
    color: "#A1A1A1",
    fontSize: 13,
  },
  button: {
    backgroundColor: '#A28259',
    width: "100%",
    borderRadius: 20,
    paddingVertical: 13,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonLogin: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: "#a1a1a1",
  },
});
