import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Session} from "../sessions/sessions.entity";

@Entity()
export class Words {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  word: string;

  @Column()
  length: number;

  @ManyToOne('Session','words')
  session: Session;
}
