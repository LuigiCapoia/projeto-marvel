import { Controller, Get } from '@nestjs/common';
import { Character } from './interfaces/character.interface';
import { CharactersService } from './characters.service';

@Controller('charters')
export class ChartersController {
    constructor(private readonly charactersService: CharactersService) {}

    @Get()
    async getKingInBlackCharacters(): Promise<Character[]> {
      return this.charactersService.getKingInBlackCharacters().toPromise();
    }
}
