import {Controller} from "@nestjs/common";
import {User} from "../../../database";
import {Crud, CrudController} from "@nestjsx/crud";
import {UserService} from "../../../services";

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
