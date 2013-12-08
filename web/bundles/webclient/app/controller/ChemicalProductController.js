Ext.define('sisprod.controller.ChemicalProductController', {
    extend: 'sisprod.controller.Base',
    models: ['ChemicalProductModel'],
    stores: ['ChemicalProductStore'],
    entityName: 'ChemicalProduct',
    refs: [{ref: 'listChemicalProduct', selector: 'listChemicalProduct'}],
    views: ['ChemicalProduct.ListChemicalProduct'],
    requires: [
        'sisprod.store.ChemicalProductStore'
    ],
    deleteOptions: {
        deleteKeys: ['idChemicalProduct'],
        caption: function(data) {
            return data['chemicalProductName'];
        }
    },
    init: function() {
        this.control({
            'listChemicalProduct button[action=activate]': {
                click: this.activate
            },
            'listChemicalProduct button[action=add]': {
                click: this.showAdd
            },
            'listChemicalProduct button[action=update]': {
                click: this.showUpdateOnButton
            },
            'listChemicalProduct dataview': {
                itemdblclick: this.showUpdate
            },
            'listChemicalProduct button[action=delete]': {
                click: this.destroy
            },
            'listChemicalProduct button[action=print]': {
                click: this.showPrint
            },
//            'basePrintWindow button[action=print]': {
//                click: this.onPrint
//            },
            'addChemicalProduct button[action=save]': {
                click: this.saveEntity
            },
            'updateChemicalProduct button[action=save]': {
                click: this.saveEntity
            },
            'addChemicalProduct button[id=idMeasureUnitAddButton],updateChemicalProduct button[id=idMeasureUnitAddButton]': {
                click: this.onMeasureUnitAddButton
            }
        });
        this.callParent(arguments);
    },
    getGridForEntity: function() {
        var tabGrid = this.getListChemicalProduct();
        return tabGrid.getGridPanel();
    },
    onMeasureUnitAddButton: function() {
        this.showSingleAdditonWindow('MeasureUnit');
    },
    autoMappingFunction: function(grid, form, record) {
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var cboMeasure = varForm.query("[name=idMeasureUnit]")[0];

        var idMeasureUnit = record.raw.measureUnit.idMeasureUnit;

        if (Ext.isDefined(cboMeasure)) {
            cboMeasure.getStore().load({
                scope: this,
                callback: function(records, operation, success) {
                    cboMeasure.select(idMeasureUnit);
                }
            });
        }
    }
});