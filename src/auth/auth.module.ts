import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CommonModule } from 'src/common/common.module';
import { AuthService } from './auth.service';
import { PersonnelModule } from 'src/personnel/personnel.module';

@Module({
  imports: [
    forwardRef(() => PersonnelModule),
    CommonModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
