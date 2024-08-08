import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(222, 184, 135, 1)', 'rgba(162, 130, 89, 1)']}
        start={[0, 0.1]}
        end={[1, 0.9]}
        style={styles.body}
      >
        <View style={styles.navBar}>
          <View>
            <Link href="/mainTab" asChild>
              <TouchableOpacity>
                <Image
                  style={styles.image}
                  source={require('../assets/images/LogoPrincipal.png')}
                />
              </TouchableOpacity>
            </Link>
          </View>
          
          <View style={styles.navegation}>
            <TouchableOpacity onPress={handlePress}>
              <View style={styles.iconContainers}>
                <Ionicons name="menu" size={32} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollView}>
        
        </ScrollView>

        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={handleClose}
        >
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalItem} onPress={() => alert("Sobre")}>Sobre</Text>
                <Text style={styles.modalItem} onPress={() => alert("Psicologas")}>Psicólogas</Text>
                <Text style={styles.modalItem} onPress={() => alert("Contato")}>Contato</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

      

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
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    paddingBottom: 80 // Space for footer
  },
  navBar: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  image: {
    width: 100,
    height: 100
  },
  navegation: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconContainers: {
    padding: 8,
    borderRadius: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: "#A28259"
  },
  modalItem: {
    fontSize: 18,
    marginVertical: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)', 
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 5, 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center'
  }
});
