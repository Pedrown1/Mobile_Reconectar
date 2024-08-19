import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Alert, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams, Href } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { format, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Agendamentos() {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  const { psychologist } = useLocalSearchParams<{ psychologist: string }>();
  const psychologistData = psychologist ? JSON.parse(psychologist) : null;

  const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const handleConfirm = () => {
    if (!selectedDate || !time) {
      Alert.alert('Dados Incompletos', 'Por favor, selecione a data e a hora.');
      return;
    }

    Alert.alert(
      'Agendamento Confirmado!',
      `Psicóloga: ${psychologistData?.name}\nData: ${selectedDate}\nHora: ${time}`,
      [{ text: 'OK', onPress: () => router.push('/ListAgendamentos') }]
    );
  };

  LocaleConfig.locales['ptBR'] = {
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: [
      'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
      'Quinta-feira', 'Sexta-feira', 'Sábado'
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    today: 'Hoje'
  };

  LocaleConfig.defaultLocale = 'ptBR';

  const currentDate = new Date();
  const minDate = format(startOfDay(currentDate), 'yyyy-MM-dd');

  const handleNavigate = (screen: Href<string | object>) => {
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
      <View style={styles.topContainer}>
        {/* Ícone de Menu (três linhas horizontais) */}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuIcon}>
          <Ionicons name="menu-outline" size={35} color="#fff" />
        </TouchableOpacity>

        <Animatable.Image
          animation="flipInY"
          source={require('../assets/images/CalendarioOFC.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          minDate={minDate}
          onDayPress={(day: { dateString: React.SetStateAction<string>; }) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
          }}
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: 'rgba(162, 130, 89, 1)',
            selectedDayTextColor: '#ffffff',
            todayTextColor: 'rgba(162, 130, 89, 1)',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            arrowColor: 'rgba(162, 130, 89, 1)',
            monthTextColor: 'rgba(162, 130, 89, 1)',
            indicatorColor: 'rgba(162, 130, 89, 1)',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
        />
      </View>

      <View style={styles.timePickerContainer}>
        <Text style={styles.timePickerTitle}>Selecione a Hora</Text>
        <FlatList
          data={times}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.timeItem,
                time === item && styles.selectedTimeItem
              ]}
              onPress={() => setTime(item)}
            >
              <Text style={[
                styles.timeText,
                time === item && styles.selectedTimeText
              ]}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
        />
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

      <View style={styles.psychologistInfoContainer}>
        <Image
          source={{ uri: psychologistData?.photoUrl }}
          style={styles.psychologistPhoto}
          resizeMode='cover'
        />
        <Text style={styles.psychologistName}>{psychologistData?.name}</Text>
        <TouchableOpacity style={styles.changeButton} onPress={() => router.push('/search')}>
          <Text style={styles.changeButtonText}>Alterar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingTop: 30
  },
  topContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  menuIcon: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(162, 130, 89, 1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5
  },
  headerImage: {
    width: 110,
    height: 110
  },
  calendarContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    padding: 10
  },
  timePickerContainer: {
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 10,
    maxHeight: 173
  },
  timePickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'rgba(162, 130, 89, 1)'
  },
  timeItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  selectedTimeItem: {
    backgroundColor: 'rgba(162, 130, 89, 0.3)'
  },
  timeText: {
    fontSize: 16
  },
  selectedTimeText: {
    color: 'rgba(162, 130, 89, 1)',
    fontWeight: 'bold'
  },
  psychologistInfoContainer: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "space-around"
  },
  psychologistPhoto: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  psychologistName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  changeButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20
  },
  changeButtonText: {
    fontSize: 16,
    color: 'rgba(162, 130, 89, 1)',
    fontWeight: 'bold'
  },
  button: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(162, 130, 89, 1)',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    alignItems: 'center'
  },
  containerModalBtn:{
    flexDirection: "row",
    alignItems: "center"
  },
  modalButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center'
  },
  modalButtonText: {
    fontSize: 18,
    color: 'rgba(162, 130, 89, 1)'
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
    fontSize: 18
  },
  modalCancelText: {
    color: 'rgba(162, 130, 89, 1)',
    fontSize: 16,
    padding: 18
    
  }
});
