"use strict";
/**
 * Etiquetas en español
 * [26/06/2019]
**/
Object.defineProperty(exports, "__esModule", { value: true });
const Labels = {
    //-- Vehicles --//
    /* Columnas de la tabla */
    VehicleColumns: {
        code: "Código",
        model_id: "Modelo",
        company_id: {
            output: "Compañía",
            reference: "Company.commercial_name"
        },
        air_conditioner: "AC",
        status: "Estatus",
        created_at: "Creado",
        updated_at: "Actualizado"
    },
    //-- Companies --//
    /* Columnas de la tabla */
    CompanyColumns: {
        business_name: "Nombre Empresa",
        commercial_name: "Nombre Comercial",
        phone: "Teléfono",
        email: "Correo",
        web_page: "Pagina Web",
        created_at: "Creado",
        updated_at: "Actualizado"
    }
};
exports.default = Labels;
//# sourceMappingURL=labels.ES.MX.js.map