import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';

interface Agendamento {
  id: string;
  nome: string;
  data: string;
  hora: string;
  psicologa: string;
}

const agendamentos: Agendamento[] = [
    { id: '1', nome: 'Lucas Almeida', data: '09/08/2024', hora: '10:00', psicologa: 'Dany Queiroz' },
    { id: '2', nome: 'Fernanda Costa', data: '10/08/2024', hora: '14:00', psicologa: 'Natalia Silva' },
    { id: '3', nome: 'Gabriel Souza', data: '11/08/2024', hora: '17:00', psicologa: 'Izadora Pena' },
    { id: '4', nome: 'Julia Lima', data: '11/08/2024', hora: '17:00', psicologa: 'Izadora Pena' },
    { id: '5', nome: 'Ricardo Barbosa', data: '11/08/2024', hora: '17:00', psicologa: 'Izadora Pena' },
    { id: '6', nome: 'Amanda Ribeiro', data: '11/08/2024', hora: '17:00', psicologa: 'Izadora Pena' },
    { id: '7', nome: 'Bruno Oliveira', data: '11/08/2024', hora: '17:00', psicologa: 'Izadora Pena' },
    { id: '8', nome: 'Carla Mendes', data: '11/08/2024', hora: '17:00', psicologa: 'Izadora Pena' },
    { id: '9', nome: 'Felipe Santos', data: '11/08/2024', hora: '17:00', psicologa: 'Izadora Pena' },
    { id: '10', nome: 'Mariana Silva', data: '11/08/2024', hora: '17:00', psicologa: 'Izadora Pena' },
    { id: '11', nome: 'Thiago Ferreira', data: '11/08/2024', hora: '17:00', psicologa: 'Izadora Pena' },
   
];

const ListAgendamentos: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
    if (searchVisible) setSearchText(''); 
  };

  const handleEdit = (id: string) => {
    console.log(`Editar item com id: ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Excluir item com id: ${id}`);
  };

  const handleNavigate = (screen: Href) => {
    setModalVisible(false);
    router.push(screen);
  };

  return (
    <LinearGradient
      colors={['rgba(222, 184, 135, 1)', 'rgba(162, 130, 89, 1)']}
      start={[0, 0.1]}
      end={[1, 0.9]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuIcon}>
            <Ionicons name="menu-outline" size={35} color="#fff" />
          </TouchableOpacity>

          <View style={[styles.inputContainer, searchVisible && styles.inputContainerExpanded]}>
            {searchVisible ? (
              <TextInput
                style={styles.textInput}
                placeholder="Pesquise"
                placeholderTextColor="#888"
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
                autoFocus
              />
            ) : null}
            <TouchableOpacity onPress={toggleSearch}>
              <Ionicons name="search" size={32} color="#4d4d4d" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerList}>
          <FlatList
            data={agendamentos}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={styles.itemContent}>
                  <View>
                    <Text style={styles.nome}>{item.nome}</Text>
                    <Text style={styles.info}>{item.data + '  -  ' + item.hora + ' Horas'}</Text>
                    <Text style={styles.info}>{'Profissional: ' + item.psicologa}</Text>
                  </View>
                  <View style={styles.icons}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => handleEdit(item.id)}>
                      <Ionicons name="pencil" size={24} color="#6C757D" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => handleDelete(item.id)}>
                      <Ionicons name="trash" size={24} color="#FF0000" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleNavigate('/perfil')}>
              <Text style={styles.modalButtonText}>Meu Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleNavigate('/search')}>
              <Text style={styles.modalButtonText}>Profissionais</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.modalButton} onPress={() => handleNavigate('/agendar')}>
              <Text style={styles.modalButtonText}>Realizar Agendamento</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={[styles.modalButton, styles.logoutButton]} onPress={() => console.log('Logout')}>
              <Text style={styles.modalButtonText}>Encerrar Sessão</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'center',
  },
  menuIcon: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(162, 130, 89, 1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 35,
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  inputContainerExpanded: {
    width: '70%', 
  },
  textInput: {
    fontSize: 16,
    color: '#000',
    letterSpacing: 0.5,
    flex: 1, 
    marginLeft: 10, 
  },
  containerList: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    height: 700,
  },
  item: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#d3d3d3', //#A28259 | #008000
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
  },
  info: {
    fontSize: 16,
    color: '#000',
  },
  icons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
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
  modalButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
    width: '100%',
  },
  modalButtonText: {
    fontSize: 18,
    color: 'rgba(162, 130, 89, 1)',
  },
  logoutButton: {
    backgroundColor: '#ffcccc',
    padding: 10,
    borderRadius: 25,
    marginTop: 10,
    alignItems: 'center',
  },
  modalCancelText: {
    color: 'rgba(162, 130, 89, 1)',
    fontSize: 16,
    padding: 18,
    textAlign: 'center',
  },
});

export default ListAgendamentos;
