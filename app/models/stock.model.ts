import {Table, Column, Model, BelongsToMany, PrimaryKey, AutoIncrement} from 'sequelize-typescript';
import {Renter} from "./renter.model";
import {Rent} from "./rent.model";

@Table
export class Stock extends Model<Stock>{
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    name: string;

    @Column
    availableCells: number;

    @BelongsToMany(() => Renter, () => Rent)
    renters: Renter[];
}
