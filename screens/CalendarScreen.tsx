import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface CalendarEvent {
  title: string;
  time: string;
  color: string;
  icon: any;
}

const CalendarScreen = () => {
  const { isDark, colors } = useTheme();
  const [selected, setSelected] = useState('2026-05-20');

  const eventsByDate: Record<string, CalendarEvent[]> = {
    '2026-05-20': [
      { title: 'COMP 314 - OS Lecture', time: '08:40 AM', color: '#FF6B6B', icon: 'hardware-chip-outline' as any },
      { title: 'COMP 305 - DB Systems', time: '10:30 AM', color: '#4ECDC4', icon: 'server-outline' as any },
    ],
    '2026-05-22': [
      { title: 'COMP 314 Assignment Due', time: '11:59 PM', color: '#FF6B6B', icon: 'document-text-outline' as any },
      { title: 'Study Group', time: '4:00 PM', color: '#34C759', icon: 'people-outline' as any },
    ],
    '2026-05-25': [
      { title: 'PSYC 201 Quiz', time: '9:00 AM', color: '#BF5AF2', icon: 'school-outline' as any },
      { title: 'MATH 301 Tutorial', time: '11:25 AM', color: '#0A84FF', icon: 'calculator-outline' as any },
    ],
    '2026-05-28': [
      { title: 'COMP 305 Project Due', time: '5:00 PM', color: '#4ECDC4', icon: 'folder-outline' as any },
    ],
  };

  const marked: any = {};
  Object.keys(eventsByDate).forEach(d => { 
    marked[d] = { marked: true, dotColor: eventsByDate[d][0].color }; 
  });
  marked[selected] = { ...marked[selected], selected: true, selectedColor: isDark ? '#0A84FF' : '#007AFF' };

  const todayEvents = eventsByDate[selected] || [];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.header, {color: colors.text}]}>Calendar</Text>
        
        <View style={styles.calendarWrapper}>
          <Calendar
            current={selected}
            onDayPress={d => setSelected(d.dateString)}
            markedDates={marked}
            style={styles.calendar}
            theme={{
              backgroundColor: isDark ? '#1C1C1E' : '#ffffff',
              calendarBackground: isDark ? '#1C1C1E' : '#ffffff',
              selectedDayBackgroundColor: isDark ? '#0A84FF' : '#007AFF',
              selectedDayTextColor: '#ffffff',
              todayTextColor: isDark ? '#0A84FF' : '#007AFF',
              arrowColor: isDark ? '#0A84FF' : '#007AFF',
              monthTextColor: isDark ? '#ffffff' : '#000000',
              dayTextColor: isDark ? '#ffffff' : '#2d4150',
              textDisabledColor: isDark ? '#48484A' : '#d9e1e8',
              textMonthFontWeight: '700',
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textSectionTitleColor: isDark ? '#98989D' : '#b6c1cd',
            }}
          />
        </View>

        <View style={styles.agenda}>
          <Text style={[styles.agendaTitle, {color: colors.text}]}>
            {selected === '2026-05-20' ? "Today's Schedule" : selected}
          </Text>
          {todayEvents.length > 0 ? todayEvents.map((e, i) => (
            <View key={i} style={[styles.eventCard, {backgroundColor: colors.card}]}>
              <View style={[styles.eventIcon, {backgroundColor: e.color}]}>
                <Ionicons name={e.icon} size={20} color="white" />
              </View>
              <View style={{flex:1, marginLeft:12}}>
                <Text style={[styles.eventTitle, {color: colors.text}]}>{e.title}</Text>
                <Text style={[styles.eventTime, {color: colors.textSecondary}]}>{e.time}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
            </View>
          )) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={60} color={isDark ? '#48484A' : '#E5E5EA'} />
              <Text style={[styles.emptyText, {color: isDark ? '#98989D' : '#C7C7CC'}]}>No academic events</Text>
              <Text style={[styles.emptySub, {color: colors.textSecondary}]}>Enjoy your free day!</Text>
            </View>
          )}
        </View>
        <View style={{height:100}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex:1},
  header: {fontSize:34, fontWeight:'800', padding:20, paddingTop:20, letterSpacing:-0.5},
  calendarWrapper: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  calendar: {
    borderRadius: 20,
  },
  agenda: {padding:20},
  agendaTitle: {fontSize:22, fontWeight:'700', marginBottom:15},
  eventCard: {flexDirection:'row', alignItems:'center', borderRadius:16, padding:14, marginBottom:10, shadowColor:'#000', shadowOffset:{width:0,height:1}, shadowOpacity:0.04, shadowRadius:6, elevation:2},
  eventIcon: {width:42, height:42, borderRadius:12, justifyContent:'center', alignItems:'center'},
  eventTitle: {fontSize:15, fontWeight:'600'},
  eventTime: {fontSize:13, marginTop:3},
  emptyState: {alignItems:'center', paddingVertical:40},
  emptyText: {fontSize:18, fontWeight:'600', marginTop:12},
  emptySub: {fontSize:14, marginTop:4},
});

export default CalendarScreen;