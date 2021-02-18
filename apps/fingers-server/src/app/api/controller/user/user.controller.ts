import {Controller} from "@nestjs/common";
import {Crud, CrudController} from "@nestjsx/crud";
import {UserService} from "../../../services";
import {User} from "@fast-fingers/entities";

@Crud({
  model: {
    type: User
  },
  routes: {
    exclude: ["createOneBase", "createManyBase", "updateOneBase", "replaceOneBase"]
  }
})
@Controller("user")
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
