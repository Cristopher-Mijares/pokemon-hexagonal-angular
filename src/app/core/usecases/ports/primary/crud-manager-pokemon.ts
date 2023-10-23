import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/core/domain/entities/pokemon';

export interface CrudManagerPokemon {
  getAllPokemonsThatEnjoyDanoninos(): Observable<Array<Pokemon>>;
  searchPokemons(name: string): Observable<Array<Pokemon>>;
  getPokemon(id: number): Observable<Pokemon>;
}
