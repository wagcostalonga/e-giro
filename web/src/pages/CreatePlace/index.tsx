import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';

import {
  Container,
  Content,
  Header,
  Form,
  FieldGroup,
  Field,
  List,
  ButtonSubmit,
} from './styles';

import Dropzone from '../../components/Dropzone';
import api from '../../services/api';
import logo from '../../assets/logo.svg';

interface Type {
  id: number;
  title: string;
  image_url: string;
}

interface District {
  title: string;
}

interface Council {
  title: string;
}

const CreatePlace: React.FC = () => {
  // sempre que for criado um array ou um objeto dentro de um estado informar o tipo de variável
  const [types, setTypes] = useState<Type[]>([]);
  // vetor de strings
  const [districts, setDistricts] = useState<string[]>([]);
  const [councils, setCouncils] = useState<string[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [formData, setFormData] = useState({
    name: '',
    website: '',
    phone: '',
  });

  const [selectedDistrict, setSelectedDistrict] = useState('0');
  const [selectedCouncil, setSelectedCouncil] = useState('0');
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedFile, setSelectedFile] = useState<File>();

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get('types').then((response) => {
      setTypes(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<District[]>('http://localhost:3200/districts')
      .then((response) => {
        const districtsTitle = response.data.map((district) => district.title);
        setDistricts(districtsTitle);
      });
  }, []);

  useEffect(() => {
    if (selectedDistrict === '0') {
      return;
    }
    axios
      .get<Council[]>(`http://localhost:3200/${selectedDistrict}`)
      .then((response) => {
        const councilsTitle = response.data.map((council) => council.title);
        setCouncils(councilsTitle);
      });
  }, [selectedDistrict]);

  const handleSelectedDistrict = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const districtSelected = e.target.value;
      setSelectedDistrict(districtSelected);
    },
    []
  );

  const handleSelectedCouncil = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const councilSelected = e.target.value;
      setSelectedCouncil(councilSelected);
    },
    []
  );

  const handleMapClick = useCallback((e: LeafletMouseEvent) => {
    setSelectedPosition([e.latlng.lat, e.latlng.lng]);
  }, []);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    },
    [formData]
  );

  const handleSelectType = useCallback(
    (id: number) => {
      const alreadySelected = selectedTypes.findIndex((type) => type === id);

      if (alreadySelected >= 0) {
        const filteredTypes = selectedTypes.filter((type) => type !== id);
        setSelectedTypes(filteredTypes);
      } else {
        setSelectedTypes([...selectedTypes, id]);
      }
    },
    [selectedTypes]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const { name, website, phone } = formData;
      const council = selectedCouncil;
      const district = selectedDistrict;
      const [latitude, longitude] = selectedPosition;
      const types = selectedTypes;

      const data = new FormData();

      data.append('name', name);
      data.append('website', website);
      data.append('phone', phone);
      data.append('district', district);
      data.append('council', council);
      data.append('latitude', String(latitude));
      data.append('longitude', String(longitude));
      data.append('types', types.join(','));

      if (selectedFile) {
        data.append('image', selectedFile);
      }

      await api.post('places', data);

      console.log(data);
      alert('Novo sítio cadastrado com sucesso!');

      history.push('/');
    },
    [
      formData,
      selectedCouncil,
      selectedDistrict,
      selectedPosition,
      selectedTypes,
      selectedFile,
      history,
    ]
  );

  return (
    <Container>
      <Content>
        <Header>
          <img src={logo} alt="E-Giro logo" />
          <Link to="/">
            <FiArrowLeft />
            Voltar para a home
          </Link>
        </Header>

        <Form onSubmit={handleSubmit}>
          <h1>
            Cadastro de
            <br />
            um novo sítio
          </h1>

          <Dropzone onFileUploaded={setSelectedFile} />

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>
            <FieldGroup>
              <Field>
                <label htmlFor="name">Nome do sítio</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <label htmlFor="phone">Telefone/Whatsapp (opcional)</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  onChange={handleInputChange}
                />
              </Field>
            </FieldGroup>
            <Field>
              <label htmlFor="website">Website (opcional)</label>
              <input
                type="text"
                name="website"
                id="website"
                placeholder="http://"
                onChange={handleInputChange}
              />
            </Field>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </legend>
            <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
              />
              <Marker position={selectedPosition} />
            </Map>
            <FieldGroup>
              <Field>
                <label htmlFor="district">Distrito</label>
                <select
                  name="district"
                  id="district"
                  value={selectedDistrict}
                  onChange={handleSelectedDistrict}
                >
                  <option value="0">Selecione um distrito</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </Field>
              <Field>
                <label htmlFor="council">Concelho</label>
                <select
                  name="council"
                  id="council"
                  value={selectedCouncil}
                  onChange={handleSelectedCouncil}
                >
                  <option value="0">Selecione um concelho</option>
                  {councils.map((council) => (
                    <option key={council} value={council}>
                      {council}
                    </option>
                  ))}
                </select>
              </Field>
            </FieldGroup>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Características do sítio</h2>
              <span>Selecione um ou mais tipos abaixo</span>
            </legend>
            <List>
              {types.map((type) => (
                <li
                  key={type.id}
                  onClick={() => handleSelectType(type.id)}
                  className={selectedTypes.includes(type.id) ? 'selected' : ''}
                >
                  <img src={type.image_url} alt={type.title} />
                  <span>{type.title}</span>
                </li>
              ))}
            </List>
          </fieldset>
          <ButtonSubmit type="submit">Cadastrar novo sítio</ButtonSubmit>
        </Form>
      </Content>
    </Container>
  );
};

export default CreatePlace;
