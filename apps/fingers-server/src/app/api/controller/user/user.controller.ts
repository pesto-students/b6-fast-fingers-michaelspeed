import {Body, Controller, Post} from "@nestjs/common";
import {Crud, CrudAuth, CrudController} from "@nestjsx/crud";
import {UserService} from "../../../services";
import {AuthInterface, AuthResponseInterface, User} from "@fast-fingers/entities";

@Crud({
  model: {
    type: User
  },
  routes: {
    exclude: ["createOneBase", "createManyBase", "updateOneBase", "replaceOneBase"]
  }
})
@CrudAuth({
  filter: (user: User) => ({
    id: user.id,
  }),
})
@Controller("user")
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @Post('login')
  async LoginUser(@Body() body: AuthInterface): Promise<AuthResponseInterface> {
    return this.service.userValidator({email: body.email, password: body.password})
  }
}
