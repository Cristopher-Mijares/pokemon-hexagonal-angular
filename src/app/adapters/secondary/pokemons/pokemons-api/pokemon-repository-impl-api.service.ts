import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PokemonRepository } from 'src/app/core/usecases/ports/secondary/pokemon-repository';
import { Pokemon } from 'src/app/core/domain/entities/pokemon';
import { GetAllPokemonResponseDto } from './dto/get-all-pokemons-response-dto';
import { GetAllResultItem } from './dto/getall-result-item-dto';

@Injectable({
  providedIn: 'root',
})
export class PokemonRepositoryImplAPIService implements PokemonRepository {
  constructor(private http: HttpClient) {}

  getAllPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<GetAllPokemonResponseDto>('https://pokeapi.co/api/v2/pokemon/')
      .pipe(
        map((response: GetAllPokemonResponseDto) => {
          let pokemons: Pokemon[] = [];
          response.results.forEach((resultItem: GetAllResultItem, index) => {
            pokemons.push({
              id: parseInt(resultItem.url.charAt(resultItem.url.length - 2)),
              name: resultItem.name,
              order: index,
              weight: 0,
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
