import {Controller} from "@nestjs/common";
import {Crud, CrudController} from "@nestjsx/crud";
import {Session} from "@fast-fingers/entities";
import {SessionsService} from "../../../services";

@Crud({
  model: {
    type: Session,
  },
  routes: {
    exclude: ["createOneBase", "createManyBase"]
  }
})
@Controller('sessions')
export class SessionsController implements CrudController<Session> {
  constructor(public service: SessionsService) {}
}
