import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private httpClient : HttpClient) { }

  private _pokemonList: String[] = [
    'Pikachu',
    'Bulbasaur',
    'Charizard'
  ];
  
  public get pokemonList(): String[] {
    return this._pokemonList;
  }
  public set pokemonList(value: String[]) {
    this._pokemonList = value;
  }

  public add(newPoke: String){
    this.pokemonList.push(newPoke);
  }

}
