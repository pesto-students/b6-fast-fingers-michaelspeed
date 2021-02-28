import {Body, Controller, Post, Headers} from "@nestjs/common";
import {Crud, CrudController} from "@nestjsx/crud";
import {Session} from "@fast-fingers/entities";
import {SessionsService} from "../../../services";

@Crud({
  model: {
    type: Session
  },
  routes: {
    exclude: ["createOneBase", "createManyBase"]
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  query: {
    join: {
      user: {
        eager: true,
        required: true
      }
    }
  }
})
@Controller('sessions')
export class SessionsController implements CrudController<Session> {
  constructor(public service: SessionsService) {}

  @Post('create')
  async createSession(@Body() body, @Headers('Authorization') token: string): Promise<Session> {
    return this.service.onCreateSession({difficulty: body.difficulty, token})
  }
}
