import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: ${Platform.OS === 'android' ? 60 : 40}px;
`;

export const PlaceImage = styled.Image`
  width: 100%;
  height: 180px;
  border-radius: 10px;
  margin-top: 32px;
`;

export const PlaceName = styled.Text`
  color: #333;
  font-size: 28px;
  font-family: 'Montserrat-Bold';
  margin-top: 24px;
`;

export const PlaceTypes = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 16px;
  line-height: 24px;
  margin-top: 8px;
  color: #c92c33;
`;

export const Line = styled.View`
  margin-top: 24px;
  border-width: 0.5;
  border-color: #ddd;
`;

export const Address = styled.View`
  margin-top: 24px;
`;

export const AddressTitle = styled.Text`
  color: #333;
  font-family: Roboto-Bold;
  font-size: 18px;
`;

export const AddressContent = styled.Text`
  font-family: Roboto-Regular;
  line-height: 24px;
  margin-top: 8px;
  color: #333;
`;

export const Phone = styled.View`
  margin-top: 24px;
`;

export const PhoneTitle = styled.Text`
  color: #333;
  font-family: Roboto-Bold;
  font-size: 18px;
`;

export const PhoneContent = styled.Text`
  font-family: Roboto-Regular;
  line-height: 24px;
  margin-top: 8px;
  color: #333;
`;

export const Website = styled.View`
  margin-top: 24px;
`;

export const WebsiteTitle = styled.Text`
  color: #333;
  font-family: Roboto-Bold;
  font-size: 18px;
`;

export const WebsiteContent = styled.Text`
  font-family: Roboto-Regular;
  line-height: 24px;
  margin-top: 8px;
  color: #333;
`;
