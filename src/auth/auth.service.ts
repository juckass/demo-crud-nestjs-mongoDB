import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/users/schemas/users.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private jwtservice: JwtService
  ) {}
  

  async register(userObject: RegisterAuthDto) {

    const { password } = userObject;

    const plainToHast = await hash(password, 10);

    userObject= {...userObject, password: plainToHast};

    const createdUser = new this.usersModel(userObject);
    return await createdUser.save();
  }

  async login(userObject: LoginAuthDto) {

    const { email, password } = userObject;

    const findUser = await this.usersModel.findOne({ email });

    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);
    
    const cheackPassword = await compare(password, findUser.password);

    if (!cheackPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

    const payload = { id: findUser._id, name: findUser.name, email: findUser.email }; 

    const token = this.jwtservice.sign(payload);

    const data  = {
      user: findUser,
      token
    }

    return data;
  }

}


