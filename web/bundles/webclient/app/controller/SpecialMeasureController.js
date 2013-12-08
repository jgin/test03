Ext.define('sisprod.controller.SpecialMeasureController', {
    extend: 'sisprod.controller.Base',
    stores: ['SpecialMeasureStore'],
    models: ['SpecialMeasureModel'],
    entityName: 'SpecialMeasure',
    refs: [{ref: 'listSpecialMeasure', selector: 'listSpecialMeasure'}],
    views: ['SpecialMeasure.ListSpecialMeasure'],
    requires: [
        'sisprod.store.SpecialMeasureStore'
    ],
    messages: {
    },
    deleteOptions: {
        deleteKeys: ['idSpecialMeasure'],
        caption: function(data) {
            return data[0];
        }
    },
    init: function() {
        this.control({
            'listSpecialMeasure button[action=activate]': {
                click: this.activate
            },
            'listSpecialMeasure button[action=add]': {
                click: this.showAdd
            },
            'listSpecialMeasure button[action=update]': {
                click: this.showUpdateOnButton
            },
            'listSpecialMeasure dataview': {
                itemdblclick: this.showUpdate
            },
            'listSpecialMeasure button[action=delete]': {
                click: this.destroy
            },
            'listSpecialMeasure button[action=print]': {
                click: this.showPrint
            },
            'addSpecialMeasure button[action=save]': {
                click: this.saveEntity
            },
            'addSpecialMeasure': {
                afterrender: this.showAddForm
            },
            'updateSpecialMeasure': {
                afterrender: this.showAddForm
            },
            'updateSpecialMeasure button[action=save]': {
                click: this.saveEntity
            },
            'addSpecialMeasure combobox[id=idWell]': {
                select: this.well_select
            },
            'updateSpecialMeasure combobox[id=idWell]': {
                select: this.well_select
            },
            'addSpecialMeasure combobox[id=idLot]': {
                select: this.onSelectLot
            },
            'updateSpecialMeasure combobox[id=idLot]': {
                select: this.onSelectLot
            }
        });
        this.callParent(arguments);
    },
    onSelectLot: function(combobox, records, event) {
        var formPanel = combobox.up('form');
        var cboWell = formPanel.down('#idWell');
        var battery = formPanel.down('#battery');
        var idBattery = formPanel.down('#idBattery');
        cboWell.clearValue();
        battery.setValue("");
        idBattery.setValue("");
        cboWell.getStore().reload();
    },
    getGridForEntity: function() {
        var tabGrid = this.getListSpecialMeasure();
        return tabGrid.getGridPanel();
    },
    autoMappingFunction: function(grid, window, record) {
        var me = this;
        var formPanel = window.down('form');
        formPanel.down('#idSpecialMeasure').setValue(record.raw['idSpecialMeasure']);

        formPanel.loadRecord(record);
        var idLot = record.raw.battery.zone.lot.idLot;
        var idWell = record.raw.well.idWell;
        var cboLot = Ext.getCmp("idLot");
        var cmbWell = formPanel.query("[name=idWell]")[0];
        if(Ext.isDefined(cboLot)){
            cboLot.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cboLot.select(idLot);
                    cmbWell.store.load(
                        {params:{idLot:idLot},
                        scope: this,
                        callback: function(records, operation, success){
                            cmbWell.select(idWell); 
                        }
                    });                                           
                }
            });
        }
        formPanel.down("[name=idBattery]").setValue(record.raw.battery.idBattery);
        formPanel.down("[name=battery]").setValue(record.raw.battery.batteryName);
    },
    well_select: function(combo, selectedRecords, eOpts) {
        var form = combo.up("form");
        this.showBatteryCode(selectedRecords[0].raw.battery, form);
    },
    showBatteryCode: function(rawBattery, form) {
        this.clearBatteryCode(form);
        form.down("[name=idBattery]").setValue(rawBattery.idBattery);
        form.down("[name=battery]").setValue(rawBattery.batteryName);
    },
    clearBatteryCode: function(form) {
        form.down("[name=idBattery]").setValue("");
        form.down("[name=battery]").setValue("");
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
                    Ext.getCmp("oil").setFieldLabel(form.messages.labels.oil + " (" + objResponse.defaultMeasureUnit.oil.measureUnitAcronym + ")");
                    Ext.getCmp("oilIdMeasureUnit").setValue(objResponse.defaultMeasureUnit.oil.idMeasureUnit);
                    Ext.getCmp("water").setFieldLabel(form.messages.labels.water + " (" + objResponse.defaultMeasureUnit.water.measureUnitAcronym + ")");
                    Ext.getCmp("waterIdMeasureUnit").setValue(objResponse.defaultMeasureUnit.water.idMeasureUnit);
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