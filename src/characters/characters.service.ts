import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs-extra';
import { Character } from './interfaces/character.interface';

@Injectable()
export class CharactersService {
  private readonly baseURL = 'https://gateway.marvel.com/v1/public';
  private readonly apiKey = '0dd0b406c3d39bfa1c5fc53a94ff15fb'; 
  private readonly hash = 'ee4a874e61228f3c984f58bf56053f94'

  constructor(private httpService: HttpService) {}

  getKingInBlackCharacters(): Observable<Character[]> {
    return this.httpService
      .get(`${this.baseURL}/series/30150`, {
        params: {
          hash:this.hash,
          apikey: this.apiKey,
          ts: 1,
  
        },
      })
      .pipe(
        map((response: AxiosResponse<any>) => {
          const characters = response.data.data.results;
          this.saveCharactersToFile(characters); 
          return characters;
        }),
      );
  }

  private async saveCharactersToFile(characters: Character[]): Promise<void> {
    try {
      await fs.writeJson('characters.json', characters);
      console.log('Dados dos personagens salvos em characters.json');
    } catch (error) {
      console.error('Erro ao salvar dados dos personagens em characters.json:', error);
    }
  }
}


