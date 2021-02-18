import { Module } from '@nestjs/common';
import {ScoresController} from "./controller/scores/scores.controller";
import {UserController} from "./controller/user/user.controller";
import {WordsController} from "./controller/words/words.controller";
import {ServicesModule} from "../services/services.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Scores, User, Words} from "@fast-fingers/entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([Words, User, Scores]),
    ServicesModule.forRoot()
  ],
  controllers: [
    ScoresController,
    UserController,
    WordsController
  ]
})
export class ApiModule {}
