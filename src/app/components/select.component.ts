import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MyDatabase, PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../model/pokemon';
import { Subscription,lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  form !: FormGroup
  pokemonList: Pokemon[] = []

  constructor(private formBuilder: FormBuilder, private router: Router, private pokeSvc: PokemonService) {

  }

  ngOnInit() {
    this.form = this.createForm();
    //this.pokeSvc.getFromDexie();

    this.pokeSvc.onEvent.subscribe(
      (data)=>{
        console.info(data)
        this.pokemonList = this.pokeSvc.pokemonList
      }
    )

    this.pokeSvc.db.pokeStorage.toArray().then(
      (result) => {
        //check if Dexie has values, if not populate Dexie
        if (result.length <= 0) {
          this.pokemonList = this.pokeSvc.pokemonList;

          for (let pokemon of this.pokemonList) {
            this.pokeSvc.db.pokeStorage.put(pokemon)
          }
          
        } else {
          //if it has values, populate Svc from Dexie, then assign list to this component
          this.pokeSvc.pokemonList = result;
          this.pokemonList = this.pokeSvc.pokemonList;
        }

      }
    )

    //console.info(">>>retrieved:", localStorage.getItem("pokeList"))

  }

  ngOnDestroy(): void {

  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      pokemonName: this.formBuilder.control('')
    });
  }

  add() {
    console.info('>>>adding',this.form.value['pokemonName'])
    
    this.pokeSvc.add(this.form.value['pokemonName'])

    // let newPoke: Pokemon = { name: this.form.value['pokemonName'] }

    // this.pokeSvc.db.pokeStorage.put(newPoke)

    // this.pokeSvc.db.pokeStorage.toArray().then(
    //   (result) => {
    //     this.pokeSvc.pokemonList = result
    //     //this.pokemonList = this.pokeSvc.pokemonList
    //     this.pokeSvc.onEvent.next('update pokeList');
    //   }
    // )

  }

  deletePokemon(pokemon: Pokemon) {
    console.info("deleting", pokemon.pokeId)
    //@ts-ignore
    this.pokeSvc.deletePokemon(pokemon.pokeId);
  }

  test(){
    // this.pokeSvc.onEvent.subscribe(
    //   (data)=>{
    //     console.info(data)
    //     this.pokemonList = this.pokeSvc.pokemonList
    //   }
    // )
    
    this.pokeSvc.onEvent.next('update pokeList');


    
  }

}
