import { Router } from "express";
import jwtCheck from "../server/jwtCheck";

const router = Router();

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
//Checamos y validamos los permisos

router.route('/companies')
.get(jwtCheck, companyController.findAll)
.post(companyController.insert);
router.get('/companies/columnsTable', companyController.getColumns);


/**
 * Rutas para el login
 * [22/07/2019]
**/
import LoginController from '../controllers/LoginController';
const loginController = new LoginController();
router.route('/login')
.post(loginController.login);

export default router;