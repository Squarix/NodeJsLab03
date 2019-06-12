import {Table, Column, Model, BelongsToMany, PrimaryKey, AutoIncrement, Scopes} from 'sequelize-typescript';
import {Renter} from "./renter.model";
import {Rent} from "./rent.model";

@Scopes({
    info: {
        attributes: ['name', 'availableCells'],
    }
})

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
