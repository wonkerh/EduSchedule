import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, TextInput, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const SettingsScreen = () => {
  const { isDark, toggleTheme, colors } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [name, setName] = useState('Wonkerh Mbambo');

  const examDate = new Date('2026-11-15');
  const today = new Date();
  const daysUntilExam = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const openMoodle = () => {
    Linking.openURL('https://learn2026.ukzn.ac.za');
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.header, {color: colors.text}]}>Settings</Text>

        <View style={[styles.profileCard, {backgroundColor: colors.card}]}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>W</Text>
          </View>
          <View style={{flex:1, marginLeft:16}}>
            <TextInput 
              style={[styles.nameInput, {color: colors.text}]} 
              value={name} 
              onChangeText={setName} 
              placeholderTextColor={colors.textSecondary} 
            />
            <Text style={[styles.studentId, {color: colors.textSecondary}]}>223074605</Text>
            <Text style={[styles.programme, {color: colors.primary}]}>BSc Computer Science & IT</Text>
          </View>
        </View>

        <View style={[styles.examCard, {backgroundColor: colors.card, borderLeftColor: '#FF6B6B'}]}>
          <View style={styles.examContent}>
            <Ionicons name="timer-outline" size={24} color="#FF6B6B" />
            <View style={{marginLeft:12, flex:1}}>
              <Text style={styles.examLabel}>FINAL EXAMS</Text>
              <Text style={[styles.examDays, {color: colors.text}]}>{daysUntilExam} days</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, {color: colors.textSecondary}]}>APPEARANCE</Text>
          <View style={[styles.row, {backgroundColor: colors.card}]}>
            <View style={styles.rowLeft}>
              <Ionicons name="moon" size={20} color={colors.text} />
              <Text style={[styles.rowText, {color: colors.text}]}>Dark Mode</Text>
            </View>
            <Switch 
              value={isDark} 
              onValueChange={toggleTheme} 
              trackColor={{false:'#E5E5EA', true:'#34C759'}} 
              thumbColor="white" 
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, {color: colors.textSecondary}]}>NOTIFICATIONS</Text>
          <View style={[styles.row, {backgroundColor: colors.card}]}>
            <View style={styles.rowLeft}>
              <Ionicons name="notifications" size={20} color={colors.text} />
              <Text style={[styles.rowText, {color: colors.text}]}>Push Notifications</Text>
            </View>
            <Switch 
              value={notifications} 
              onValueChange={setNotifications} 
              trackColor={{false:'#E5E5EA', true:'#34C759'}} 
              thumbColor="white" 
            />
          </View>
        </View>

        <TouchableOpacity style={[styles.moodleCard, {backgroundColor: colors.card}]} onPress={openMoodle}>
          <Ionicons name="globe-outline" size={24} color={colors.primary} />
          <View style={{flex:1, marginLeft:12}}>
            <Text style={[styles.moodleTitle, {color: colors.text}]}>UKZN Learn 2026</Text>
            <Text style={[styles.moodleSub, {color: colors.textSecondary}]}>learn2026.ukzn.ac.za</Text>
          </View>
          <Ionicons name="open-outline" size={20} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, {color: colors.textSecondary}]}>ABOUT</Text>
          <View style={[styles.row, {backgroundColor: colors.card}]}>
            <Text style={[styles.rowText, {color: colors.text}]}>Version</Text>
            <Text style={[styles.rowValue, {color: colors.textSecondary}]}>1.0.0</Text>
          </View>
        </View>

        <View style={{height:60}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex:1},
  header: {fontSize:34, fontWeight:'800', padding:20, paddingTop:20, letterSpacing:-0.5},
  profileCard: {flexDirection:'row', alignItems:'center', marginHorizontal:20, borderRadius:20, padding:20, shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.06, shadowRadius:10, elevation:3},
  avatarLarge: {width:60, height:60, borderRadius:30, backgroundColor:'#FF6B6B', justifyContent:'center', alignItems:'center'},
  avatarLargeText: {color:'white', fontSize:26, fontWeight:'700'},
  nameInput: {fontSize:20, fontWeight:'700', padding:0},
  studentId: {fontSize:13, marginTop:4, fontWeight:'500'},
  programme: {fontSize:13, marginTop:2, fontWeight:'600'},
  examCard: {marginHorizontal:20, marginTop:20, borderRadius:18, padding:20, borderLeftWidth:4, shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.05, shadowRadius:8, elevation:2},
  examContent: {flexDirection:'row', alignItems:'center'},
  examLabel: {fontSize:11, color:'#FF6B6B', fontWeight:'700', letterSpacing:2},
  examDays: {fontSize:24, fontWeight:'800', marginTop:4},
  section: {paddingHorizontal:20, marginTop:25},
  sectionLabel: {fontSize:12, fontWeight:'700', letterSpacing:1.5, marginBottom:10},
  row: {flexDirection:'row', alignItems:'center', borderRadius:14, padding:16, marginBottom:6, justifyContent:'space-between'},
  rowLeft: {flexDirection:'row', alignItems:'center', flex:1, gap:12},
  rowText: {fontSize:16},
  rowValue: {fontSize:14},
  moodleCard: {flexDirection:'row', alignItems:'center', marginHorizontal:20, borderRadius:16, padding:16, marginTop:25},
  moodleTitle: {fontSize:16, fontWeight:'600'},
  moodleSub: {fontSize:13, marginTop:2},
});

export default SettingsScreen;