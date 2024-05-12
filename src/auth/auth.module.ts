import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/decorators/user.decorator';
import { FIleModule } from 'src/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';

@Module({
    imports: [JwtModule.register({
        secret: process.env.JWT_SECRET
    }), 
    forwardRef(() => UserModule),
    FIleModule,
    TypeOrmModule.forFeature([UserEntity])
],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService,]
})
export class AuthModule { }
