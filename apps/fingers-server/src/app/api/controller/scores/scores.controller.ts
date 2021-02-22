import {Crud, CrudController} from "@nestjsx/crud";
import {Controller} from "@nestjs/common";
import {Scores} from "@fast-fingers/entities";
import {ScoresService} from "../../../services";

@Crud({
  model: {
    type: Scores
  }
})
@Controller("scores")
export class ScoresController implements CrudController<Scores> {
  constructor(public service: ScoresService) {}
}