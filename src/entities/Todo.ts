import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Author } from "./Author";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column()
  deadline: Date;

  @Column()
  priority: string;

  @ManyToOne(() => Author, (author) => author.todos, {
    createForeignKeyConstraints: false,
  })
  author: Author;
}
