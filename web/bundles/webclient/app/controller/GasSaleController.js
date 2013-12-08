Ext.define('sisprod.controller.GasSaleController', {
    extend: 'sisprod.controller.Base',
    models: ['GasSaleModel'],
    stores: ['GasSaleStore'],
    entityName: 'GasSale',
    refs: [{ref: 'listGasSale', selector: 'listGasSale'}],
    views: ['GasSale.ListGasSale'],
    requires: [
        'sisprod.store.GasSaleStore'
    ],
    deleteOptions: {
        deleteKeys: ['idGasSale'],
        caption: function(data) {
            return 'Venta';
        }
    },
    init: function() {
        this.control({
            'listGasSale button[action=activate]': {
                click: this.activate
            },
            'listGasSale button[action=add]': {
                click: this.showAdd
            },
            'listGasSale button[action=update]': {
                click: this.showUpdateOnButton
            },
            'listGasSale dataview': {
                itemdblclick: this.showUpdate
            },
            'listGasSale button[action=delete]': {
                click: this.destroy
            },
            'listGasSale button[action=print]': {
                click: this.showPrint
            },
//            'basePrintWindow button[action=print]': {
//                click: this.onPrint
//            },
            'addGasSale button[action=save]': {
                click: this.saveEntity
            },
            'updateGasSale button[action=save]': {
                click: this.saveEntity
            },
            'addGasSale': {
                afterrender: this.showAddForm
            },
            'updateGasSale': {
                afterrender: this.showAddForm
            }
        });
        this.callParent(arguments);
    },
    getGridForEntity: function() {
        var tabGrid = this.getListGasSale();
        return tabGrid.getGridPanel();
    },
    showAddForm: function(form) {
        var me = this;
        // Muestra los valores iniciales de las unidades de medida
        Ext.BaseAjax.request({
            url: 'rest/configParam/getDefaultMeasureUnits.htm',
            method: 'POST',
            success: function(response, options) {
                var objResponse = Ext.decode(response.responseText);
                if (objResponse.success === true) {
                    Ext.getCmp("idMeasureUnit").setValue(objResponse.defaultMeasureUnit.gas.idMeasureUnit);
                    Ext.getCmp("quantity").setFieldLabel(form.messages.quantityLabel + " (" + objResponse.defaultMeasureUnit.gas.measureUnitAcronym + ")");
                }
                else {
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options) {
            }
        });
    }
});