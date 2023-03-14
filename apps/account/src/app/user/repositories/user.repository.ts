import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../models/user.model";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserRepository {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async createUser(user: UserEntity) {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async updateUser({ _id, ...rest }: UserEntity) {
    return this.userModel.updateOne({ _id }, { $set: { ...rest }}).exec();
  }

  async findUser(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async findUserById(id: string) {
    return await this.userModel
      .findById(id)
      .select({
        _id: 1,
        displayName: 1,
        email: 1,
        role: 1,
        books: 1
      })
      .exec();
  }

  async deleteUser(email: string) {
    await this.userModel.deleteOne({ email }).exec();
  }
}
