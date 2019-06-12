import express = require('express');
import stockController = require('../controllers/stockController');
import renterController = require('../controllers/renterController');
import { check, validationResult } from 'express-validator/check';


class ApiRouter {
  public router: express.Router = express.Router();

  private renterController: renterController;
  private stockController: stockController;

  constructor() {
    this.stockController  = new stockController();
    this.renterController = new renterController();
    this.config();
  }

  private config(): void {

    //test
    this.router.get('/test', this.renterController.testSpeed);

    // Renter paths
    this.router.get('/renters',            this.renterController.showRenters);   // show all renters
    this.router.get('/renters/:id',        this.renterController.showRenter);    // Show renter info
    this.router.get('/renters/:id/stocks', this.renterController.stockList);     // Show all stocks for renter

    this.router.post('/renters/',          this.renterController.createRenter);  // Create renter
    this.router.post('/renters/:id/rent',  this.renterController.rentStock);     // renting a stock  (body: stockID=value&price=value)

    // Stock paths
    this.router.get('/stocks',                    this.stockController.showStocks);     // all stocks
    this.router.get('/stocks/:id',                this.stockController.showStock);      // stock by id
    this.router.get('/stocks/:id/renters',        this.stockController.renterList);     // Show all renters for stock

    this.router.post('/stocks/',                  this.stockController.create);
    this.router.post('/stocks/:id/declineRenter', this.stockController.declineRenter);

    this.router.delete('/renters/:id',                this.renterController.deleteRenter);
    this.router.delete('/stocks/:id',             this.stockController.delete);
    this.router.delete('/renters/:id/rent',       this.renterController.unrentStock);   // unrenting stock  (body: stockID=value)

  }

}
export = new ApiRouter().router;
