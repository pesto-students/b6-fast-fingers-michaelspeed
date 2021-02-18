import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Words {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  word: string;

  @Column()
  length: number;
}
