import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const DashboardScreen = () => {
  const { colors } = useTheme();

  const todayClasses = [
    { id: 1, subject: 'COMP 313 - Operating Systems', time: '08:40 - 10:20', room: 'Geo-L1', color: '#FF6B6B', icon: 'hardware-chip-outline' as any },
    { id: 2, subject: 'COMP 315 - Advance Programming', time: '10:30 - 12:10', room: 'MSB F8', color: '#4ECDC4', icon: 'server-outline' as any },
    { id: 3, subject: 'IST3ND - Networking and Database', time: '14:10 - 15:50', room: 'G20 LAN', color: '#0A84FF', icon: 'calculator-outline' as any },
  ];

  const deadlines = [
    { id: 1, title: 'COMP 313 Assignment ', date: 'Tomorrow, 11:59 PM', color: '#FF6B6B', icon: 'document-text-outline' as any },
    { id: 2, title: 'COMP 315 Project Phase 2', date: 'Friday, 5:00 PM', color: '#4ECDC4', icon: 'folder-outline' as any },
    { id: 3, title: 'PSYC 201 Quiz 2', date: 'Monday, 9:00 AM', color: '#BF5AF2', icon: 'school-outline' as any },
  ];

  const examDate = new Date('2026-11-15');
  const today = new Date();
  const daysUntilExam = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const totalClasses = 14;
  const classesRemaining = 8;
  const semesterWeek = 12;

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.appName, {color: colors.textSecondary}]}>EduSchedule</Text>
            <Text style={[styles.name, {color: colors.text}]}>Wonkerh</Text>
            <Text style={[styles.studentId, {color: colors.textSecondary}]}>223074605</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>W</Text>
          </View>
        </View>

        {/* Exam Countdown */}
        <View style={[styles.examCard, {backgroundColor: colors.card}]}>
          <View style={styles.examContent}>
            <View style={{flex:1}}>
              <Text style={styles.examLabel}>FINAL EXAMS IN</Text>
              <Text style={[styles.examDays, {color: colors.text}]}>{daysUntilExam} Days</Text>
              <Text style={[styles.examSub, {color: colors.textSecondary}]}>15 November 2026</Text>
            </View>
            <View style={styles.examIconContainer}>
              <Ionicons name="timer" size={44} color="#FF6B6B" />
            </View>
          </View>
        </View>

        {/* Today's Lectures */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>Today's Lectures</Text>
          {todayClasses.map(cls => (
            <View key={cls.id} style={[styles.classCard, {backgroundColor: colors.card}]}>
              <View style={[styles.classIcon, {backgroundColor: cls.color + '20'}]}>
                <Ionicons name={cls.icon} size={22} color={cls.color} />
              </View>
              <View style={styles.classInfo}>
                <Text style={[styles.className, {color: colors.text}]}>{cls.subject}</Text>
                <Text style={[styles.classMeta, {color: colors.textSecondary}]}>{cls.time}</Text>
                <Text style={[styles.classRoom, {color: colors.textSecondary}]}>{cls.room}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            </View>
          ))}
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, {backgroundColor: colors.card}]}>
            <Ionicons name="calendar-outline" size={22} color="#4ECDC4" />
            <Text style={[styles.statVal, {color: colors.text}]}>Week {semesterWeek}</Text>
            <Text style={[styles.statLabel, {color: colors.textSecondary}]}>of 16</Text>
          </View>
          <View style={[styles.statCard, {backgroundColor: colors.card}]}>
            <Ionicons name="school-outline" size={22} color="#0A84FF" />
            <Text style={[styles.statVal, {color: colors.text}]}>{classesRemaining}</Text>
            <Text style={[styles.statLabel, {color: colors.textSecondary}]}>classes left</Text>
          </View>
          <View style={[styles.statCard, {backgroundColor: colors.card}]}>
            <Ionicons name="checkmark-done-outline" size={22} color="#34C759" />
            <Text style={[styles.statVal, {color: colors.text}]}>{totalClasses - classesRemaining}</Text>
            <Text style={[styles.statLabel, {color: colors.textSecondary}]}>completed</Text>
          </View>
        </View>

        {/* Deadlines */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, {color: colors.text}]}>Upcoming Deadlines</Text>
          </View>
          {deadlines.map(e => (
            <View key={e.id} style={[styles.eventCard, {backgroundColor: colors.card}]}>
              <View style={[styles.eventDot, {backgroundColor: e.color}]} />
              <Ionicons name={e.icon} size={18} color={e.color} style={{marginLeft:10}} />
              <View style={{flex:1, marginLeft:10}}>
                <Text style={[styles.eventTitle, {color: colors.text}]}>{e.title}</Text>
                <Text style={[styles.eventDate, {color: colors.textSecondary}]}>{e.date}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Moodle Quick Link */}
        <TouchableOpacity 
          style={[styles.moodleCard, {backgroundColor: colors.card}]}
          onPress={() => Linking.openURL('https://learn2026.ukzn.ac.za')}
        >
          <Ionicons name="globe-outline" size={22} color={colors.primary} />
          <View style={{flex:1, marginLeft:12}}>
            <Text style={[styles.moodleTitle, {color: colors.text}]}>UKZN Learn 2026</Text>
            <Text style={[styles.moodleSub, {color: colors.textSecondary}]}>learn2026.ukzn.ac.za</Text>
          </View>
          <Ionicons name="open-outline" size={18} color={colors.primary} />
        </TouchableOpacity>

        <View style={{height:100}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex:1},
  header: {flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', padding:20, paddingTop:20},
  appName: {fontSize:13, fontWeight:'500'},
  name: {fontSize:34, fontWeight:'800', letterSpacing:-0.5},
  studentId: {fontSize:12, marginTop:2},
  avatar: {width:52, height:52, borderRadius:26, backgroundColor:'#FF6B6B', justifyContent:'center', alignItems:'center'},
  avatarText: {color:'white', fontSize:22, fontWeight:'700'},
  examCard: {margin:20, borderRadius:20, padding:24, shadowColor:'#000', shadowOffset:{width:0,height:4}, shadowOpacity:0.08, shadowRadius:12, elevation:4},
  examContent: {flexDirection:'row', alignItems:'center'},
  examLabel: {fontSize:11, color:'#FF6B6B', fontWeight:'700', letterSpacing:2},
  examDays: {fontSize:30, fontWeight:'800', marginTop:6},
  examSub: {fontSize:13, marginTop:4},
  examIconContainer: {width:70, height:70, borderRadius:20, backgroundColor:'#FF6B6B15', justifyContent:'center', alignItems:'center'},
  section: {paddingHorizontal:20, marginTop:15},
  sectionHeader: {flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:10},
  sectionTitle: {fontSize:22, fontWeight:'700', letterSpacing:-0.3},
  classCard: {borderRadius:16, padding:16, marginBottom:10, flexDirection:'row', alignItems:'center', shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.05, shadowRadius:8, elevation:2},
  classIcon: {width:46, height:46, borderRadius:14, justifyContent:'center', alignItems:'center'},
  classInfo: {flex:1, marginLeft:14},
  className: {fontSize:16, fontWeight:'600'},
  classMeta: {fontSize:13, marginTop:2},
  classRoom: {fontSize:12, marginTop:2},
  statsRow: {flexDirection:'row', paddingHorizontal:20, marginTop:20, gap:10},
  statCard: {flex:1, borderRadius:16, padding:16, alignItems:'center', shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.05, shadowRadius:8, elevation:2},
  statVal: {fontSize:18, fontWeight:'700', marginTop:8},
  statLabel: {fontSize:11, marginTop:4, fontWeight:'500'},
  eventCard: {flexDirection:'row', alignItems:'center', borderRadius:14, padding:14, marginBottom:8},
  eventDot: {width:8, height:8, borderRadius:4},
  eventTitle: {fontSize:15, fontWeight:'600'},
  eventDate: {fontSize:12, marginTop:2},
  moodleCard: {flexDirection:'row', alignItems:'center', marginHorizontal:20, borderRadius:16, padding:16, marginTop:20, shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.05, shadowRadius:8, elevation:2},
  moodleTitle: {fontSize:16, fontWeight:'600'},
  moodleSub: {fontSize:13, marginTop:2},
});

export default DashboardScreen;