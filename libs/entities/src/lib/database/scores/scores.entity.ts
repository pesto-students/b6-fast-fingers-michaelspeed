import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "../../../";

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
}
