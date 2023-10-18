import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/core/domain/entities/pokemon';
/**
 * We are using Abtract Classes because Angular does not support dependency injection using intarfaces
 */
export interface PokemonRepository {
  getAllPokemons(): Observable<Pokemon[]>;
  searchPokemonsByName(name: string): Observable<Pokemon[]>;
  getPokemonById(id: number): Observable<Pokemon>;
}
