import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useRouter } from "expo-router";

export default function Loading() {
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setScale(1); 
      setTimeout(() => {
        router.push('/welcome');
      }, 1000); 
    }, 200);

    return () => clearTimeout(timer);
  }, [router]);

  const scaleAnimation = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(scale, { duration: 500 }) }],
  }));
  

  return (
    <LinearGradient
      colors={['rgba(222, 184, 135, 1)', 'rgba(162, 130, 89, 1)']}
      start={[0, 0.1]}
      end={[1, 0.9]}
      style={styles.body}
    >
      <Animated.View style={[styles.content, scaleAnimation]}>
        <Image
          style={styles.image}
          source={require('../assets/images/LogoPrincipal.png')}
        />
        <Text style={styles.title}>Espaço Reconectar</Text>
      </Animated.View>  
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    resizeMode: "contain",
    width: 250,
    height: 250
  },
  title: {
    fontSize: 32,
    fontStyle: "italic",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 15,
    color: "#FFF"
  },
  loading: {
    marginTop: 80
  },
});
