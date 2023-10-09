import { Module } from '@nestjs/common';
import { CorporateController } from './corporate.controller';
import { CorporateService } from './corporate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Corporate } from './models/corporate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Corporate]),
    CommonModule,
  ],
  controllers: [CorporateController],
  providers: [CorporateService]
})
export class CorporateModule {}
