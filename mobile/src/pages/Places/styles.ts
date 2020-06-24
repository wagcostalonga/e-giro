import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: ${Platform.OS === 'android' ? 60 : 40}px;
`;

export const Title = styled.Text`
  color: #333;
  font-size: 20px;
  font-family: 'Roboto-Bold';
  margin-top: 24px;
`;

export const Description = styled.Text`
  color: #333;
  font-size: 16px;
  margin-top: 4px;
  font-family: 'Roboto-Regular';
`;

export const MapContainer = styled.View`
  flex: 1;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 16px;
`;

export const MapMarkerContainer = styled.View`
  width: 90px;
  height: 70px;
  background-color: #72bc49;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  align-items: center;
  padding: 0 2px;
`;

export const MapMarkerTitle = styled.Text`
  flex: 1;
  font-family: 'Roboto-Regular';
  color: #fff;
  font-size: 12px;
  line-height: 23px;
`;

export const TypesContainer = styled.View`
  flex-direction: row;
  margin-top: 16px;
  margin-bottom: 32px;
`;

export const Type = styled.TouchableOpacity`
  background-color: #ddd;
  height: 120px;
  width: 120px;
  border-radius: 8px;
  padding: 20px 16px 16px 16px;
  margin-right: 8px;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

export const TypeText = styled.Text`
  font-family: 'Roboto-Bold';
  text-align: center;
  font-size: 14px;
`;
