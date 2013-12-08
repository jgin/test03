Ext.define('sisprod.controller.OilSaleController', {
    extend: 'sisprod.controller.Base',
    models: ['OilSaleModel'],
    stores: ['OilSaleStore'],
    entityName: 'OilSale',
    refs: [{ref: 'listOilSale', selector: 'listOilSale'}],
    views: ['OilSale.ListOilSale'],
    requires: [
        'sisprod.store.OilSaleStore'
    ],
    deleteOptions: {
        deleteKeys: ['idOilSale'],
        caption: function(data) {
            return 'Venta';
        }
    },
    init: function() {
        this.control({
            'listOilSale button[action=activate]': {
                click: this.activate
            },
            'listOilSale button[action=add]': {
                click: this.showAdd
            },
            'listOilSale button[action=update]': {
                click: this.showUpdateOnButton
            },
            'listOilSale dataview': {
                itemdblclick: this.showUpdate
            },
            'listOilSale button[action=delete]': {
                click: this.destroy
            },
            'listOilSale button[action=print]': {
                click: this.showPrint
            },
//            'basePrintWindow button[action=print]': {
//                click: this.onPrint
//            },
            'addOilSale button[action=save]': {
                click: this.saveEntity
            },
            'updateOilSale button[action=save]': {
                click: this.saveEntity
            },
            'addOilSale': {
                afterrender: this.showAddForm
            },
            'updateOilSale': {
                afterrender: this.showAddForm
            }
        });
        this.callParent(arguments);
    },
    getGridForEntity: function() {
        var tabGrid = this.getListOilSale();
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
                    Ext.getCmp("idMeasureUnit").setValue(objResponse.defaultMeasureUnit.oil.idMeasureUnit);
                    Ext.getCmp("quantity").setFieldLabel(form.messages.quantityLabel + " (" + objResponse.defaultMeasureUnit.oil.measureUnitAcronym + ")");
                }
                else {
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options) {
            }
        });
    },
    autoMappingFunction: function(grid, form, record) {
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var cmbTank = varForm.down('#idTank');
        var idTank = record.raw.tank.idTank;
        if (Ext.isDefined(cmbTank)) {
            cmbTank.getStore().load({
                scope: this,
                callback: function(records, operation, success) {
                    cmbTank.select(idTank);
                }
            });
        }
    }
});