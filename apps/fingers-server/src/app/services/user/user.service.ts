import {Injectable, InternalServerErrorException, UnauthorizedException} from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectConnection, InjectRepository} from "@nestjs/typeorm";
import {AuthResponseInterface, User} from "@fast-fingers/entities";
import {JwtService} from "@nestjs/jwt";
import {Connection} from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) repo,
    private readonly jwtService: JwtService,
    @InjectConnection() private connection: Connection,
  ) {
    super(repo)
  }

  private async createToken(userId: string): Promise<string> {
    return new Promise((resolve) => {
      const tokenize = {userId}
      const token = this.jwtService.sign(tokenize)
      resolve(token)
    })
  }

  async userValidator({email, password}): Promise<AuthResponseInterface> {
    const user = await this.repo.findOne({email})
    if (user) {
      return this.LoginUser({email, password})
    } else {
      return this.CreateUser({email, password})
    }
  }

  async CreateUser({email, password}): Promise<AuthResponseInterface> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      console.log(email, password)
      const user = new User();
      user.email = email
      user.password = await bcrypt.hash(password, 10)
      this.connection.getRepository(User).save(user)
        .then(async (value) => {
          const token = await this.createToken(value.id)
          resolve({
            user: this.userFormatter(value),
            token,
          })
        })
        .catch(error => {
          throw new InternalServerErrorException(error.message)
        })
    })
  }

  async LoginUser({email, password}): Promise<AuthResponseInterface> {
    const user = await this.repo.findOne({email:email});
    const valid = await bcrypt.compare(password, user.password)
    if (valid) {
      const token = await this.createToken(user.id)
      return {
        user: this.userFormatter(user),
        token
      }
    } else {
      throw new UnauthorizedException('Email or Password does not match')
    }
  }

  private userFormatter(user: User) {
    return {
      password: null,
      ...user
    }
  }
}
