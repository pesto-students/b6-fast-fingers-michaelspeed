import {Crud, CrudController} from "@nestjsx/crud";
import {Body, Controller, Get, Post} from "@nestjs/common";
import {WordsService} from "../../../services";
import {Words} from "@fast-fingers/entities";

@Crud({
  model: {
    type: Words,
  },
  routes: {
    exclude: ["createManyBase", "createOneBase"]
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})
@Controller("words")
export class WordsController implements CrudController<Words> {
  constructor(public service: WordsService) {}

  @Post('getWords')
  async getWords(@Body() session): Promise<Words[]> {
    return this.service.getWords(session.id)
  }
}
