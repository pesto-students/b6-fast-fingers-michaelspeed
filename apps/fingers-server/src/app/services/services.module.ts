import {DynamicModule, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ScoresService} from "./scores/scores.service";
import {UserService} from "./user/user.service";
import {WordsService} from "./words/words.service";
import {Scores, Session, User, Words} from "@fast-fingers/entities";
import {DB} from "../../../environment";
import {JwtModule} from "@nestjs/jwt";
import {TOKEN} from "../config/constants";
import {SessionsService} from "./sessions/sessions.service";

export const coreService = [
  ScoresService,
  UserService,
  WordsService,
  SessionsService
]

export const entitiesMap = [
  Session,
  User,
  Words,
  Scores
]

let defaultTypeOrmModule: DynamicModule

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: TOKEN,
      signOptions: {
        expiresIn: '365d'
      }
    }),
  ],
  providers: [
    ...coreService.map(item => item)
  ],
  exports: [
    ...coreService.map(item => item)
  ]
})
export class ServicesModule {

  static forRoot(): DynamicModule {
    if (!defaultTypeOrmModule) {
      defaultTypeOrmModule = TypeOrmModule.forRootAsync({
        useFactory: () => {
          return {
            ...DB,
            entities: [
              ...entitiesMap.map(item => item)
            ]
          }
        }
      })
    }
    return {
      module: ServicesModule,
      imports: [
        defaultTypeOrmModule,
        TypeOrmModule.forFeature([...entitiesMap.map(item => item)])
      ]
    }
  }
}
