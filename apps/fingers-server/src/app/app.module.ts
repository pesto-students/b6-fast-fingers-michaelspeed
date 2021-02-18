import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ServicesModule} from "./services/services.module";
import {ApiModule} from "./api/api.module";

@Module({
  imports: [
    ServicesModule.forRoot(),
    ApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
