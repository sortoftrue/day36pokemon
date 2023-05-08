import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  form !: FormGroup
  pokemonList!: String[]

  constructor(private formBuilder: FormBuilder, private router: Router, private pokeSvc: PokemonService){

  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.pokeSvc.getFromLocal();
    this.pokemonList = this.pokeSvc.pokemonList;
    console.info(">>>retrieved:", localStorage.getItem("pokeList"))

}

ngOnDestroy(): void {
    
}

private createForm(): FormGroup {
  return this.formBuilder.group({
    pokemonName: this.formBuilder.control('')
  });
}

add(){
  console.info(this.form.value['pokemonName'])
  this.pokeSvc.add(this.form.value['pokemonName'])
  
}

deletePokemon(index : number){
  console.info("deleting", index)
  this.pokeSvc.deletePokemon(index);
}



}
