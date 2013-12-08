Ext.define('sisprod.controller.SubstandardController', {
    extend: 'sisprod.controller.Base',
    stores: ['SubstandardStore'],
    models: ['SubstandardModel'],
    entityName: 'Substandard',
    refs: [{ref: 'listSubstandard', selector: 'listSubstandard'}],
    views: ['Substandard.ListSubstandard'],
    requires: [
        'sisprod.store.SubstandardStore'
    ],
    deleteOptions: {
        deleteKeys: ['idSubstandard'],
        caption: 'substandardName'
    },
    init: function() {
        this.control({
            'listSubstandard button[action=activate]': {
                click: this.activate
            },
            'listSubstandard button[action=add]': {
                click: this.showAdd
            },
            'listSubstandard button[action=update]': {
                click: this.showUpdateOnButton
            },
            'listSubstandard dataview': {
                itemdblclick: this.showUpdate
            },
            'listSubstandard button[action=delete]': {
                click: this.destroy
            },
            'listSubstandard button[action=print]': {
                click: this.showPrint
            },
//            'basePrintWindow button[action=print]': {
//                click: this.onPrint
//            },
            'addSubstandard button[action=save]': {
                click: this.saveEntity
            },
            'updateSubstandard button[action=save]': {
                click: this.saveEntity
            },
            'addSubstandard button[id=idSubstandardTypeAddButton],updateSubstandard button[id=idSubstandardTypeAddButton]': {
                click: this.onSubstandardTypeAddButton
            }
        });
        this.callParent(arguments);
    },
    getGridForEntity: function() {
        var tabGrid = this.getListSubstandard();
        return tabGrid.getGridPanel();
    },
    afterSaveEntity: function(win, form, response, options) {
        response = Ext.JSON.decode(response.responseText);
        if (Ext.isDefined(response.success)) {
            if (response.success === false)
                Ext.Msg.alert(this.controllerMessages.alertMessage, response.message);
            else
                win.close();
        }
        else
            win.close();
    },
    onSubstandardTypeAddButton: function() {
        this.showSingleAdditonWindow('SubstandardType');
    },
    autoMappingFunction: function(grid, form, record) {
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var cboType = Ext.getCmp("idSubstandardType");

        var idType = record.raw.substandardType.idSubstandardType;

        if (Ext.isDefined(cboType)) {
            cboType.getStore().load({
                scope: this,
                callback: function(records, operation, success) {
                    cboType.select(idType);
                }
            });
        }
    }
});