import {Crud, CrudController} from "@nestjsx/crud";
import {Scores} from "../../../database";
import {ScoresService} from "../../../services";
import {Controller} from "@nestjs/common";

@Crud({
  model: {
    type: Scores
  }
})
@Controller()
export class ScoresController implements CrudController<Scores> {
  constructor(public service: ScoresService) {}
}
