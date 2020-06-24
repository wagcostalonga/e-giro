import { Request, Response } from 'express';
import knex from '../database/connection';

class PlacesController {
  async index(request: Request, response: Response) {
    const { district, council, types } = request.query;

    const parsedTypes = String(types)
      .split(',')
      .map(type => Number(type.trim()));

    const places = await knex('places')
      .join('places_types', 'places.id', '=', 'places_types.place_id')
      .whereIn('places_types.type_id', parsedTypes)
      .where('district', String(district))
      .where('council', String(council))
      .distinct()
      .select('places.*');

    const serializedPlaces = places.map(place => {
      return {
        ...place,
        image_url: `http://192.168.1.4:3333/uploads/${place.image}`,
      }
    });      

    return response.json(serializedPlaces);
  }
  
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const place = await knex('places').where('id', id).first();

    if(!place) {
      return response.status(400).json({ message: 'Place not found.' });
    }

    const serializedPlace = {
        ...place,
        image_url: `http://192.168.1.4:3333/uploads/${place.image}`,
    }; 

    const types = await knex('types')
      .join('places_types', 'types.id', '=', 'places_types.type_id')
      .where('places_types.place_id', id)
      .select('types.title');

    return response.json({ place: serializedPlace, types });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      website,
      phone,
      latitude,
      longitude,
      district,
      council,
      types
    } = request.body;
  
    const trx = await knex.transaction();

    const place = {
      image: request.file.filename,
      name,
      website,
      phone,
      latitude,
      longitude,
      district,
      council
    }
  
    const insertedIds = await trx('places').insert(place);
  
    const place_id = insertedIds[0];
  
    const placeTypes = types
      .split(', ')
      .map((type: string) => Number(type.trim()))
      .map((type_id: number) => {
        return {
          type_id,
          place_id,
        }
    });
  
    await trx('places_types').insert(placeTypes);

    await trx.commit();

    return response.json({ id: place_id, ...place });
  } 
}

export default PlacesController;