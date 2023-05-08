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
    localStorage.setItem("pokeList",this.concatList(this._pokemonList).toString());
  }

  public deletePokemon(index: number){
    this.pokemonList.splice(index,1);
    localStorage.setItem("pokeList",this.concatList(this._pokemonList).toString());
  }

  public concatList(pokeList: String[]): String{

    var concatList: String = ""

    for(let pokemon of pokeList){
      console.info(pokemon.toString())
      concatList = concatList.concat("|");
      concatList = concatList.concat(pokemon.toString());
      console.info("within concat function", pokemon)
    }

    return concatList;
  }

  public getFromLocal(){
    console.info('getting from local');

    //@ts-ignore
    if(localStorage.getItem("pokeList")==null || localStorage.getItem("pokeList")?.length <=0){
      let pokeList = this.concatList(this._pokemonList).toString();

      console.info(this._pokemonList)
      console.info('concatted',pokeList);

      localStorage.setItem("pokeList",pokeList);
    } else{

      //@ts-ignore
      this._pokemonList = localStorage.getItem("pokeList").split("|").filter(x=>x.length>0)
      for(let pokemon of this._pokemonList){
        console.log(pokemon)
      }

    }


  }

}
