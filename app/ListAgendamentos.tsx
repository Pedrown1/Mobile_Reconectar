import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface Agendamento {
  id: string;
  nome: string;
  data: string;
  hora: string;
}

const agendamentos: Agendamento[] = [
  { id: '1', nome: 'João da Silva', data: '2024-08-09', hora: '10:00' },
  { id: '2', nome: 'Maria Oliveira', data: '2024-08-10', hora: '14:00' },
  { id: '3', nome: 'Pedro Henrique', data: '2024-08-11', hora: '17:00' },
];

const ListAgendamentos: React.FC = () => {
  const renderItem = ({ item }: { item: Agendamento }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.info}>{item.data}</Text>
      <Text style={styles.info}>{item.hora}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={['rgba(222, 184, 135, 1)', 'rgba(162, 130, 89, 1)']}
      start={[0, 0.1]}
      end={[1, 0.9]}
      style={styles.gradient}
    >
      <View>
        <FlatList
          data={agendamentos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  item: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  info: {
    fontSize: 16,
    color: '#555',
  },
});

export default ListAgendamentos;
