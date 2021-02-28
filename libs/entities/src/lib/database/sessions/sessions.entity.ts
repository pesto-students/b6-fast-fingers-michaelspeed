import {
  Column,
  CreateDateColumn,
  Entity, ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {DifficultyEnum} from "../../enum/difficulty.enum";
import { Scores } from '../scores/scores.entity';
import { User } from '../user/user.entity';
import {Words} from "../words/words.entity";

@Entity()
export class Session {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne('User','session')
  user: User;

  @Column({type: "enum", enum: DifficultyEnum, default: DifficultyEnum.EASY})
  difficulty: DifficultyEnum;

  @OneToMany('Scores', 'score')
  scores: Scores[];

  @Column({default: false})
  invalidate: boolean;

  @ManyToMany('Words', 'session')
  words: Words[];

}
