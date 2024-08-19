import React, { useState } from 'react';
import { Image, StyleSheet, View, TextInput, Text, TouchableOpacity, KeyboardTypeOptions, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';

export default function Perfil() {
    const [image, setImage] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) setImage(result.assets[0].uri);
    };

    const renderTextInput = (
        label: string, 
        placeholder: string, 
        keyboardType?: KeyboardTypeOptions
    ) => (
        <>
            <Text style={styles.textInput}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={"#cdcdcd"}
                keyboardType={keyboardType}
            />
        </>
    );

    const handleNavigate = (screen: Href<string | object>) => {
        setModalVisible(false);
        router.push(screen as Href<string | object>);
    };
    

    return (
        <LinearGradient colors={['#deb887', '#a28259']} start={[0, 0.1]} end={[1, 0.9]} style={styles.gradient}>
            <View style={styles.containerMain}>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuIcon}>
                    <Ionicons name="menu-outline" size={35} color="#fff" />
                </TouchableOpacity>
                <View style={styles.profileSection}>
                    <Image source={{ uri: image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }} style={styles.profileImage} />
                    <TouchableOpacity onPress={pickImage} style={styles.btnPickImage}>
                        <Text style={styles.txtBtnPickImage}>Escolher Imagem</Text>
                    </TouchableOpacity>
                </View>
                {renderTextInput('Nome Pessoal', 'Digite seu nome pessoal')}
                {renderTextInput('Usuário', 'Digite seu nome de usuário')}
                {renderTextInput('Email', 'Digite seu email', 'email-address' as KeyboardTypeOptions)}
                <Text style={styles.textInput}>Sobre</Text>
                <TextInput
                    style={styles.textLong}
                    multiline
                    numberOfLines={4}
                    placeholder="Escreva algo sobre você..."
                    placeholderTextColor="#cdcdcd"
                />
                    <TouchableOpacity 
                        style={styles.btnSalvar} 
                        onPress={() => {
                            Alert.alert(
                                "Sucesso", 
                                "Informações salvas com sucesso!", 
                                [
                                    {
                                        text: "OK", 
                                        onPress: () => router.push('/welcome')
                                    }
                                ]
                            );
                        }}
                    >
                        <Text style={styles.txtBtnSalvar}>Salvar</Text>
                    </TouchableOpacity>

            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.modalButton} onPress={() => handleNavigate('/search')}>
                            <Text style={styles.modalButtonText}>Profissionais</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => handleNavigate('/ListAgendamentos')}>
                            <Text style={styles.modalButtonText}>Meus Agendamentos</Text>
                        </TouchableOpacity>
                        <View style={styles.containerModalBtn}>
                            <TouchableOpacity style={[styles.modalButton, styles.logoutButton]} onPress={() => Alert.alert('Logout')}>
                                <Text style={styles.modalButtonText}>Encerrar Sessão</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalCancelText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: { flex: 1 },
    containerMain: {
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 20,
        marginVertical: 80,
        alignSelf: 'center',
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        position: 'relative',
    },
    menuIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
        padding: 10,
        borderRadius: 25,
        backgroundColor: 'rgba(162, 130, 89, 1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    profileSection: { alignItems: 'center', marginBottom: 20 },
    profileImage: { width: 150, height: 130, borderRadius: 75, marginBottom: 10 },
    btnPickImage: { backgroundColor: '#a28259', padding: 10, borderRadius: 20, marginTop: 10 },
    txtBtnPickImage: { color: '#fff', textAlign: 'center', fontSize: 16 },
    textInput: { marginVertical: 8, fontSize: 16 },
    input: {
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        fontSize: 16,
        marginBottom: 10,
    },
    textLong: {
        height: 100,
        borderColor: '#000',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        textAlignVertical: 'top',
        marginTop: 10,
    },
    btnSalvar: {
        marginTop: 40,
        backgroundColor: '#a28259',
        padding: 15,
        borderRadius: 25,
        alignSelf: 'center',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    txtBtnSalvar: { color: '#fff', textAlign: 'center', fontSize: 18 },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        alignItems: 'center',
    },
    containerModalBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalButton: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        alignItems: 'center',
    },
    modalButtonText: {
        fontSize: 18,
        color: 'rgba(162, 130, 89, 1)',
    },
    logoutButton: {
        backgroundColor: '#ffcccc',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
        alignItems: 'center',
        padding: 10,
        borderRadius: 25,
        fontSize: 18,
    },
    modalCancelText: {
        color: 'rgba(162, 130, 89, 1)',
        fontSize: 16,
        padding: 18,
    },
});
