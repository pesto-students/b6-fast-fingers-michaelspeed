import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {UserService} from "../../services";
import {USER_REQUEST_KEY} from "../../config/constants";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    req[USER_REQUEST_KEY] = await this.usersService.findOne(1);

    return true;
  }
}
