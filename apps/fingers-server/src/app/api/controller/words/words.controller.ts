import {Crud, CrudController} from "@nestjsx/crud";
import {Controller} from "@nestjs/common";
import {WordsService} from "../../../services";
import {Words} from "@fast-fingers/entities";

@Crud({
  model: {
    type: Words,
  },
  routes: {
    exclude: ["createManyBase", "createOneBase"]
  }
})
@Controller("words")
export class WordsController implements CrudController<Words> {
  constructor(public service: WordsService) {}
}
