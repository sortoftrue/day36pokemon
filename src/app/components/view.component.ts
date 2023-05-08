import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription,lastValueFrom } from 'rxjs';
import { Pokemon } from '../model/pokemon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy{

  private pokemon!: String
  pokeDetails!: Pokemon
  params$! : Subscription;

  constructor(private actRoute: ActivatedRoute, private httpClient : HttpClient){}

  ngOnInit(): void {
    this.params$ = this.actRoute.params.subscribe(
      (params)=>{
        this.pokemon = params['pokemon'];
      }
    );
    this.getPokemonDetailsFromAPI(this.pokemon);
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  getPokemonDetailsFromAPI(name: String){

    const response$: Promise<any> = lastValueFrom(
      this.httpClient.get('https://pokeapi.co/api/v2/pokemon/'+ name.toLowerCase()));

    
    // const response$ = 
    //   this.httpClient.get('https://pokeapi.co/api/v2/pokemon/'+ name.toLowerCase()).subscribe({
        
    //     next: (data) => console.log(data.name)
    //   });
    
    
    console.log(response$)

    response$.then(
      (result)=>{
        console.log(result);
        
        console.log(result.abilities[0].ability.name);
        
        this.pokeDetails = {name: result.name, type: result.types[0].type.name};
        console.log(this.pokeDetails);
      }
    )
  }

}
