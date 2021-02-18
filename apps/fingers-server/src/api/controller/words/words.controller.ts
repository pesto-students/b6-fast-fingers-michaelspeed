import {Crud, CrudController} from "@nestjsx/crud";
import {Controller} from "@nestjs/common";
import {Words} from "../../../database";
import {WordsService} from "../../../services";

@Crud({
  model: {
    type: Words,
  },
  routes: {
    exclude: ["createManyBase", "createOneBase"]
  }
})
@Controller()
export class WordsController implements CrudController<Words> {
  constructor(public service: WordsService) {}
}
