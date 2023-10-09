import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { CommonModule } from 'src/common/common.module';
import { CorporateReglage } from './models/corporate-reglage.entity';
import { CorporateReglageController } from './corporate-reglage.controller';
import { CorporateReglageService } from './corporate-reglage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CorporateReglage]),
    CommonModule,
  ],
  controllers: [CorporateReglageController],
  providers: [CorporateReglageService]
})
export class CorporateReglageModule {}
