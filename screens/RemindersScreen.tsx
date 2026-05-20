import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const RemindersScreen = () => {
  const { colors } = useTheme();
  const [reminders, setReminders] = useState([
    { id: 1, module: 'COMP 314', detail: 'Operating Systems', time: '15 min before', enabled: true, color: '#FF6B6B', icon: 'hardware-chip-outline' as any },
    { id: 2, module: 'COMP 305', detail: 'Database Systems', time: '10 min before', enabled: true, color: '#4ECDC4', icon: 'server-outline' as any },
    { id: 3, module: 'MATH 301', detail: 'Advanced Calculus', time: '5 min before', enabled: false, color: '#0A84FF', icon: 'calculator-outline' as any },
    { id: 4, module: 'PSYC 201', detail: 'Intro to Psychology', time: '30 min before', enabled: true, color: '#BF5AF2', icon: 'book-outline' as any },
  ]);

  const toggle = (id: number) => {
    setReminders(prev => prev.map(r => r.id === id ? {...r, enabled: !r.enabled} : r));
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.header, {color: colors.text}]}>Reminders</Text>

        <View style={[styles.studyBanner, {backgroundColor: '#1a1a2e'}]}>
          <View style={styles.studyBannerContent}>
            <Ionicons name="book" size={32} color="white" />
            <View style={{marginLeft:14, flex:1}}>
              <Text style={styles.bannerTitle}>NEXT STUDY SESSION</Text>
              <Text style={styles.bannerTime}>Today • 16:00 - 18:00</Text>
              <Text style={styles.bannerSubject}>COMP 305 - Database Normalization</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.startBtn}>
            <Text style={styles.startBtnText}>Start Focus</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>Lecture Reminders</Text>
          {reminders.map(r => (
            <View key={r.id} style={[styles.reminderCard, {backgroundColor: colors.card}]}>
              <View style={[styles.reminderIcon, {backgroundColor: r.color + '20'}]}>
                <Ionicons name={r.icon} size={20} color={r.color} />
              </View>
              <View style={{flex:1, marginLeft:12}}>
                <Text style={[styles.reminderSubject, {color: colors.text}]}>{r.module}</Text>
                <Text style={[styles.reminderDetail, {color: colors.textSecondary}]}>{r.detail}</Text>
                <Text style={[styles.reminderTime, {color: colors.textSecondary}]}>Alert: {r.time}</Text>
              </View>
              <Switch value={r.enabled} onValueChange={() => toggle(r.id)} trackColor={{false:'#E5E5EA', true:'#34C759'}} thumbColor="white" />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>Preferences</Text>
          <TouchableOpacity style={[styles.settingRow, {backgroundColor: colors.card}]}>
            <Ionicons name="time-outline" size={22} color={colors.primary} />
            <Text style={[styles.settingText, {color: colors.text}]}>Default alert time</Text>
            <Text style={[styles.settingValue, {color: colors.textSecondary}]}>15 min</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.settingRow, {backgroundColor: colors.card}]}>
            <Ionicons name="notifications-outline" size={22} color={colors.primary} />
            <Text style={[styles.settingText, {color: colors.text}]}>Notification style</Text>
            <Text style={[styles.settingValue, {color: colors.textSecondary}]}>Banner + Sound</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <View style={{height:100}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex:1},
  header: {fontSize:34, fontWeight:'800', padding:20, paddingTop:20, letterSpacing:-0.5},
  studyBanner: {margin:20, borderRadius:20, padding:20, shadowColor:'#1a1a2e', shadowOffset:{width:0,height:8}, shadowOpacity:0.3, shadowRadius:16, elevation:8},
  studyBannerContent: {flexDirection:'row', alignItems:'center'},
  bannerTitle: {fontSize:11, color:'rgba(255,255,255,0.7)', fontWeight:'700', letterSpacing:2},
  bannerTime: {fontSize:22, color:'white', fontWeight:'700', marginTop:4},
  bannerSubject: {fontSize:14, color:'rgba(255,255,255,0.8)', marginTop:4},
  startBtn: {backgroundColor:'#4ECDC4', borderRadius:20, paddingHorizontal:24, paddingVertical:12, alignSelf:'flex-start', marginTop:14},
  startBtnText: {color:'white', fontWeight:'700', fontSize:15},
  section: {paddingHorizontal:20, marginTop:15},
  sectionTitle: {fontSize:20, fontWeight:'700', marginBottom:12},
  reminderCard: {flexDirection:'row', alignItems:'center', borderRadius:16, padding:14, marginBottom:8, shadowColor:'#000', shadowOffset:{width:0,height:1}, shadowOpacity:0.04, shadowRadius:6, elevation:2},
  reminderIcon: {width:42, height:42, borderRadius:12, justifyContent:'center', alignItems:'center'},
  reminderSubject: {fontSize:16, fontWeight:'600'},
  reminderDetail: {fontSize:12, marginTop:1},
  reminderTime: {fontSize:12, marginTop:3},
  settingRow: {flexDirection:'row', alignItems:'center', borderRadius:14, padding:16, marginBottom:8},
  settingText: {flex:1, fontSize:16, marginLeft:12},
  settingValue: {fontSize:14, marginRight:6},
});

export default RemindersScreen;