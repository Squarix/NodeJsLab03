import {Table, Column, Model, PrimaryKey, AutoIncrement} from 'sequelize-typescript';

@Table
export class Test extends Model<Test>{
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

}