import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users, UsersDocument } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.usersModel(createUserDto);
    return await createdUser.save();
  }

  async findAll() {
    const users = await this.usersModel.find({});
    return users ? users : 'No users found';
  }

  async findOne(id: string) {
    const user = await this.usersModel.findById(id);
    return user ? user : 'User not found';
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true }
    );
    return updatedUser ? updatedUser  : 'User not found';
  }

  async remove (id: string) {
    const deletedItem = await this.usersModel.findByIdAndDelete(id);

    // Manejar el caso en que el elemento no exista
    if (!deletedItem) {
      throw new Error(`Item with ID ${id} not found`);
    }
    return `This action removes a #${id} user`;
  }
}
