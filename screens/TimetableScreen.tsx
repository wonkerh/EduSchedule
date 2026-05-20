import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const FULL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIMES = ['07:45', '08:40', '09:35', '10:30', '11:25', '12:20', '13:15', '14:10', '15:05', '16:00'];

const demoTimetable: any = {
  Mon: [
    { time: '08:40', subject: 'COMP 314', room: 'L01', color: '#FF6B6B', lecturer: 'Dr. Zulu' },
    { time: '10:30', subject: 'COMP 305', room: 'S03', color: '#4ECDC4', lecturer: 'Prof. Naidoo' },
    { time: '14:10', subject: 'MATH 301', room: 'H02', color: '#0A84FF', lecturer: 'Dr. Govender' },
  ],
  Tue: [
    { time: '09:35', subject: 'PSYC 201', room: 'A05', color: '#BF5AF2', lecturer: 'Dr. Pillay' },
    { time: '12:20', subject: 'COMP 314 Lab', room: 'Lab 2', color: '#FF6B6B', lecturer: 'Mr. Khumalo' },
  ],
  Wed: [
    { time: '08:40', subject: 'COMP 305 Lab', room: 'Lab 1', color: '#4ECDC4', lecturer: 'Ms. Moodley' },
    { time: '11:25', subject: 'MATH 301 Tut', room: 'H04', color: '#0A84FF', lecturer: 'Tutor' },
  ],
  Thu: [
    { time: '10:30', subject: 'COMP 314', room: 'L01', color: '#FF6B6B', lecturer: 'Dr. Zulu' },
    { time: '14:10', subject: 'PSYC 201 Lab', room: 'Psych Lab', color: '#BF5AF2', lecturer: 'Dr. Pillay' },
  ],
  Fri: [
    { time: '09:35', subject: 'COMP 305', room: 'S03', color: '#4ECDC4', lecturer: 'Prof. Naidoo' },
  ],
};

