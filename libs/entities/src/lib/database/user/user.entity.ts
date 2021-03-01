import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Scores} from "../../../";
import { Exclude } from "class-transformer";
import {Session} from "../sessions/sessions.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Scores, score => score.user)
  scores: Scores[];

  @OneToMany(() => Session, session => session.user)
  session: Session[];
}
