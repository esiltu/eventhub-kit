import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Image, TextInput } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const dienstenVoorbeeld = [
  {
    dag: 'Maandag',
    datum: '10-01-2024 t/m 10-03-2024',
    locatie: 'Amsterdam',
    tarief: '€25/uur',
    type: 'Op Locatie',
    dienstverband: 'Detachering',
    functie: 'Frontend Ontwikkelaar',
    icoon: require('../../assets/social-media-icons/github-150.png'),
    beschrijving:
      'Geweldig team en cultuur. Als Frontend Ontwikkelaar kom je te werken in een dynamisch team waarbij je direct bijdraagt aan de ontwikkeling van innovatieve webapplicaties. Je gebruikt de nieuwste technologieën om responsive, toegankelijke en visueel aantrekkelijke interfaces te bouwen.',
    bedrijfsinfo: {
      beschrijving:
        'Ons bedrijf biedt flexibele werktijden, thuiswerkmogelijkheden, een competitief salaris en een inspirerende werkomgeving.',
      marge: '6%',
      extra:
        "We vragen een marge van 6% over je uurtarief om onze diensten te dekken, inclusief HR-ondersteuning, technische middelen en carrièreontwikkelingsprogramma's.",
    },
  },
  {
    dag: 'Dinsdag',
    datum: '11-01-2024 t/m 11-03-2024',
    locatie: 'Rotterdam',
    tarief: '€30/uur',
    type: 'Hybride',
    dienstverband: 'Freelance',
    functie: 'Backend Ontwikkelaar',
    icoon: require('../../assets/social-media-icons/linkedin-150.png'),
    beschrijving:
      'In de rol van Backend Ontwikkelaar ben je verantwoordelijk voor het opzetten van robuuste server-oplossingen en het waarborgen van de connectiviteit tussen de server, de applicatie en de gebruikers. Jouw code zorgt voor efficiënte en veilige uitwisseling van gegevens.',
    bedrijfsinfo: {
      beschrijving:
        'Bij ons krijg je toegang tot de nieuwste technologieën en werk je samen met topexperts in jouw vakgebied.',
      marge: '6%',
      extra:
        'We hanteren een marge van 6% om onze kosten te dekken, waaronder toegang tot ons netwerk van klanten en projectondersteuning.',
    },
  },
  {
    dag: 'Woensdag',
    datum: '12-01-2024 t/m 12-03-2024',
    locatie: 'Utrecht',
    tarief: '€20/uur',
    type: 'Remote',
    dienstverband: 'Detachering',
    functie: 'Full Stack Ontwikkelaar',
    icoon: require('../../assets/social-media-icons/tiktok-150.png'),
    beschrijving:
      'Als Full Stack Ontwikkelaar werk je aan zowel de front- als backend van onze webapplicaties. Je bent een cruciale schakel in het vertalen van klantwensen naar technische oplossingen en werkt met een stack die het beste past bij het project.',
    bedrijfsinfo: {
      beschrijving:
        'We bieden een dynamische werkomgeving waar je uitdagende projecten zult tegenkomen en waar ruimte is voor persoonlijke en professionele groei.',
      marge: '6%',
      extra:
        'Onze marge van 6% ondersteunt de voortdurende toegang tot nieuwe projecten en technologische middelen.',
    },
  },
  {
    dag: 'Donderdag',
    datum: '13-01-2024 t/m 13-03-2024',
    locatie: 'Leiden',
    tarief: '€28/uur',
    type: 'Op Locatie',
    dienstverband: 'Vast contract',
    functie: 'UI/UX Designer',
    icoon: require('../../assets/social-media-icons/whatsapp-icon-150.png'),
    beschrijving:
      'Als UI/UX Designer ben je verantwoordelijk voor het ontwerpen van intuïtieve en gebruikersvriendelijke interfaces voor mobiele en webapplicaties. Je werkt nauw samen met ontwikkelaars en productmanagers om ontwerpen te creëren die zowel esthetisch aantrekkelijk als functioneel zijn.',
    bedrijfsinfo: {
      beschrijving:
        'Ons bedrijf waardeert creativiteit en innovatie en biedt designers de ruimte om hun ideeën tot leven te brengen met de nieuwste tools en technologieën.',
      marge: '6%',
      extra:
        'Wij nemen een marge van 6% voor de begeleiding, trainingen en de benodigde licenties voor ontwerpsoftware die wij leveren.',
    },
  },
  {
    dag: 'Vrijdag',
    datum: '14-01-2024 t/m 14-03-2024',
    locatie: 'Groningen',
    tarief: '€32/uur',
    type: 'Hybride',
    dienstverband: 'Projectbasis',
    functie: 'Project Manager',
    icoon: require('../../assets/social-media-icons/telegram-icon-150.png'),
    beschrijving:
      'Als Project Manager coördineer je de planning, uitvoering en oplevering van projecten over diverse afdelingen heen. Je zorgt voor het behalen van projectdoelstellingen binnen de gestelde termijnen en budgetten en communiceert actief met alle betrokken stakeholders.',
    bedrijfsinfo: {
      beschrijving:
        'We bieden een omgeving waar je als projectmanager de leiding kunt nemen over uitdagende projecten met teams die passie hebben voor hun werk.',
      marge: '6%',
      extra:
        'Een marge van 6% helpt ons om de noodzakelijke projectmanagementtools en -systemen te onderhouden en te verbeteren, waardoor jij je kunt focussen op het leveren van topresultaten.',
    },
  },
];

export default function Diensten() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const getShortDescription = (description) => {
    return `${description.substring(0, 25)}...`;
  };

  const filteredData = dienstenVoorbeeld.filter((item) =>
    item.functie.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Zoek naar een functie... 📝"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Text style={styles.jobCount}>Aantal opdrachten: {filteredData.length}</Text>
      <FlashList
        data={filteredData}
        renderItem={({ item }) => {
          const scale = new Animated.Value(0.95);
          const handlePress = () => {
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: true,
            }).start(() => {
              scale.setValue(0.95);
              navigation.navigate('JobDetailPage', { item, functieTitel: item.functie });
            });
          };

          return (
            <Animated.View style={[styles.itemContainer, { transform: [{ scale }] }]}>
              <AnimatedTouchableOpacity
                onPress={handlePress}
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                activeOpacity={0.9}>
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                  <Text style={styles.functionTitle}>{item.functie}</Text>
                  <Text style={styles.time}>{item.datum}</Text>
                  <Text style={styles.location}>{item.locatie}</Text>
                  <Text style={styles.rate}>{item.tarief}</Text>
                  <Text style={styles.employmentType}>{item.dienstverband}</Text>
                  <Text style={styles.description}>{getShortDescription(item.beschrijving)}</Text>
                </View>
                <Image source={item.icoon} style={styles.iconRight} />
              </AnimatedTouchableOpacity>
            </Animated.View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={40}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  searchInput: {
    fontSize: 16,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  jobCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    left: '5%',
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
  },
  iconRight: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  location: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  rate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  employmentType: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'green',
  },
  description: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 5,
  },
  functionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
