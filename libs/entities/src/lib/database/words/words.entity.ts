import {Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn} from "typeorm";
import {Session} from "../sessions/sessions.entity";

@Entity()
export class Words {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  word: string;

  @Column()
  length: number;

  @ManyToMany('Session','words')
  @JoinTable()
  session: Session;
}
