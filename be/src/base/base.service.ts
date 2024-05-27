import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

@Injectable()
export class BaseService<T extends Document> {
  constructor(@InjectModel('BaseModel') private readonly model: Model<T>) {}

  async createNew(data: any): Promise<T> {
    try {
      const createdItem = new this.model(data);
      return await createdItem.save();
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T | null> {
    try {
      const res = await this.model.findOne(filterQuery);
      return res;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  async find(filterQuery: FilterQuery<T>): Promise<T[]> {
    try {
      const res = await this.model.find(filterQuery);
      return res;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  async findAll(): Promise<T[]> {
    try {
      const res = await this.model.find();
      return res;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      const res = await this.model.findById(id);
      return res;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  async update(id: string, updateQuery: UpdateQuery<T>): Promise<T | null> {
    try {
      const res = await this.model.findByIdAndUpdate(id, updateQuery, {
        new: true,
      });
      return res;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }

  async delete(id: string): Promise<T | null> {
    try {
      const res = await this.model.findByIdAndDelete(id);
      return res;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }
  }
}
