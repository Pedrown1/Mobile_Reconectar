import { LinearGradient } from "expo-linear-gradient";
import { Link } from 'expo-router';
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function Welcome() {
  return (
    <LinearGradient
      colors={['rgba(222, 184, 135, 1)', 'rgba(162, 130, 89, 1)']}
      start={[0, 0.1]}
      end={[1, 0.9]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Animatable.Image
            animation={"flipInY"}
            source={require('../assets/images/LogoPrincipal.png')}
            style={{ width: 300, height: 300 }}
            resizeMode="contain"
          />
        </View>

        <Animatable.View delay={600} animation={"fadeInUp"} style={styles.containerForm}>
          <Text style={styles.title}>Realize seu agendamento de maneira eficaz</Text>
          <Text style={styles.text}>Faça o login para começar!</Text>
          
          <Link href="/perfil" /*signUp*/ asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </Link>
          
          <Text style={styles.signInText}>
            Já possui conta? 
            <Link href="/signIn" asChild>
              <Text style={styles.linkText}> Clique Aqui!</Text>
            </Link>
          </Text>
        </Animatable.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLogo: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerForm: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginTop: 28
  },
  text: {
    fontSize: 16,
    color: '#a1a1a1',
    marginTop: 15
  },
  button: {
    backgroundColor: '#A28259',
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: "bold"
  },
  signInText: {
    color: '#a1a1a1',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#a1a1a1',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
