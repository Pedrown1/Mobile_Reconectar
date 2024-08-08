import React from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';

export default function App() {
    return (
        <LinearGradient
            colors={['rgba(222, 184, 135, 1)', 'rgba(162, 130, 89, 1)']}
            start={[0, 0.1]}
            end={[1, 0.9]}
            style={styles.gradient}
        >
            <View style={styles.content}>
                {/* Coloque aqui o conteúdo principal */}
            </View>
            <View style={styles.footer}>
                <View style={styles.iconContainer}>
                    <Link href="/welcome" asChild>
                        <TouchableOpacity>
                            <Ionicons name="home" size={24} color="#fff" />
                        </TouchableOpacity>
                    </Link>
                    <Link href="/search" asChild>
                        <TouchableOpacity>
                            <Ionicons name="search" size={24} color="#fff" />
                        </TouchableOpacity>
                    </Link>
                </View>
                <View style={styles.highlightedIconContainer}>
                    <Link href="/agendar" asChild>
                        <TouchableOpacity>
                            <Ionicons name="calendar" size={24} color="#fff" />
                        </TouchableOpacity>
                    </Link>
                </View>
                <View style={styles.iconContainer}>
                    <Link href="/favoritos" asChild>
                        <TouchableOpacity>
                            <Ionicons name="heart" size={24} color="#fff" />
                        </TouchableOpacity>
                    </Link>
                    <Link href="/perfil" asChild>
                        <TouchableOpacity>
                            <Ionicons name="person" size={24} color="#fff" />
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        position: 'relative',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
        marginHorizontal: 30,
    },
    highlightedIconContainer: {
        backgroundColor: 'rgba(255, 165, 0, 1)',
        borderRadius: 35,
        padding: 20,
        position: 'absolute',
        top: -25,
        left: '50%',
        transform: [{ translateX: -30 }],
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
});
