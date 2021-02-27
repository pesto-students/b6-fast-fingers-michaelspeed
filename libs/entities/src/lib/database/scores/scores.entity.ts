import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "../../../";
import {Session} from "../sessions/sessions.entity";

@Entity()
export class Scores {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  score: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.scores)
  user: User;

  @ManyToOne(() => Session, session => session.scores)
  session: Session;
}
