import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private httpClient: HttpClient) { }

  private _pokemonList: String[] = [
    'Pikachu',
    'Bulbasaur',
    'Charizard'
  ];

  db = new MyDatabase()

  public get pokemonList(): String[] {
    return this._pokemonList;
  }
  public set pokemonList(value: String[]) {
    this._pokemonList = value;
  }

  public add(newPoke: String) {
    this._pokemonList.push(newPoke);
    //localStorage.setItem("pokeList",this.concatList(this._pokemonList).toString());
    this.db.pokeStorage.put({value:newPoke})

  }

  public deletePokemon(index: number) {
    this.pokemonList.splice(index, 1);
    //localStorage.setItem("pokeList", this.concatList(this._pokemonList).toString());
    this.db.pokeStorage.delete(index);
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

  public getFromLocal() {
    console.info('getting from local');

    //@ts-ignore
    if (localStorage.getItem("pokeList") == null || localStorage.getItem("pokeList")?.length <= 0) {
      let pokeList = this.concatList(this._pokemonList).toString();

      console.info(this._pokemonList)
      console.info('concatted', pokeList);

      localStorage.setItem("pokeList", pokeList);
    } else {

      //@ts-ignore
      this._pokemonList = localStorage.getItem("pokeList").split("|").filter(x => x.length > 0)
      for (let pokemon of this._pokemonList) {
        console.log(pokemon)
      }

    }
  }

  public async getFromDexie() {
    console.info('getting from local');

    const pokeList = await this.db.pokeStorage.toArray();

    console.info(pokeList)

    if (pokeList.length <= 0) {
    } else {
      console.info('>>>populating pokelist')
      let pokeListString: String[] = []
      for (let pokemon of pokeList) {
        pokeListString.push(pokemon.value)
      }
      this._pokemonList = pokeListString;
      console.info(this._pokemonList)
    }


  }
}

export class MyDatabase extends Dexie {
  // Define the schema of the database
  pokeStorage: Dexie.Table<{ value: String }, number>;

  constructor() {
    super('testDatabase');

    // Define the tables and indexes
    this.version(1).stores({
      createdTable: '++id'
    });

    // Set the reference to the tables
    this.pokeStorage = this.table('createdTable');
  }
}
