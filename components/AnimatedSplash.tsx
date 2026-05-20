import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AnimatedSplash = () => {
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const textSlideUp = useRef(new Animated.Value(30)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const dotsOpacity = useRef(new Animated.Value(0)).current;
  const dot1Scale = useRef(new Animated.Value(0)).current;
  const dot2Scale = useRef(new Animated.Value(0)).current;
  const dot3Scale = useRef(new Animated.Value(0)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Main icon animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Text animations
    Animated.sequence([
      Animated.delay(400),
      Animated.parallel([
        Animated.timing(textSlideUp, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Tagline
    Animated.sequence([
      Animated.delay(700),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Loading dots animation
    Animated.sequence([
      Animated.delay(900),
      Animated.timing(dotsOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Dot bouncing animation
    const createDotAnimation = (dotAnim: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dotAnim, {
            toValue: 1,
            duration: 400,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(dotAnim, {
            toValue: 0,
            duration: 400,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    createDotAnimation(dot1Scale, 0);
    createDotAnimation(dot2Scale, 200);
    createDotAnimation(dot3Scale, 400);

    // Progress bar
    Animated.sequence([
      Animated.delay(900),
      Animated.timing(progressWidth, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const progressWidthInterpolated = progressWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Background circles */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      {/* Main content */}
      <View style={styles.content}>
        {/* Logo */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="school" size={52} color="white" />
          </View>
        </Animated.View>

        {/* App Name */}
        <Animated.View
          style={{
            transform: [{ translateY: textSlideUp }],
            opacity: opacityAnim,
          }}
        >
          <Text style={styles.appName}>EduSchedule</Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.View style={{ opacity: taglineOpacity }}>
          <Text style={styles.tagline}>UKZN Student Planner</Text>
        </Animated.View>

        {/* Loading indicator */}
        <Animated.View style={[styles.loadingContainer, { opacity: dotsOpacity }]}>
          <View style={styles.dotsContainer}>
            <Animated.View
              style={[
                styles.dot,
                { transform: [{ scale: dot1Scale.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.2] }) }] },
              ]}
            />
            <Animated.View
              style={[
                styles.dot,
                { transform: [{ scale: dot2Scale.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.2] }) }] },
              ]}
            />
            <Animated.View
              style={[
                styles.dot,
                { transform: [{ scale: dot3Scale.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.2] }) }] },
              ]}
            />
          </View>

          {/* Progress bar */}
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[
                styles.progressBar,
                { width: progressWidthInterpolated },
              ]}
            />
          </View>

          <Text style={styles.loadingText}>Preparing your schedule</Text>
        </Animated.View>

        {/* Footer */}
        <Animated.View style={[styles.footer, { opacity: taglineOpacity }]}>
          <Text style={styles.footerText}>College of Agriculture, Engineering & Science</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bgCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(10, 132, 255, 0.08)',
    top: -50,
    right: -100,
  },
  bgCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(78, 205, 196, 0.06)',
    bottom: -30,
    left: -60,
  },
  content: {
    alignItems: 'center',
    zIndex: 1,
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 30,
    backgroundColor: '#0A84FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0A84FF',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 15,
  },
  appName: {
    fontSize: 38,
    fontWeight: '800',
    color: 'white',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 8,
    fontWeight: '600',
    letterSpacing: 1,
  },
  loadingContainer: {
    marginTop: 48,
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ECDC4',
  },
  progressBarContainer: {
    width: 200,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: -100,
  },
  footerText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.3)',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});

export default AnimatedSplash;