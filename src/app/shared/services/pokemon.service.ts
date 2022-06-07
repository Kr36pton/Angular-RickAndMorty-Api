import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { environment } from '@environment/environment';
import { Pokemon } from '@shared/interface/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  searchPokemons(query='', page=1){
    const filter = `${environment.baseUrlAPI}/?name=${query}&page=${page}`
    return this.http.get<Pokemon[]>(filter)
  }
  getDetails(id:number){
    return this.http.get<Pokemon>(`${environment.baseUrlAPI}/${id}`)
  }
}
