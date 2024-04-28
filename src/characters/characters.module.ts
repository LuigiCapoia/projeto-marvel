import { Module} from '@nestjs/common';
import { ChartersController } from './charters.controller';
import { CharactersService } from './characters.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ChartersController],
  providers: [CharactersService],
})
export class CharactersModule {}
