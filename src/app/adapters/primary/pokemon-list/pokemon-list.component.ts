import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/core/domain/entities/pokemon';
import { CrudManagerPokemon } from 'src/app/core/usecases/ports/primary/crud-manager-pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {
  public pokemons: Observable<Pokemon[]>;

  constructor(
    @Inject('CrudManagerPokemon')
    private pokemonsCrudManager: CrudManagerPokemon
  ) {
    this.pokemons = this.pokemonsCrudManager.getAllPokemonsThatEnjoyDanoninos();
  }

  ngOnInit() {}
}
