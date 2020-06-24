import React, { useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import {
  Container,
  Main,
  Title,
  Description,
  Footer,
  InputHome,
  ButtonContent,
  ButtonIcon,
  ButtonText,
} from './styles';

const Home: React.FC = () => {
  const [district, setDistrict] = useState(' ');
  const [council, setCouncil] = useState(' ');

  const { navigate } = useNavigation();

  const handleNavigationToPlaces = useCallback(() => {
    navigate('Places', {
      district,
      council,
    });
  }, [council, district, navigate]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <Container
        source={require('../../assets/home-background.png')}
        imageStyle={{ width: 274, height: 400 }}
      >
        <Main>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Title>As melhores experiências em toda Portugal</Title>
            <Description>
              Compartilhe e busque restaurantes, praias, museus, monumentos e
              muito mais! Com apenas alguns cliques poderás achar os sítios mais
              giros e muita cultura dentro de uma única plataforma.
            </Description>
          </View>
        </Main>
        <Footer>
          <InputHome
            placeholder="Digite o distrito"
            value={district}
            onChangeText={setDistrict}
          />
          <InputHome
            placeholder="Digite o concelho"
            value={council}
            onChangeText={setCouncil}
          />
          <ButtonContent onPress={handleNavigationToPlaces}>
            <ButtonIcon>
              <Icon name="arrow-right" color="#fff" size={24} />
            </ButtonIcon>
            <ButtonText>Entrar</ButtonText>
          </ButtonContent>
        </Footer>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Home;
