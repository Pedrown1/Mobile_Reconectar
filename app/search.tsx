import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Modal, FlatList, GestureResponderEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router'; 

interface Psychologist {
  id: string;
  name: string;
  rating: number;
  image: any; 
  approach: string;
  description: string;
}

const psychologists: Psychologist[] = [

  {
    id: '1',
    name: 'Dany Queiroz',
    rating: 5,
    image: require('../assets/images/danipsyco.png'),
    approach: 'Psicologa',
    description: 'Abordagem focada na identificação e mudança de padrões de pensamento disfuncionais.',
  },
  {
    id: '2',
    name: 'Natalia Silva',
    rating: 4.5,
    image: require('../assets/images/nathaliapsyco.png'),
    approach: 'Psicologa',
    description: 'Enfatiza a importância do autoentendimento e crescimento pessoal.',
  },
  {
    id: '3',
    name: 'Izadora Pena',
    rating: 4,
    image: require('../assets/images/LogoPrincipal.png'),
    approach: 'Fisioterapeuta',
    description: 'Analisa o impacto do Pilates no fortalecimento do core e na melhoria da postura e flexibilidade.',
  },
  {
    id: '4',
    name: 'Victor Hugo',
    rating: 4,
    image: require('../assets/images/LogoPrincipal.png'),
    approach: 'Fisioterapeuta',
    description: 'Analisa o impacto do Pilates no fortalecimento do core e na melhoria da postura e flexibilidade.',
  },
  {
    id: '5',
    name: 'Eliana Almeida',
    rating: 4,
    image: require('../assets/images/LogoPrincipal.png'),
    approach: 'Psicanálise',
    description: 'Explora a influência do inconsciente sobre o comportamento e os pensamentos.',
  },
 {
    id: '6',
    name: 'Flavia Oliveira',
    rating: 4,
    image: require('../assets/images/LogoPrincipal.png'),
    approach: 'Psicanálise',
    description: 'Explora a influência do inconsciente sobre o comportamento e os pensamentos.',
  }
];


const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  return (
    <View style={styles.ratingContainer}>
      {[...Array(fullStars)].map((_, index) => (
        <Ionicons key={`full-${index}`} name="star" size={16} color="#FFD700" />
      ))}
      {halfStar && <Ionicons name="star-half" size={16} color="#FFD700" />}
      {[...Array(5 - Math.ceil(rating))].map((_, index) => (
        <Ionicons key={`empty-${index}`} name="star-outline" size={16} color="#FFD700" />
      ))}
      <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
    </View>
  );
};

export default function Search() {
  const [selectedPsychologist, setSelectedPsychologist] = useState<Psychologist | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter(); 

  const handleOpenModal = (psychologist: Psychologist) => {
    setSelectedPsychologist(psychologist);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPsychologist(null);
  };

  const handleNavigateToAppointments = (psychologist: Psychologist) => {
    router.push({
      pathname: '/agendar',
      params: {
        psychologist: JSON.stringify(psychologist),
      },
    });
  };
  

  const renderPsychologistCard = ({ item }: { item: Psychologist }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardName}>{item.name}</Text>
        <RatingStars rating={item.rating} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOpenModal(item)}
        >
          <Text style={styles.buttonText}>Ver perfil</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => handleNavigateToAppointments(item)}
      >
        <Ionicons name="arrow-forward" size={24} color="#4d4d4d" style={styles.arrowIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={['rgba(222, 184, 135, 1)', 'rgba(162, 130, 89, 1)']}
      start={[0, 0.1]}
      end={[1, 0.9]}
      style={styles.gradient}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Encontre sua
          {'\n'}
          Profissional Favorita
        </Text>
        <Animatable.Image
          animation={"flipInY"}
          source={require('../assets/images/PsicologasOFC.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Nome da Profissional"
          placeholderTextColor="#888"
        />
        <Ionicons name="search" size={32} color="#4d4d4d" style={styles.searchIcon} />
      </View>

      <FlatList
        data={psychologists}
        renderItem={renderPsychologistCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardList}
        showsVerticalScrollIndicator={false} 
      />

      {selectedPsychologist && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Image
                source={selectedPsychologist.image}
                style={styles.modalImage}
              />
              <Text style={styles.modalName}>{selectedPsychologist.name}</Text>
              <Text style={styles.modalApproach}>{selectedPsychologist.approach}</Text>
              <Text style={styles.modalDescription}>{selectedPsychologist.description}</Text>
              <View style={styles.btnModal}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.modalButtonText}>Fechar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalButton2}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.modalButtonText2}>Sair da Conta</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerImage: {
    width: 80,
    height: 80,
  },
  searchIcon: {
    marginRight: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 35,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    letterSpacing: 0.5,
  },
  cardList: {
    marginTop: 20,
    borderRadius: 25,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20, 
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 30,
  },
  cardContent: {
    flex: 1,
    marginLeft: 15,
    paddingRight: 20, 
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#4d4d4d"
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  ratingText: {
    fontSize: 16,
    color: '#d3d3d3',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#d3d3d3',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    borderWidth: 0.5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    elevation: 4, 
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  arrowIcon:{
    marginRight: 10
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 6, 
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  modalName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalApproach: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center'
  },
  modalButton: {
    backgroundColor: '#d3d3d3',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButton2:{
    backgroundColor: "red",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#000',
  },
  modalButtonText2:{
    fontSize: 16,
    color: '#FFF',
  },
  btnModal:{
    flexDirection: "row",
    gap: 10
  }
});
