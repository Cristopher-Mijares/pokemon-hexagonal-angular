import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PokemonRepository } from 'src/app/core/usecases/ports/secondary/pokemon-repository';
import { Pokemon } from 'src/app/core/domain/entities/pokemon';
import { GetAllPokemonResponseDto } from './dto/get-all-pokemons-response-dto';
import { GetAllResultItemDto } from './dto/getall-result-item-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonRepositoryImplAPIService implements PokemonRepository {
  constructor(private http: HttpClient) {}

  getAllPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<GetAllPokemonResponseDto>(environment['pokeapi-url'])
      .pipe(
        map((response: GetAllPokemonResponseDto) => {
          let pokemons: Pokemon[] = [];
          response.results.forEach((resultItem: GetAllResultItemDto, index) => {
            let pokemonId: number = parseInt(
              resultItem.url.split('/').reverse()[1]
            );
            pokemons.push({
              id: pokemonId,
              name: resultItem.name,
              imageUrl: environment['pokeapi-imgs-url'] + pokemonId + '.png',
            });
          });
          return pokemons;
        })
      );
  }
  searchPokemonsByName(name: string): Observable<Pokemon[]> {
    throw new Error('Method not implemented.');
  }
  getPokemonById(id: number): Observable<Pokemon> {
    throw new Error('Method not implemented.');
  }
}
