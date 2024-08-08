import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { format, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

export default function Agendamentos() {
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
      [
        { text: 'OK', onPress: () => router.push('/ListAgendamentos') }
      ]
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
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje'
  };

  LocaleConfig.defaultLocale = 'ptBR';

  const currentDate = new Date();
  const minDate = format(startOfDay(currentDate), 'yyyy-MM-dd');

  return (
    <LinearGradient
      colors={['rgba(222, 184, 135, 1)', 'rgba(162, 130, 89, 1)']}
      start={[0, 0.1]}
      end={[1, 0.9]}
      style={styles.gradient}
    >
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => router.push('/search')} style={styles.btnHeader}>
          <Ionicons name="arrow-back" size={25} color="#ffffff" />
          <Text style={styles.textVoltar}>Voltar</Text>
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
  btnHeader:{
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
    borderRadius: 25,
    borderColor: "#A28259",
    backgroundColor: "#B89B6A",
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 6, 
    elevation: 5, 
  },
  textVoltar:{
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15
  },
  topContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  title: {
    fontSize: 24,
    fontStyle: 'italic',
  },
  headerImage: {
    width: 110,
    height: 110,
  },
  calendarContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    padding: 10,
  },
  timePickerContainer: {
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 10,
    maxHeight: 173,
  },
  timePickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'rgba(162, 130, 89, 1)'
  },
  timeItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedTimeItem: {
    backgroundColor: 'rgba(162, 130, 89, 0.2)',
  },
  timeText: {
    fontSize: 16,
  },
  selectedTimeText: {
    color: 'rgba(162, 130, 89, 1)',
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingVertical: 17,
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  psychologistInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    width: "90%",
    alignSelf: "center",
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    backgroundColor: 'rgba(162, 130, 89, 1)'
  },
  psychologistPhoto: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginRight: 10,
  },
  psychologistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"#FFF",
    fontStyle: "italic",
    flex: 1,
  },
  changeButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  changeButtonText: {
    color: 'rgba(162, 130, 89, 1)',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
