import { Router } from "express";

const router = Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

/**
 * Rutas para el controlador VehicleController
 * [07/06/2019]
**/
import VehicleController from '../controllers/VehicleController';
const vehicleController = new VehicleController();
router.route('/vehicles')
.get(vehicleController.findAll)
.post(vehicleController.insert)
.put(vehicleController.update)
router.get('/vehicles/columnsTable', vehicleController.getColumns);
router.get('/vehicles/:id', vehicleController.findById);


/**
 * Rutas para el controlador CompanyController
 * [26/06/2019]
**/
import CompanyController from '../controllers/CompanyController';
const companyController = new CompanyController();
router.route('/companies')
.get(companyController.findAll)
.post(companyController.insert);
router.get('/companies/columnsTable', companyController.getColumns);

export default router;