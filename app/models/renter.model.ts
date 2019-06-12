import {
  Table,
  Column,
  Model,
  BelongsToMany,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import {Stock} from './stock.model';
import {Rent}  from './rent.model';


@Table
export class Renter extends Model<Renter> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @BelongsToMany(() => Stock, () => Rent)
  stocks: Stock[];
}