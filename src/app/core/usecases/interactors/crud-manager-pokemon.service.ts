import { Inject, Injectable } from '@angular/core';
import { CrudManagerPokemon } from '../ports/primary/crud-manager-pokemon';
import { Observable, catchError, map, of } from 'rxjs';
import { Pokemon } from '../../domain/entities/pokemon';
import { PokemonRepository } from '../ports/secondary/pokemon-repository';

@Injectable({
  providedIn: 'root',
})
export class CrudManagerPokemonService implements CrudManagerPokemon {
  constructor(
    @Inject('PokemonRepository') private _pokemonRepository: PokemonRepository
  ) {}

  getAllPokemonsThatEnjoyDanoninos(): Observable<Pokemon[]> {
    return this._pokemonRepository.getAllPokemons().pipe(
      map((response: Pokemon[]) => {
        let processedResp: Pokemon[] = [];
        response.forEach((itemResponse: Pokemon) => {
          processedResp.push({
            id: itemResponse.id,
            name: itemResponse.name + ' enjoy eating Danoninos :P',
            urlImage: itemResponse.urlImage,
          });
        });
        return processedResp;
      }),
      // We can actually centralize errors control
      catchError((error) => of([]))
    );
  }

  getPokemon(id: number): Observable<Pokemon> {
    return this._pokemonRepository.getPokemonById(id).pipe(
      // We can actually centralize errors control
      catchError((error) => of())
    );
  }

  searchPokemons(name: string): Observable<Pokemon[]> {
    return this._pokemonRepository.searchPokemonsByName(name).pipe(
      // We can actually centralize errors control
      catchError((error) => of([]))
    );
  }
}
