Ext.define('sisprod.controller.MobileUnitActivityController', {
    extend: 'sisprod.controller.Base',
    models: ['MobileUnitActivityModel'],
    stores: ['MobileUnitActivityStore'],
    entityName: 'MobileUnitActivity',
    refs: [{ref: 'listMobileUnitActivity', selector: 'listMobileUnitActivity'}],
    views: ['MobileUnitActivity.ListMobileUnitActivity'],
    requires: [
        'sisprod.store.MobileUnitActivityStore'
    ],
    checkOutPermissions: false,
    deleteOptions: {
        deleteKeys: ['idMobileUnitActivity'],
        caption: function(data) {
            return data['mobileUnitActivityName'];
        }
    },
    init: function() {
        this.control({
            'listMobileUnitActivity button[action=activate]': {
                click: this.activate
            },
            'listMobileUnitActivity button[action=add]': {
                click: this.showAdd
            },
            'listMobileUnitActivity button[action=update]': {
                click: this.showUpdateOnButton
            },
            'listMobileUnitActivity dataview': {
                itemblclick: this.showUpdate
            },
            'listMobileUnitActivity button[action=delete]': {
                click: this.destroy
            },
            'listMobileUnitActivity button[action=print]': {
                click: this.showPrint
            },
            'addMobileUnitActivity button[action=save]': {
                click: this.saveEntity
            },
            'updateMobileUnitActivity button[action=save]': {
                click: this.saveEntity
            }
        });
        this.callParent(arguments);
    },
    getGridForEntity: function() {
        var tabGrid = this.getListMobileUnitActivity();
        return tabGrid.getGridPanel();
    }
});