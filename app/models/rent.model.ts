import {
    Table,
    Column,
    Model,
    ForeignKey,
    PrimaryKey,
    AutoIncrement,
    BelongsTo,
    DefaultScope, Scopes
} from 'sequelize-typescript';
import { Renter } from './renter.model';
import { Stock } from './stock.model';

/*@DefaultScope ({
    include: [
        {
            as: 'stock',
            model: () => Stock
        },
        {
            as: 'renter',
            model: () => Renter
        }
    ]
}) */

@DefaultScope({
    attributes: ['startDate', 'price']
})

@Scopes({
    unrent: {
        attributes: ['id', 'renterId', 'stockId']
    }
})

@Table
export class Rent extends Model<Rent> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    startDate: Date;

    @Column
    price: number;

    @ForeignKey(() => Renter)
    @Column
    renterId: number;

    @BelongsTo(() => Renter)
    renter: Renter;

    @ForeignKey(() => Stock)
    @Column
    stockId: number;

    @BelongsTo(() => Stock)
    stock: Stock;
}