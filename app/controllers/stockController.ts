import { Request, Response } from 'express';
//import {MyError} from "../models/IError";

import {Stock} from "../models/stock.model";
import {Renter} from "../models/renter.model";

class StockController {

  constructor( ) {

  }

  // EXPRESS

  public showStocks = (req: Request, res: Response) => {
    Stock.findAll()
      .then(stocks => {
        res.json(stocks);
      });
  };

  public showStock = (req: Request, res: Response) => {
    Stock.findByPk(req.params.id)
      .then(stock => {
        if (stock === null)
          throw new Error('Stock not found');
        res.json(stock);
      })
  };

  public declineRenter = (req: Request, res: Response) => {
  };

  public renterList = (req: Request, res: Response) => {
    Stock.findByPk(req.params.id)
      .then(stock => {
        if (stock === null)
          throw new Error('Stock not found');
        return stock;
      })
      .then(stock => stock.$get('renters'))
      .then(renters => res.json(renters));
  };

  public create = (req: Request, res: Response) => {
    Stock.create({name: req.body.name, availableCells: req.body.availableCells})
      .then(stock => stock.save())
      .then(() => res.json({status: 'Success'}))
  };

  public delete = (req: Request, res: Response) => {
    Stock.findByPk(req.params.id)
      .then(stock => {
        if (stock === null)
          throw new Error('Stock not found')
        return stock;
      })
      .then(stock => stock.save())
      .then(() => res.json('Success'))
  };


}

export = StockController;