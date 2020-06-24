import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../../services/api';

import {
  Container,
  PlaceImage,
  PlaceName,
  PlaceTypes,
  Line,
  Address,
  AddressTitle,
  AddressContent,
  Phone,
  PhoneTitle,
  PhoneContent,
  Website,
  WebsiteTitle,
  WebsiteContent,
} from './styles';

interface Params {
  place_id: number;
}

interface Data {
  place: {
    image: string;
    image_url: string;
    name: string;
    website: string;
    phone: string;
    district: string;
    council: string;
  };
  types: {
    title: string;
  }[];
}

const Detail: React.FC = () => {
  const [data, setData] = useState<Data>({} as Data);

  const { goBack } = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`places/${routeParams.place_id}`).then(response => {
      setData(response.data);
    });
  }, [routeParams]);

  if (!data.place) {
    return null;
  }

  return (
    <Container>
      <TouchableOpacity onPress={() => goBack()}>
        <Icon name="arrow-left" size={20} color="#72bc49" />
      </TouchableOpacity>
      <PlaceImage
        source={{
          uri: data.place.image_url,
        }}
      />
      <PlaceName>{data.place.name}</PlaceName>
      <PlaceTypes>{data.types.map(type => type.title).join(', ')}</PlaceTypes>
      <Line />
      <Address>
        <AddressTitle>Localidade</AddressTitle>
        <AddressContent>
          {data.place.council},{data.place.district}
        </AddressContent>
      </Address>
      <Phone>
        <PhoneTitle>Telefone contacto</PhoneTitle>
        <PhoneContent>{data.place.phone}</PhoneContent>
      </Phone>
      <Website>
        <WebsiteTitle>Website</WebsiteTitle>
        <WebsiteContent
          onPress={() => Linking.openURL(`${data.place.website}`)}
        >
          {data.place.website}
        </WebsiteContent>
      </Website>
    </Container>
  );
};

export default Detail;
