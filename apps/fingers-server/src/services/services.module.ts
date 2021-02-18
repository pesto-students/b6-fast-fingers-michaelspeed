import {DynamicModule, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ScoresService} from "./scores/scores.service";
import {UserService} from "./user/user.service";
import {WordsService} from "./words/words.service";
import {DB} from "../../environment";

export const coreService = [
  ScoresService,
  UserService,
  WordsService
]

@Module({
  imports: [],
  providers: [
    ...coreService.map(item => item)
  ],
  exports : [
    ...coreService.map(item => item)
  ]
})
export class ServiceCoreModule {}

let defaultTypeOrmModule: DynamicModule

@Module({
  imports: [
    ServiceCoreModule
  ],
  exports: [
    ServiceCoreModule
  ]
})
export class ServicesModule {

  static forRoot(): DynamicModule {
    if (!defaultTypeOrmModule) {
      defaultTypeOrmModule = TypeOrmModule.forRootAsync({
        useFactory: () => {
          return {
            ...DB
          }
        }
      })
    }
  }
}
