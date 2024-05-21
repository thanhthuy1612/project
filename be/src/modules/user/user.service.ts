import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/models/UserScheme';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../auth/auth.dto';
import { returnUser } from 'src/global/utils';
import { join } from 'path';
import { unlink } from 'fs';
import { ChangeEmailDto, ChangePasswordDto } from './user.dto';

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

  async loginGoogle({ email }: { email: string }): Promise<any> {
    try {
      const emailInDb = await this.userModel.find({ email });
      if (emailInDb.length > 0) {
        return emailInDb[0];
      }
      const newUser = await this.userModel.create({
        username: email.split('@')[0],
        email,
        timeJoin: new Date(),
      });
      return newUser;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error connect google', HttpStatus.UNAUTHORIZED);
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
        return 'User and email already exists.';
      }

      if (userInDb.length > 0) {
        return 'User already exists.';
      }

      if (emailInDb.length > 0) {
        return 'Email already exists.';
      }

      const newUser = await this.userModel.create({
        ...user,
        timeJoin: new Date(),
      });
      return newUser;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error create account', HttpStatus.UNAUTHORIZED);
    }
  }

  async changePassword(user: ChangePasswordDto): Promise<any> {
    try {
      const emailInDb = await this.userModel.find({
        email: user.email,
      });

      if (!emailInDb.length) {
        return 'Email not found.';
      }

      if (emailInDb[0]?.password) {
        const is_equal = bcrypt.compareSync(
          user.oldPassword,
          emailInDb[0].password,
        );

        if (!is_equal) {
          return 'The password you entered is incorrect.';
        }
      }

      const password = await bcrypt.hash(user.newPassword, 10);
      const findUser = await this.userModel.findOneAndUpdate(
        { email: user.email },
        { password },
      );
      findUser.password = password;
      return returnUser(findUser);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error Login', HttpStatus.UNAUTHORIZED);
    }
  }

  async changeEmail(user: ChangeEmailDto): Promise<any> {
    try {
      const userInDb = await this.userModel.find({
        email: user.username,
      });

      if (userInDb.length && userInDb[0].email === user.email) {
        return 'The email you entered is same the old email.';
      }

      const emailInDb = await this.userModel.find({
        email: user.email,
      });

      if (emailInDb.length) {
        return 'Email already exists.';
      }

      if (userInDb[0]?.password) {
        const is_equal = bcrypt.compareSync(
          user.password,
          userInDb[0].password,
        );

        if (!is_equal) {
          return 'The password you entered is incorrect.';
        }
      }

      const findUser = await this.userModel.findOneAndUpdate(
        { username: user.username },
        { email: user.email },
      );
      findUser.email = user.email;
      return returnUser(findUser);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error Login', HttpStatus.UNAUTHORIZED);
    }
  }

  async findLogin(user: LoginDto): Promise<User | string> {
    try {
      const emailInDb = await this.userModel.find({
        email: user.email,
      });

      if (!emailInDb.length) {
        return 'Email not found.';
      }

      const is_equal = bcrypt.compareSync(user.password, emailInDb[0].password);

      if (!is_equal) {
        return 'Invalid credentials.';
      }

      return emailInDb[0];
    } catch (error) {
      console.log(error);
      throw new HttpException('Error Login', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByEmail(email: string): Promise<any> {
    try {
      const findUser = await this.userModel.find({ email });
      if (!findUser) {
        return 'User not found.';
      }
      return returnUser(findUser[0]);
    } catch (error) {
      console.log(error);
      return 'Error';
    }
  }

  deleteImage(imagePath: string): Promise<void> {
    const fullPath = join(__dirname, '../uploads/', imagePath);
    return new Promise((resolve, reject) => {
      unlink(fullPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async findAndUpdate(user: User): Promise<any> {
    try {
      const checkNewUserName = await this.userModel.find({
        username: user.username,
      });
      if (
        checkNewUserName?.length &&
        checkNewUserName[0].email !== user.email
      ) {
        return 'Username already exists.';
      }
      const findUser = await this.userModel.findOneAndUpdate(
        { email: user.email },
        {
          ...user,
        },
      );
      if (!findUser) {
        return 'User not found.';
      }
      if (findUser?.ava !== user?.ava && findUser?.ava) {
        this.deleteImage(findUser?.ava);
      }
      if (findUser?.banner !== user?.banner && findUser?.banner) {
        this.deleteImage(findUser?.banner);
      }
      return returnUser(user);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
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
