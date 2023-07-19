import { Module } from '@nestjs/common';
import { SalairesService } from './salaires.service';
import { SalairesController } from './salaires.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Salaire } from './models/salaire.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Salaire]),
    CommonModule,
  ],
  providers: [SalairesService],
  controllers: [SalairesController]
})
export class SalairesModule {}
