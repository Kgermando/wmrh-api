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
import { DashboardModule } from './dashboard/dashboard.module';
import { PersonnelModule } from './personnel/personnel.module';
import { AvanceSalaireModule } from './avance-salaire/avance-salaire.module';
import { HeuresSuppModule } from './heures-supp/heures-supp.module';
import { SalairesModule } from './salaires/salaires.module';
import { PerformenceModule } from './performence/performence.module';
import { PresEntrepriseModule } from './pres-entreprise/pres-entreprise.module';
import { MailModule } from './mail/mail.module';
import { AbonnementsModule } from './abonnements/abonnements.module';
import { NotificationModule } from './notification/notification.module';
import { NotifyModule } from './notify/notify.module';
import { EntrepriseModule } from './admin/entreprise/entreprise.module';
import { AbonnementClientModule } from './admin/abonnement_client/abonnement_client.module';


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
        ssl: true,
        dialectOptions: {
          ssl: { required: true },
        },
        // host: configService.get('database.host'),
        // port: configService.get('database.port'),
        // username: configService.get('database.username'),
        // password: configService.get('database.password'),
        // database: configService.get('database.database'),
        // ssl: configService.get('database.ssl'),
        // entities: configService.get('database.entities'),
        // migrations: configService.get('database.migrations'),
        // extra: configService.get('database.extra'),
        // logging: configService.get('database.logging'),
        // cli: configService.get('database.cli'),
        
        // ssl:  { 
        //   rejectUnauthorized: false,
        //   require: true,
        // },
        // ssl: process.env.NODE_ENV === "production" ? {
        //   rejectUnauthorized: false,
        // } : null, 
        autoLoadEntities: true,
        synchronize: true,
        // options: {"trustServerCertificate": true}
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
    DashboardModule,
    AvanceSalaireModule,
    HeuresSuppModule,
    SalairesModule,
    PerformenceModule,
    PresEntrepriseModule,
    MailModule,
    AbonnementsModule,
    NotificationModule,
    NotifyModule,
    EntrepriseModule,
    AbonnementClientModule,
  ],
})
export class AppModule {}
