"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("./services/authentication");
const router = express_1.Router();
// ========================================================================================== //
// RUTAS DEL VEHICLECONTROLLER
// ========================================================================================== //
const VehicleController_1 = __importDefault(require("../controllers/VehicleController"));
const vehicleController = new VehicleController_1.default();
router.route('/vehicles')
    .get(vehicleController.findAll)
    .post(vehicleController.insert)
    .put(vehicleController.update);
router.get('/vehicles/columnsTable', vehicleController.getColumns);
router.get('/vehicles/:id', vehicleController.findById);
// ========================================================================================== //
// RUTAS DEL COMPANYCONTROLLER
// ========================================================================================== //
const CompanyController_1 = __importDefault(require("../controllers/CompanyController"));
const companyController = new CompanyController_1.default();
//Checamos y validamos los permisos
router.route('/companies')
    .get(authentication_1.checkJWT, companyController.findAll)
    .post(companyController.insert);
router.get('/companies/columnsTable', companyController.getColumns);
// ========================================================================================== //
// RUTAS DEL LOGIN
// ========================================================================================== //
const LoginController_1 = __importDefault(require("../controllers/LoginController"));
const loginController = new LoginController_1.default();
router.route('/login')
    .post(loginController.login);
router.get('/isAuthenticated', loginController.isAuthenticated);
exports.default = router;
//# sourceMappingURL=router.js.map