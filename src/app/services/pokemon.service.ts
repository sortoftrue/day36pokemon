import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Pokemon } from '../model/pokemon';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private httpClient: HttpClient) { }

  onEvent = new Subject<any>()

  private _pokemonList: Pokemon[] = [
    {pokeId: 1, name: 'Pikachu' },
    {pokeId: 2, name: 'Bulbasaur' },
    {pokeId: 3, name: 'Charizard' }
  ];

  db = new MyDatabase()

  public get pokemonList(): Pokemon[] {
    return this._pokemonList;
  }
  public set pokemonList(value: Pokemon[]) {
    this._pokemonList = value;
  }

  public add(newPokename: String) {
    let newPoke: Pokemon = {name: newPokename }
    //localStorage.setItem("pokeList",this.concatList(this._pokemonList).toString());
    this.db.pokeStorage.put(newPoke)

    this.db.pokeStorage.toArray().then(
      (result) => {
        this._pokemonList = result
        this.onEvent.next('updated!')
      }
    )

  }

  public deletePokemon(id: number) {
    this.db.pokeStorage.delete(id);

    this.db.pokeStorage.toArray().then(
      (result) => {
        this._pokemonList = result
        this.onEvent.next('updated!')
      }
    )

  }

  public concatList(pokeList: String[]): String {

    var concatList: String = ""

    for (let pokemon of pokeList) {
      console.info(pokemon.toString())
      concatList = concatList.concat("|");
      concatList = concatList.concat(pokemon.toString());
      console.info("within concat function", pokemon)
    }

    return concatList;
  }


  // public async getFromDexie() {
  //   console.info('getting from local');

  //   const pokeList = await this.db.pokeStorage.toArray();

  //   console.info(pokeList)

  //   if (pokeList.length <= 0) {
  //   } else {
  //     console.info('>>>populating pokelist')
  //     let pokeListString: String[] = []
  //     for (let pokemon of pokeList) {
  //       pokeListString.push(pokemon.value)
  //     }
  //     this._pokemonList = pokeListString;
  //     console.info(this._pokemonList)
  //   }
  // }

}

export class MyDatabase extends Dexie {
  // Define the schema of the database
  pokeStorage: Dexie.Table<Pokemon, number>;

  constructor() {
    super('testDatabase');

    // Define the tables and indexes
    this.version(1).stores({
      createdTable: '++pokeId'
    });

    // Set the reference to the tables
    this.pokeStorage = this.table('createdTable');
  }
}
