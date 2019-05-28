import express = require('express');
import stockController = require('../controllers/stockController');
import renterController = require('../controllers/renterController');


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

    // Renter paths
    this.router.get('/api/renters',            this.renterController.showRenters);   // show all renters
    this.router.get('/api/renters/:id',        this.renterController.showRenter);    // Show renter info
    this.router.get('/api/renters/:id/stocks', this.renterController.stockList);     // Show all stocks for renter

    this.router.post('/api/renters/',          this.renterController.createRenter);  // Create renter
    this.router.post('/api/renters/:id/rent',  this.renterController.rentStock);     // renting a stock  (body: stockID=value&price=value)

    // Stock paths
    this.router.get('/api/stocks',                    this.stockController.showStocks);     // all stocks
    this.router.get('/api/stocks/:id',                this.stockController.showStock);      // stock by id
    this.router.get('/api/stocks/:id/renters',        this.stockController.renterList);     // Show all renters for stock

    this.router.post('/api/stocks/',                  this.stockController.create);
    this.router.post('/api/stocks/:id/declineRenter', this.stockController.declineRenter);

    this.router.delete('/api/renters',                this.renterController.deleteRenter);
    this.router.delete('/api/stocks/:id',             this.stockController.delete);
    this.router.delete('/api/renters/:id/rent',       this.renterController.unrentStock);   // unrenting stock  (body: stockID=value)

  }

}
export = new ApiRouter().router;
