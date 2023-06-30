import { Module } from '@nestjs/common';
import { ServicePrefController } from './service-pref.controller';
import { ServicePrefService } from './service-pref.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { ServicePref } from './models/service-pref.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServicePref]),
    CommonModule,
  ],
  controllers: [ServicePrefController],
  providers: [ServicePrefService]
})
export class ServicePrefModule {}
