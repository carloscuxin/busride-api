import { Router } from "express";
import { checkJWT } from "./services/authentication";

const router = Router();

// ========================================================================================== //
// RUTAS DEL VEHICLECONTROLLER
// ========================================================================================== //
import VehicleController from '../controllers/VehicleController';
const vehicleController = new VehicleController();
router.route('/vehicles')
.get(vehicleController.findAll)
.post(vehicleController.insert)
.put(vehicleController.update)
router.get('/vehicles/columnsTable', vehicleController.getColumns);
router.get('/vehicles/:id', vehicleController.findById);


// ========================================================================================== //
// RUTAS DEL COMPANYCONTROLLER
// ========================================================================================== //
import CompanyController from '../controllers/CompanyController';
const companyController = new CompanyController();
//Checamos y validamos los permisos

router.route('/companies')
.get(checkJWT, companyController.findAll)
.post(companyController.insert);
router.get('/companies/columnsTable', companyController.getColumns);


// ========================================================================================== //
// RUTAS DEL LOGIN
// ========================================================================================== //
import LoginController from '../controllers/LoginController';
const loginController = new LoginController();
router.route('/login')
.post(loginController.login);



export default router;