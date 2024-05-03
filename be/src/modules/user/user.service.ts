import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/models/UserScheme';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../auth/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  async connectEmail(email: string): Promise<User | string> {
    try {
      const emailInDb = await this.userModel.find({ email });

      if (emailInDb.length > 0) {
        return emailInDb[0];
      }

      // const newUser = await this.userModel.create({ username: email, email });
      // return newUser;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error Connect', HttpStatus.UNAUTHORIZED);
    }
  }

  async create(user: User): Promise<User | string> {
    try {
      user.password = await bcrypt.hash(user.password, 10);

      const userInDb = await this.userModel.find({
        username: user.username,
      });

      const emailInDb = await this.userModel.find({
        email: user.email,
      });

      if (userInDb.length > 0 && emailInDb.length > 0) {
        return 'User and email already exists';
      }

      if (userInDb.length > 0) {
        return 'User already exists';
      }

      if (emailInDb.length > 0) {
        return 'Email already exists';
      }

      const newUser = await this.userModel.create(user);
      return newUser;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error create account', HttpStatus.UNAUTHORIZED);
    }
  }

  async findLogin(user: LoginDto): Promise<User | string> {
    try {
      const emailInDb = await this.userModel.find({
        email: user.email,
      });

      if (!emailInDb.length) {
        return 'Email not found';
      }

      const is_equal = bcrypt.compareSync(user.password, emailInDb[0].password);

      if (!is_equal) {
        return 'Invalid credentials';
      }

      return emailInDb[0];
    } catch (error) {
      console.log(error);
      throw new HttpException('Error Login', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByEmail(email: string): Promise<User | string> {
    try {
      const findUser = await this.userModel.find({ email });
      if (!findUser) {
        return 'User not found';
      }
      return findUser[0];
    } catch (error) {
      console.log(error);
      return 'Error';
    }
  }

  async checkByEmail(email: string): Promise<User> {
    try {
      const findUser = await this.userModel.find({ email });
      if (!findUser) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }
      return findUser[0];
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  async findAndUpdateByEmail(email: string): Promise<User> {
    try {
      const findUser = await this.userModel.findOneAndUpdate(
        { email },
        {
          refreshToken: null,
        },
      );
      return findUser;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  async update(id: string, user): Promise<User> {
    try {
      const newUser = await this.userModel.findByIdAndUpdate(id, user);
      return newUser;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }
}
