import { Image, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { ImageOne, ImageTwo, ImageThree } from '../../routers/OnboardingImgRouter';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { storage } from 'store/storage';

const Dots = ({ selected }) => {
  let backgroundColor;

  backgroundColor = selected ? '#5669FF' : '#E6E6E6';

  return (
    <View
      style={{
        width: 10,
        height: 10,
        marginHorizontal: 5,
        backgroundColor,
        borderRadius: 20,
      }}
    />
  );
};

const nextButtonComponent = ({ ...props }) => {
  let color = '#5669FF';
  return (
    <TouchableOpacity {...props} style={{ right: '15%' }}>
      <Ionicons name="arrow-forward-outline" size={30} color={color} />
    </TouchableOpacity>
  );
};

const doneButtonComponent = ({ ...props }) => {
  let color = '#5669FF';
  // Set the hasSeenOnboarding to true
  storage.set('hasSeenOnboarding', true);
  return (
    <TouchableOpacity style={{ right: '15%' }} {...props}>
      <Ionicons name="checkmark-outline" size={30} color={color} />
    </TouchableOpacity>
  );
};

const skipButtonComponent = ({ ...props }) => {
  // Set the hasSeenOnboarding to true
  storage.set('hasSeenOnboarding', true);
  return (
    <TouchableOpacity {...props} activeOpacity={0.6}>
      <Text style={{ fontSize: 20, left: '15%', color: '#5669FF' }}>Skip</Text>
    </TouchableOpacity>
  );
};

export default function OnboardingPages() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Onboarding
        DoneButtonComponent={doneButtonComponent}
        NextButtonComponent={nextButtonComponent}
        SkipButtonComponent={skipButtonComponent}
        titleStyles={{
          bottom: '160%',
          fontSize: 20,
          fontWeight: '500',
          padding: 50,
          textAlign: 'center',
        }}
        subTitleStyles={{
          bottom: '280%',
          fontSize: 20,
          fontWeight: '300',
          padding: 10,
          textAlign: 'center',
          color: 'black',
        }}
        bottomBarColor="#FFFFFF"
        DotComponent={Dots}
        // Navigate if user doesn't want to see the onboarding flow
        onSkip={() => navigation.navigate('SignIn')}
        onDone={() => navigation.navigate('SignIn')}
        pages={[
          {
            backgroundColor: '#FFFFFF',
            image: <Image source={ImageOne} style={{ width: '75%', height: '80%', top: '5%' }} />,
            title: 'Explore Upcoming and Nearby Events',
            subtitle: 'In publishing and graphic design, Lorem is a placeholder text commonly',
          },
          {
            backgroundColor: '#FFFFFF',
            image: <Image source={ImageTwo} style={{ width: '75%', height: '80%', top: '5%' }} />,
            title: ' Web Have Modern Events Calendar Feature',
            subtitle: ' In publishing and graphic design, Lorem is a placeholder text commonly ',
          },
          {
            backgroundColor: '#FFFFFF',
            image: <Image source={ImageThree} style={{ width: '75%', height: '80%', top: '5%' }} />,
            title: 'To Look Up More Events or Activities Nearby By Map',
            subtitle: 'In publishing and graphic design, Lorem is a placeholder text commonly',
          },
        ]}
      />
    </SafeAreaView>
  );
}
