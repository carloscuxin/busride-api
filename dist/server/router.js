"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtCheck_1 = __importDefault(require("../server/jwtCheck"));
const express_jwt_authz_1 = __importDefault(require("express-jwt-authz"));
const router = express_1.Router();
/**
 * Rutas para el controlador VehicleController
 * [07/06/2019]
**/
const VehicleController_1 = __importDefault(require("../controllers/VehicleController"));
const vehicleController = new VehicleController_1.default();
router.route('/vehicles')
    .get(vehicleController.findAll)
    .post(vehicleController.insert)
    .put(vehicleController.update);
router.get('/vehicles/columnsTable', vehicleController.getColumns);
router.get('/vehicles/:id', vehicleController.findById);
/**
 * Rutas para el controlador CompanyController
 * [26/06/2019]
**/
const CompanyController_1 = __importDefault(require("../controllers/CompanyController"));
const companyController = new CompanyController_1.default();
//Checamos y validamos los permisos
const checkScopes = express_jwt_authz_1.default(['read:companies']);
router.route('/companies')
    .get(jwtCheck_1.default, companyController.findAll)
    .post(companyController.insert);
router.get('/companies/columnsTable', companyController.getColumns);
exports.default = router;
//# sourceMappingURL=router.js.map