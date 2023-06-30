import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CommonModule } from 'src/common/common.module';
import { AuthService } from './auth.service'; 
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    CommonModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
