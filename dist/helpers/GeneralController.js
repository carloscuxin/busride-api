"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeneralController {
    /**
     * Función que inserta registros a una tabla
     * [13/06/2019]
     * @param req
     * @param Model
    **/
    static insert(req, Model) {
        Model.create(req.toJSON())
            .then((vehicle) => {
            console.log('Llega 2');
            return { args: true, vehicle };
        })
            .catch((err) => {
            return { args: false, err };
        });
    }
}
exports.default = GeneralController;
//# sourceMappingURL=GeneralController.js.map