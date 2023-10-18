import { GetAllResultItemDto } from './getall-result-item-dto';

export interface GetAllPokemonResponseDto {
  count: number;
  next: string;
  results: Array<GetAllResultItemDto>;
}
