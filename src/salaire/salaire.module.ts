import { Module } from '@nestjs/common';
import { SalaireService } from './salaire.service';
import { SalaireController } from './salaire.controller';

@Module({
  providers: [SalaireService],
  controllers: [SalaireController]
})
export class SalaireModule {}
