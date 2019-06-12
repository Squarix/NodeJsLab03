import {Renter} from "../models/renter.model";
import {Stock} from "../models/stock.model";
import {Rent} from  '../models/rent.model';
import {Test} from '../models/test.model';
import {Request, Response} from 'express';

class RenterController {

  private db: any;
  constructor() { }

  /*----------EXPRESS----------*/


  public rentStock = (req: Request, res: Response) => {

    this.findRenter(req.params.id)
      .then((renter) => {
        this.findStock(req.body.stockId)
          .then(stock => {
            if (stock.availableCells > 0)
              return renter.$add('stocks', stock,
                { through: { price: req.body.price, startDate: Date.now() } });
            else
              throw new Error('Stock is full');
          })
          .then(() => res.json('Success'))
      })
  };


  public unrentStock = (req: Request, res: Response) => {
    console.log(req.params.id, req.body.stockId);
    Rent.scope('unrent').findOne({ where: {
        renterId: req.params.id,
        stockId: req.body.stockId
      }}).then(rent => {
        if (rent === null)
          throw new Error('Stock not found');
        res.json(rent.destroy());
    })
  };

  public stockList = (req: Request, res: Response): void => {
    Renter.findByPk(req.params.id).then(renter => {
      if(!renter)
        throw new Error('Renter not found');
      renter.$get('stocks', { propertyScope: 'info'})
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

  public testSpeed = (req: Request, res: Response): void => {
    /*let startTime = process.hrtime();
    console.time('testCreation');
    let promises = [];
    for (let i = 0; i < 0000; i++) {
      promises.push(Renter.create({name: 'test' + i})
        .then(renter => renter.save()));
    }
    Promise.all(promises).then(() => {
      Renter.count().then(amount => console.log(amount));
      console.timeEnd('testCreation');
      let elapsedSeconds = this.parseHrtimeToSeconds(process.hrtime(startTime));
      console.log('It takes ' + elapsedSeconds + 'seconds');
    });*/
  };

  private parseHrtimeToSeconds = (hrtime: any) => {
    var seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
    return seconds;
  }

}
export = RenterController;