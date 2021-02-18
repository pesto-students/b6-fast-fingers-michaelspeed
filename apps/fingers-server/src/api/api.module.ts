import { Module } from '@nestjs/common';
import {ScoresController} from "./controller/scores/scores.controller";
import {UserController} from "./controller/user/user.controller";
import {WordsController} from "./controller/words/words.controller";

@Module({
  controllers: [
    ScoresController,
    UserController,
    WordsController
  ]
})
export class ApiModule {}
