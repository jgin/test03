/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.store.ProductionForecastWellStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ProductionForecastWellModel',
//    autoLoad: false,
    requires: [
        'Ext.data.Store', 
        'sisprod.model.ProductionForecastWellModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/productionForecastWell/listByHeaderAndBattery.htm',
            create : 'rest/productionForecastWell/register.htm',
            update: 'rest/productionForecastWell/update.htm',
            destroy: 'rest/productionForecastWell/delete.htm'
        },
        
        actionMethods: {
            create : 'POST',
            read   : 'GET',
            update : 'POST',
            destroy: 'POST'
        },

        reader: {
            async: false,
            type: 'json',
            root: 'data',
            idProperty: 'idProductionForecastWell',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});