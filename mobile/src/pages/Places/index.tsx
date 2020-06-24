import React, { useState, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SvgCssUri } from 'react-native-svg';
import RNLocation from 'react-native-location';

import api from '../../services/api';

import {
  Container,
  Title,
  Description,
  MapContainer,
  MapMarkerContainer,
  MapMarkerTitle,
  TypesContainer,
  Type,
  TypeText,
} from './styles';

interface Type {
  id: number;
  title: string;
  image_url: string;
}

interface Place {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

interface Params {
  district: string;
  council: string;
}

const Places: React.FC = () => {
  const [types, setTypes] = useState<Type[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const { navigate, goBack } = useNavigation();

  const route = useRoute();
  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadPosition() {
      await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
        },
      }).then(granted => {
        if (!granted) {
          Alert.alert('Não foi permitido o uso da localização');
        }
      });

      const location = await RNLocation.getLatestLocation();
      const { latitude, longitude } = location;

      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  useEffect(() => {
    api.get('types').then(response => {
      setTypes(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get('places', {
        params: {
          district: routeParams.district,
          council: routeParams.council,
          types: selectedTypes,
        },
      })
      .then(response => {
        setPlaces(response.data);
      });
  }, [routeParams.council, routeParams.district, selectedTypes]);

  const handleNavigateToDetail = useCallback(
    (id: number) => {
      navigate('Detail', { place_id: id });
    },
    [navigate],
  );

  const handleSelectType = useCallback(
    (id: number) => {
      const alreadySelected = selectedTypes.findIndex(type => type === id);

      if (alreadySelected >= 0) {
        const filteredTypes = selectedTypes.filter(type => type !== id);
        setSelectedTypes(filteredTypes);
      } else {
        setSelectedTypes([...selectedTypes, id]);
      }
    },
    [selectedTypes],
  );

  return (
    <>
      <Container>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="arrow-left" size={20} color="#72bc49" />
        </TouchableOpacity>
        <Title>Bem vindo!</Title>
        <Description>Encontre no mapa o sítio que procuras.</Description>

        <MapContainer>
          {initialPosition[0] !== 0 && (
            <MapView
              style={{ width: '100%', height: '100%' }}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.21,
                longitudeDelta: 0.21,
              }}
            >
              {places.map(place => (
                <Marker
                  key={place.id}
                  onPress={() => handleNavigateToDetail(place.id)}
                  zIndex={1}
                  style={{ width: 90, height: 80 }}
                  coordinate={{
                    latitude: place.latitude,
                    longitude: place.longitude,
                  }}
                >
                  <MapMarkerContainer>
                    <Image
                      style={{ width: 90, height: 45, resizeMode: 'cover' }}
                      source={{
                        uri: place.image_url,
                      }}
                    />
                    <MapMarkerTitle>{place.name}</MapMarkerTitle>
                  </MapMarkerContainer>
                </Marker>
              ))}
            </MapView>
          )}
        </MapContainer>
      </Container>
      <TypesContainer>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {types.map(type => (
            <Type
              onPress={() => handleSelectType(type.id)}
              activeOpacity={0.7}
              key={String(type.id)}
              style={
                selectedTypes.includes(type.id)
                  ? { backgroundColor: '#d6e8cf' }
                  : {}
              }
            >
              <SvgCssUri width="48" height="48" uri={type.image_url} />
              <TypeText>{type.title}</TypeText>
            </Type>
          ))}
        </ScrollView>
      </TypesContainer>
    </>
  );
};

export default Places;
