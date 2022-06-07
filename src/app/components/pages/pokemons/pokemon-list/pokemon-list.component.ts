import { Component, OnInit } from '@angular/core';
import { Pokemon } from '@app/shared/interface/pokemon.interface';
import { PokemonService } from '@app/shared/services/pokemon.service';
import { take } from 'rxjs/operators';

type RequestInfo = {
  next: string | null
}

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[] = []

  info : RequestInfo = {
    next: null,
  }
  private pageNum=1
  private query!:string
  private hideScrollHeight = 200
  private showScrollHeight = 500

  constructor(private pokemonSvc: PokemonService) { }

  ngOnInit(): void {
    this.getDataFromService()
  }

  private getDataFromService():void{
    this.pokemonSvc.searchPokemons(this.query, this.pageNum)
    .pipe(take(1)
    ).subscribe((res:any) => {
      console.log(res)
      const{info, results} = res
      this.pokemons = [...this.pokemons, ...results]
      this.info = info
    })
  }

}
