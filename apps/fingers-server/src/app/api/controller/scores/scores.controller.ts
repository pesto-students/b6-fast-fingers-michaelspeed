import {Crud, CrudController} from "@nestjsx/crud";
import {Controller, Get, Param} from "@nestjs/common";
import {Scores} from "@fast-fingers/entities";
import {ScoresService} from "../../../services";

@Crud({
  model: {
    type: Scores
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})
@Controller("scores")
export class ScoresController implements CrudController<Scores> {
  constructor(public service: ScoresService) {}

  @Get('myscores/:userId/:take')
  async getMyScores(@Param() data) {
    return this.service.getMyScores(data);
  }
}
