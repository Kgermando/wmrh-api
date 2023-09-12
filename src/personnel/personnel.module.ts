import { Module, forwardRef } from '@nestjs/common';
import { PersonnelController } from './personnel.controller';
import { PersonnelService } from './personnel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';
import { Personnel } from './models/personnel.entity';
import { SalairesModule } from 'src/salaires/salaires.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Personnel]), 
    forwardRef(() => AuthModule),
    forwardRef(() => SalairesModule),
    CommonModule,
  ],
  controllers: [PersonnelController],
  providers: [PersonnelService],
  exports: [PersonnelService]
})
export class PersonnelModule {}
