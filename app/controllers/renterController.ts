import {Renter} from "../models/renter.model";
import {Stock} from "../models/stock.model";
import {Rent} from  '../models/rent.model';
import {Request, Response} from 'express';
import {rejects} from "assert";


class RenterController {

  constructor() {

  }

  /*----------EXPRESS----------*/


  public rentStock = (req: Request, res: Response) => {

    this.findRenter(req.params.id)
      .then((renter) => {
      this.findStock(req.body.stockId)
        .then(stock => {
          renter.$add('stocks', stock, {});
          return renter;
        })
        .then(renter => renter.save())
        .then(
          () => res.json('ыыыыы')
        )
    })
  };


  public unrentStock = (req: Request, res: Response) => {

  };

  public stockList = (req: Request, res: Response): void => {
    Renter.findByPk(req.params.id).then(renter => {
      if(!renter)
        throw new Error('Renter not found');
      renter.$get('stocks')
        .then(stocks => res.json(stocks));
    });
  };

  public showRenters = (req: Request, res: Response): void => {
    Renter.findAll()
      .then(renters => {
        res.json(renters);
      });
  };

  public showRenter = (req: Request, res: Response): void => {
    Renter.findByPk(req.params.id).then(renter => {
      if (renter === null)
        throw new Error('Renter not found');
      res.json(renter);
    })
  };

  public createRenter = (req: Request, res: Response): void => {
    Renter.create({name: req.body.name})
      .then(renter => renter.save())
      .then(() => res.json({status: 'Success'}))
  };

  public deleteRenter = (req: Request, res: Response): void => {
    Renter.findByPk(req.params.id)
      .then(renter => {
        if (renter === null)
          throw new Error('Renter not found');
        return renter;
      })
      .then(renter => renter.destroy())
      .then(() => res.json('success'));
  };

  private findStock = (id: number): Promise<Stock> => {
    return new Promise<Stock>(resolve => {
      Stock.findByPk(id).then((stock) => {
        if (stock !== null)
          resolve(stock);
        else
          throw 'Stock not found';
      });
    });
  };
  private findRenter = (id: number): Promise<Renter> => {
    return new Promise<Renter>(resolve => {
      Renter.findByPk(id).then((renter) => {
        if (renter !== null)
          resolve(renter);
        else
          throw 'Renter not found';
      });
    });
  };

}
export = RenterController;