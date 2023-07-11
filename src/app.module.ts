import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { ImageModule } from './image/image.module';
import { DepartementModule } from './departement/departement.module';
import { PreferenceModule } from './preference/preference.module';
import { FonctionModule } from './fonction/fonction.module';
import { SiteLocationModule } from './site-location/site-location.module';
import { TitleModule } from './title/title.module';
import { CandidatureModule } from './candidature/candidature.module';
import { PosteModule } from './poste/poste.module';
import { ServicePrefModule } from './service-pref/service-pref.module';
import { ApointementModule } from './apointement/apointement.module';
import { PrimeModule } from './prime/prime.module';
import { PenaliteModule } from './penalite/penalite.module';
import { SalaireModule } from './salaire/salaire.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PersonnelModule } from './personnel/personnel.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('database.url'),
        ssl: process.env.NODE_ENV === "production" ? {
          rejectUnauthorized: false,
        } : null,
        autoLoadEntities: true,
        synchronize: true,
      }), 
      inject: [ConfigService],
    }),
    CommonModule,
    ImageModule,
    PersonnelModule,
    AuthModule,
    PreferenceModule,
    DepartementModule,
    FonctionModule,
    SiteLocationModule,
    TitleModule,
    ServicePrefModule,
    CandidatureModule,
    PosteModule,
    ApointementModule,
    PrimeModule,
    PenaliteModule,
    SalaireModule,
    DashboardModule, 
  ],
})
export class AppModule {}