const TimetableScreen = () => {
  const { isDark, colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([0]));

  const toggleDay = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedDays(new Set([0, 1, 2, 3, 4]));
  };

  const collapseAll = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedDays(new Set([0]));
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.header}>
        <View style={{flex:1}}>
          <Text style={[styles.title, {color: colors.text}]}>Timetable</Text>
          <Text style={[styles.subtitle, {color: colors.textSecondary}]}>Semester 2 • Week 12</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={[styles.headerBtn, {backgroundColor: colors.card}]} onPress={expandAll}>
            <Ionicons name="expand" size={18} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerBtn, {backgroundColor: colors.card}]} onPress={collapseAll}>
            <Ionicons name="contract" size={18} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        {DAYS.map((day, index) => {
          const classes = demoTimetable[day] || [];
          const isExpanded = expandedDays.has(index);
          const hasClasses = classes.length > 0;

          return (
            <View key={day} style={styles.daySection}>
              {/* Day Header - Tappable */}
              <TouchableOpacity
                style={[styles.dayHeader, {backgroundColor: colors.card}]}
                onPress={() => toggleDay(index)}
                activeOpacity={0.7}
              >
                <View style={styles.dayHeaderLeft}>
                  <View style={[styles.dayDot, {backgroundColor: hasClasses ? classes[0].color : colors.border}]} />
                  <View>
                    <Text style={[styles.dayName, {color: colors.text}]}>{FULL_DAYS[index]}</Text>
                    <Text style={[styles.dayCount, {color: colors.textSecondary}]}>
                      {hasClasses ? `${classes.length} lectures` : 'No classes'}
                    </Text>
                  </View>
                </View>
                <View style={styles.dayHeaderRight}>
                  {hasClasses && (
                    <View style={[styles.timeRange, {backgroundColor: colors.background}]}>
                      <Text style={[styles.timeRangeText, {color: colors.textSecondary}]}>
                        {classes[0].time} - {classes[classes.length-1].time}
                      </Text>
                    </View>
                  )}
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={colors.textSecondary}
                  />
                </View>
              </TouchableOpacity>

              {/* Expandable Content */}
              {isExpanded && hasClasses && (
                <View style={styles.classesContainer}>
                  {classes.map((cls: any, i: number) => (
                    <TouchableOpacity
                      key={i}
                      style={[styles.classCard, {backgroundColor: colors.card}]}
                      onPress={() => {
                        setSelectedClass(cls);
                        setModalVisible(true);
                      }}
                      activeOpacity={0.7}
                    >
                      {/* Time indicator */}
                      <View style={styles.timeIndicator}>
                        <Text style={[styles.timeText, {color: colors.textSecondary}]}>{cls.time}</Text>
                        <View style={[styles.timeLine, {backgroundColor: cls.color + '30'}]} />
                      </View>

                      {/* Card */}
                      <View style={[styles.cardBody, {backgroundColor: cls.color + '10', borderLeftColor: cls.color}]}>
                        <View style={styles.cardHeader}>
                          <View style={[styles.moduleBadge, {backgroundColor: cls.color + '20'}]}>
                            <Text style={[styles.moduleCode, {color: cls.color}]}>{cls.subject}</Text>
                          </View>
                          <Text style={[styles.duration, {color: colors.textSecondary}]}>1h 40m</Text>
                        </View>
                        <View style={styles.cardDetails}>
                          <Ionicons name="location-outline" size={13} color={colors.textSecondary} />
                          <Text style={[styles.detailText, {color: colors.textSecondary}]}>{cls.room}</Text>
                          <Ionicons name="person-outline" size={13} color={colors.textSecondary} style={{marginLeft:12}} />
                          <Text style={[styles.detailText, {color: colors.textSecondary}]}>{cls.lecturer}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {isExpanded && !hasClasses && (
                <View style={[styles.emptyDay, {backgroundColor: colors.card}]}>
                  <Ionicons name="cafe-outline" size={24} color={colors.textSecondary} />
                  <Text style={[styles.emptyDayText, {color: colors.textSecondary}]}>No lectures - Enjoy your day off!</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* Modal remains the same */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, {backgroundColor: colors.card}]}>
            <View style={styles.modalHandle} />
            {selectedClass && (
              <>
                <View style={[styles.modalIcon, {backgroundColor: selectedClass.color + '20'}]}>
                  <Ionicons name="school" size={32} color={selectedClass.color} />
                </View>
                <Text style={[styles.modalSubject, {color: colors.text}]}>{selectedClass.subject}</Text>
                <Text style={[styles.modalTime, {color: selectedClass.color}]}>
                  {selectedClass.time} • 1h 40min
                </Text>
                <View style={styles.modalDetails}>
                  <View style={styles.modalDetailRow}>
                    <Ionicons name="location" size={20} color={colors.textSecondary} />
                    <Text style={[styles.modalDetailText, {color: colors.text}]}>{selectedClass.room}</Text>
                  </View>
                  <View style={styles.modalDetailRow}>
                    <Ionicons name="person" size={20} color={colors.textSecondary} />
                    <Text style={[styles.modalDetailText, {color: colors.text}]}>{selectedClass.lecturer}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.closeBtn, {backgroundColor: colors.primary}]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex:1},
  header: {flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:20, paddingTop:20},
  title: {fontSize:34, fontWeight:'800', letterSpacing:-0.5},
  subtitle: {fontSize:14, fontWeight:'500', marginTop:4},
  headerButtons: {flexDirection:'row', gap:8},
  headerBtn: {width:36, height:36, borderRadius:18, justifyContent:'center', alignItems:'center'},
  
  // Day Section
  daySection: {marginBottom:8, paddingHorizontal:20},
  dayHeader: {flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderRadius:16, padding:16, shadowColor:'#000', shadowOffset:{width:0,height:1}, shadowOpacity:0.04, shadowRadius:4, elevation:2},
  dayHeaderLeft: {flexDirection:'row', alignItems:'center', gap:12},
  dayDot: {width:10, height:10, borderRadius:5},
  dayName: {fontSize:16, fontWeight:'700'},
  dayCount: {fontSize:12, marginTop:2},
  dayHeaderRight: {flexDirection:'row', alignItems:'center', gap:8},
  timeRange: {paddingHorizontal:10, paddingVertical:5, borderRadius:8},
  timeRangeText: {fontSize:11, fontWeight:'600'},
  
  // Classes
  classesContainer: {marginTop:8, gap:8},
  classCard: {flexDirection:'row', borderRadius:14, overflow:'hidden'},
  timeIndicator: {width:50, alignItems:'center', paddingTop:14},
  timeText: {fontSize:11, fontWeight:'700'},
  timeLine: {width:2, flex:1, marginTop:4},
  cardBody: {flex:1, borderRadius:14, borderLeftWidth:3, padding:14, marginBottom:4},
  cardHeader: {flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:8},
  moduleBadge: {paddingHorizontal:8, paddingVertical:4, borderRadius:6},
  moduleCode: {fontSize:13, fontWeight:'700'},
  duration: {fontSize:11, fontWeight:'600'},
  cardDetails: {flexDirection:'row', alignItems:'center', gap:4},
  detailText: {fontSize:12, fontWeight:'500'},
  
  // Empty day
  emptyDay: {marginTop:8, borderRadius:14, padding:20, alignItems:'center', gap:8},
  emptyDayText: {fontSize:14, fontWeight:'500'},
  
  // Modal
  modalOverlay: {flex:1, justifyContent:'flex-end', backgroundColor:'rgba(0,0,0,0.5)'},
  modalContent: {borderTopLeftRadius:24, borderTopRightRadius:24, padding:24, paddingBottom:40, alignItems:'center'},
  modalHandle: {width:36, height:5, backgroundColor:'#D1D1D6', borderRadius:3, alignSelf:'center', marginBottom:20},
  modalIcon: {width:70, height:70, borderRadius:20, justifyContent:'center', alignItems:'center', marginBottom:16},
  modalSubject: {fontSize:22, fontWeight:'800', marginBottom:4},
  modalTime: {fontSize:16, fontWeight:'600', marginBottom:20},
  modalDetails: {width:'100%', gap:12, marginBottom:24},
  modalDetailRow: {flexDirection:'row', alignItems:'center', gap:12},
  modalDetailText: {fontSize:16, fontWeight:'500'},
  closeBtn: {width:'100%', paddingVertical:16, borderRadius:14, alignItems:'center'},
  closeBtnText: {color:'white', fontSize:17, fontWeight:'700'},
});

export default TimetableScreen;