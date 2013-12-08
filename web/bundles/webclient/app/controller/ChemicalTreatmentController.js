Ext.define('sisprod.controller.ChemicalTreatmentController', {
    extend: 'sisprod.controller.Base',
    stores: ['ChemicalTreatmentStore'],
    models: ['ChemicalTreatmentModel', 'ChemicalTreatmentProductModel'],
    entityName: 'ChemicalTreatment',
    refs: [{ref: 'listChemicalTreatment', selector: 'listChemicalTreatment'}],
    views: ['ChemicalTreatment.ListChemicalTreatment'],
    requires: [
        'sisprod.store.ChemicalTreatmentStore'
    ],
    messages: {
        addError: 'You must add at least one product.',
        addCompleteForm: 'You must complete all the fields to add a new row.'
    },
    deleteOptions: {
        deleteKeys: ['idChemicalTreatment'],
        caption: function(data) {
            return 'Tratamiento';
        }
    },
    init: function() {
        Ext.create('Ext.data.Store', {
            storeId: 'chemicalTreatmentProductStore',
            model: 'sisprod.model.ChemicalTreatmentProductModel',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        });
        this.control({
            'listChemicalTreatment button[action=activate]': {
                click: this.activate
            },
            'listChemicalTreatment button[action=add]': {
                click: this.showAdd
            },
            'listChemicalTreatment button[action=update]': {
                click: this.showUpdateOnButton
            },
            'listChemicalTreatment dataview': {
                itemdblclick: this.showUpdate
            },
            'listChemicalTreatment button[action=delete]': {
                click: this.destroy
            },
            'listChemicalTreatment button[action=print]': {
                click: this.showPrint
            },
//            'basePrintWindow button[action=print]': {
//                click: this.onPrint
//            },
            'addChemicalTreatment button[action=save]': {
                click: this.saveEntity
            },
            'updateChemicalTreatment button[action=save]': {
                click: this.saveEntity
            },
            'addChemicalTreatment button[action=addProduct]': {
                click: this.onAddProduct
            },
            'addChemicalTreatment button[action=deleteProduct]': {
                click: this.onRemoveProduct
            },
            'updateChemicalTreatment button[action=addProduct]': {
                click: this.onAddProduct
            },
            'updateChemicalTreatment button[action=deleteProduct]': {
                click: this.onRemoveProduct
            },
            'updateChemicalTreatment, addChemicalTreatment': {
                close: this.onCloseWindow
            },
            'updateChemicalTreatment button[action=saveProduct]': {
                click: this.onSaveProduct
            },
            'addChemicalTreatment combobox[id=idWell]': {
                select: this.well_select
            },
            'updateChemicalTreatment combobox[id=idWell]': {
                select: this.well_select
            },
            'addChemicalTreatment combobox[id=idLot]': {
                select: this.onSelectLot
            },
            'addChemicalTreatment combobox[id=idChemicalProduct]': {
                select: this.onSelectChemicalProduct
            },
            'updateChemicalTreatment combobox[id=idChemicalProduct]': {
                select: this.onSelectChemicalProduct
            }
        });
        this.callParent(arguments);
    },
    onSelectChemicalProduct: function(combobox, records, event) {
        var selected = combobox.getValue();
        var data = combobox.getStore().data.items;
        for (var i = 0; i < data.length; i++) {
            if (data[i].getData().idChemicalProduct === selected) {
                var formPanel = combobox.up('form');
                var cboMU = formPanel.down('#dosageIdMeasureUnit');
                cboMU.setValue(data[i].raw.measureUnit.idMeasureUnit);
                cboMU.getStore().reload();
                break;
            }
        }
    },
    onSelectLot: function(combobox, records, event) {
        var formPanel = combobox.up('form');
        var cboWell = formPanel.down('#idWell');
        cboWell.clearValue();
        cboWell.getStore().reload();
    },
    onSaveProduct: function(button) {
        var form = button.up('form');
        var grid = form.down('#addChemicalTreatmentProductsGrid');
        var store = grid.getStore();
        var sm = grid.getSelectionModel();
        if (sm.selected) {
            store.remove(sm.getSelection());
            var row = Ext.create('sisprod.model.ChemicalTreatmentProductModel', {
                idChemicalTreatmentProduct: form.down('#idChemicalTreatmentProduct').getValue(),
                idChemicalProduct: form.down('#idChemicalProduct').getValue(),
                chemicalProductName: form.down('#idChemicalProduct').getRawValue(),
                idChemicalTreatmentGoal: form.down('#idChemicalTreatmentGoal').getValue(),
                chemicalTreatmentGoalName: form.down('#idChemicalTreatmentGoal').getRawValue(),
                dosage: form.down('#dosage').getValue(),
                dosageIdMeasureUnit: form.down('#dosageIdMeasureUnit').getValue(),
                dosageMeasureUnitName: form.down('#dosageIdMeasureUnit').getRawValue(),
                treatmentTime: form.down('#treatmentTime').getValue(),
                treatmentTimeIdMeasureUnit: form.down('#timeIdMeasureUnit').getValue(),
                timeMeasureUnitName: form.down('#timeIdMeasureUnit').getRawValue()
            });
            store.add(row);
            form.down('#idChemicalTreatmentProduct').setValue(0);
            form.down('#idChemicalProduct').setValue(0);
            form.down('#idChemicalTreatmentGoal').setValue(0);
            form.down('#dosage').setValue('');
            form.down('#dosageIdMeasureUnit').setValue(0);
            form.down('#treatmentTime').setValue('');
            form.down('#timeIdMeasureUnit').setValue(0);
        }
    },
    onRemoveProduct: function(button) {
        var form = button.up('form');
        var grid = form.down('#addChemicalTreatmentProductsGrid');
        var sm = grid.getSelectionModel();
        var store = grid.getStore();
        store.remove(sm.getSelection());
        sm.select(0);
    },
    onAddProduct: function(button) {
        var me = this;
        var form = button.up('form');
        var grid = form.down('gridpanel');
        if (form.down('#idChemicalProduct').getValue() !== null && form.down('#idChemicalProduct').getValue() !== '' &&
                form.down('#idChemicalProduct').getRawValue() !== null && form.down('#idChemicalProduct').getRawValue() !== '' &&
                form.down('#idChemicalTreatmentGoal').getRawValue() !== null && form.down('#idChemicalTreatmentGoal').getRawValue() !== '' &&
                form.down('#dosage').getValue() !== null && form.down('#dosage').getValue() !== '' &&
                form.down('#dosageIdMeasureUnit').getRawValue() !== null && form.down('#dosageIdMeasureUnit').getRawValue() !== '' &&
                form.down('#treatmentTime').getValue() !== null && form.down('#treatmentTime').getValue() !== '' &&
                form.down('#timeIdMeasureUnit').getRawValue() !== null && form.down('#timeIdMeasureUnit').getRawValue() !== '') {
            var row = Ext.create('sisprod.model.ChemicalTreatmentProductModel', {
                idChemicalTreatmentProduct: form.down('#idChemicalTreatmentProduct').getValue(),
                idChemicalProduct: form.down('#idChemicalProduct').getValue(),
                chemicalProductName: form.down('#idChemicalProduct').getRawValue(),
                idChemicalTreatmentGoal: form.down('#idChemicalTreatmentGoal').getValue(),
                chemicalTreatmentGoalName: form.down('#idChemicalTreatmentGoal').getRawValue(),
                dosage: form.down('#dosage').getValue(),
                dosageIdMeasureUnit: form.down('#dosageIdMeasureUnit').getValue(),
                dosageMeasureUnitName: form.down('#dosageIdMeasureUnit').getRawValue(),
                treatmentTime: form.down('#treatmentTime').getValue(),
                treatmentTimeIdMeasureUnit: form.down('#timeIdMeasureUnit').getValue(),
                timeMeasureUnitName: form.down('#timeIdMeasureUnit').getRawValue()
            });
            var store = grid.getStore();
            store.add(row);
            form.down('#idChemicalTreatmentProduct').setValue(0),
                    form.down('#idChemicalProduct').setValue(0);
            form.down('#idChemicalTreatmentGoal').setValue(0);
            form.down('#dosage').setValue('');
            form.down('#dosageIdMeasureUnit').setValue(0);
            form.down('#treatmentTime').setValue('');
            form.down('#timeIdMeasureUnit').setValue(0);
        } else {
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.addCompleteForm);
        }
    },
    beforeSaveEntity: function(window, form, values, jsonData) {
        var me = this;
        var grid;
        grid = form.down('#addChemicalTreatmentProductsGrid');
        var store = grid.store;
        if (store.getCount() === 0) {
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.addError);
            return false;
        } else {
            var details = new Array();
            for (var i = 0; i < store.getCount(); i++) {
                details.push(store.getAt(i).data);
            }
            values.details = Ext.JSON.encode(details);
        }
        return true;
    },
    onCloseWindow: function(window) {
        var grid = window.down('gridpanel');
        var storeShow = grid.getStore();
        if (Ext.isDefined(storeShow) && storeShow !== null) {
            storeShow.loadData([], false);
        }
    },
    showUpdate: function(grid, record) {
        var chkInactive = Ext.getCmp('chk' + this.entityName);
        if (Ext.isDefined(chkInactive) && chkInactive.getValue())
            return;
        var me = this;
        var window;
        if (Ext.isDefined(record)) {
            Ext.BaseAjax.request({
                url: 'rest/chemicalTreatment/getCompleteById.htm',
                async: false,
                method: 'POST',
                params: {idChemicalTreatment: record.raw['idChemicalTreatment']},
                success: function(response) {
                    var data = Ext.JSON.decode(response.responseText);
                    if (data.success) {
                        window = Ext.create('sisprod.view.' + me.entityName + '.Update' + me.entityName, {
                            firstDisplay: true,
                            formData: {
                                details: data['details']
                            }
                        });
                    } else {
                        Ext.MessageBox.show({
                            title: me.contollerMessages.alertMessage,
                            msg: data.message,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.Msg.INFO
                        });
                    }
                }
            });
            if (Ext.isDefined(me.autoMappingFunction) && typeof(me.autoMappingFunction) === 'function') {
                me.autoMappingFunction.apply(me, [grid, window, record]);
            } else {
                window.down('form').loadRecord(record);
            }
            if (window.isHidden())
                window.show();
        } else {
            Ext.Msg.alert(me.controllerMessages.updateText, me.controllerMessages.selectRecordMessage);
        }
    },
    getGridForEntity: function() {
        var form = this.getListChemicalTreatment();
        return form.getGridPanel();
    },
    autoMappingFunction: function(grid, window, record) {
        var me = this;
        var formPanel = window.down('form');
        formPanel.down('#idChemicalTreatment').setValue(record.raw['idChemicalTreatment']);
        formPanel.down('#date').setValue(record.raw['chemicalTreatmentDate']);
        formPanel.loadRecord(record);
        if (record.raw.well.battery !== null) {
            var idLot = record.raw.well.battery.zone.lot.idLot;
            var idWell = record.raw.well.idWell;
            var cboLot = Ext.getCmp("idLot");
            var cmbWell = formPanel.query("[name=idWell]")[0];
            if (Ext.isDefined(cboLot)) {
                cboLot.getStore().load({
                    scope: this,
                    callback: function(records, operation, success) {
                        cboLot.select(idLot);
                        cmbWell.store.load({
                            params: {idLot: idLot},
                            scope: this,
                            callback: function(records, operation, success) {
                                cmbWell.select(idWell);
                            }
                        });
                    }
                });
            }
        }
        me.fillUpdateFormData(window, formPanel);
    },
    fillUpdateFormData: function(window, formPanel) {
        var me = this;
        var data = window.formData;
        var treatmentDetail = data['details'];
        var grid = formPanel.down('gridpanel');
        var storeShow = grid.getStore();
        for (var i = 0; i < treatmentDetail.length; i++) {
            var rowData = treatmentDetail[i];
            var row = Ext.create('sisprod.model.ChemicalTreatmentProductModel', {
                idChemicalTreatmentProduct: rowData['idChemicalTreatmentProduct'],
                idChemicalProduct: rowData['chemicalProduct']['idChemicalProduct'],
                chemicalProductName: rowData['chemicalProduct']['chemicalProductName'],
                idChemicalTreatmentGoal: rowData['chemicalTreatmentGoal']['idChemicalTreatmentGoal'],
                chemicalTreatmentGoalName: rowData['chemicalTreatmentGoal']['chemicalTreatmentGoalName'],
                dosage: rowData['dosage'],
                dosageIdMeasureUnit: rowData['dosageMeasureUnit']['idMeasureUnit'],
                dosageMeasureUnitName: rowData['dosageMeasureUnit']['measureUnitName'],
                treatmentTime: rowData['treatmentTime'],
                treatmentTimeIdMeasureUnit: rowData['timeMeasureUnit']['idMeasureUnit'],
                timeMeasureUnitName: rowData['timeMeasureUnit']['measureUnitName']
            });
            storeShow.add(row);
        }
    }
});