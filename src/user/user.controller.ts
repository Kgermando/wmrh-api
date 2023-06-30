import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { User } from './models/user.entity';
import { UserCreateDto } from './models/user-create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './models/user-update.dto';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express'; 

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  
    @Get('get-all/:code_entreprise')
    async getAll(
      @Param('code_entreprise') code_entreprise: string,
    ) {
      return this.userService.all(code_entreprise);
    }


    @Get(':code_entreprise')
    async all(
        @Query('page') page = 1,
        @Param('code_entreprise') code_entreprise: string,
        ) {
        return this.userService.paginate(page, code_entreprise);
    }

    @Post()
    async create(@Body() body: UserCreateDto): Promise<User> {
      const password = await bcrypt.hash('1234', 12); 
      return this.userService.create({ 
        body, 
        password, 
      });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userService.findOne({where: {id}});
  }


  @Put('info')
  async updateInfo(
    @Req() request: Request,
    @Body() body: UserUpdateDto ) {
    const id = await this.authService.userId(request);

    await this.userService.update(id, body); 
    
    return this.userService.findOne({where: {id}});
  }


  @Put('password')  
  async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
  ) {
    if(password !== password_confirm) {
      throw new BadRequestException("Mot de passe de correspond pas.");
  }
    const id = await this.authService.userId(request);

    const hashed = await bcrypt.hash(password, 12);

    await this.userService.update(id, {
      password: hashed
    }); 
    
    return this.userService.findOne({where: {id}});
  }


  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UserUpdateDto
  ) { 

    await this.userService.update(id, {
      body, 
    }); 
    return this.userService.findOne({where: {id}});
  }

  @Delete(':id')
  async delete(
    @Param(':id') id: number
  ) {
    return this.userService.delete(id);
  }
}
 