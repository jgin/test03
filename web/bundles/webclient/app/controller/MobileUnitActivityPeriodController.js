Ext.define('sisprod.controller.MobileUnitActivityPeriodController', {
    extend: 'sisprod.controller.Base',
    stores: ['MobileUnitActivityPeriodStore'],
    models: ['MobileUnitActivityPeriodModel'],
    entityName: 'MobileUnitActivityPeriod',
    refs: [{ref: 'listMobileUnitActivityPeriod', selector: 'listMobileUnitActivityPeriod'}],
    views: ['MobileUnitActivityPeriod.ListMobileUnitActivityPeriod'],
    requires: [
        'sisprod.store.MobileUnitActivityPeriodStore'
    ],
    deleteOptions: {
        deleteKeys: ['idMobileUnitActivityPeriod'],
        caption: 'equipmentName'
    },
    init: function() {
        Ext.create('Ext.data.Store', {
            storeId: 'mobileUnitActivityStoreGrid',
            fields: ['idMobileUnitActivity', 'mobileUnitActivityName',
                'activityHour', 'isOperativeTime'],
            idProperty: 'idMobileUnitActivityPeriod',
            proxy: {
                type: 'ajax',
                api: {
                    read: 'rest/mobileUnitActivityPeriod/listActivityDetail.htm'
                },
                reader: {
                    type: 'json',
                    idProperty: 'idMobileUnitActivity',
                    root: 'data'
                }
            }
        });
        this.control({
            'listMobileUnitActivityPeriod button[action=activate]': {
                click: this.activate
            },
            'listMobileUnitActivityPeriod button[action=add]': {
                click: this.showAdd
            },
            'listMobileUnitActivityPeriod button[action=update]': {
                click: this.showUpdateOnButton
            },
            'listMobileUnitActivityPeriod dataview': {
                itemdblclick: this.showUpdate
            },
            'listMobileUnitActivityPeriod button[action=delete]': {
                click: this.destroy
            },
            'listMobileUnitActivityPeriod button[action=print]': {
                click: this.showPrint
            },
            'addMobileUnitActivityPeriod': {
                beforeshow: this.beforeShow
            },
            'addMobileUnitActivityPeriod button[action=save]': {
                click: this.saveEntity
            },
            'updateMobileUnitActivityPeriod button[action=save]': {
                click: this.saveEntity
            },
            'updateMobileUnitActivityPeriod': {
                beforerender: this.beforeRender
            }
        });
        this.callParent(arguments);
    },
    getGridForEntity: function() {
        var tabGrid = this.getListMobileUnitActivityPeriod();
        return tabGrid.getGridPanel();
    },
    beforeShow: function() {
        var store = Ext.StoreManager.lookup('mobileUnitActivityStoreGrid');
        store.removeAll();
    },
    beforeSaveEntity: function(win, form, values) {
        var items = new Array();
        var store = Ext.StoreManager.lookup('mobileUnitActivityStoreGrid');
        for (var i = 0; i < store.getCount(); i++) {
            var record = store.getAt(i).data;
            items.push({idMobileUnitActivity: record.idMobileUnitActivity,
                mobileUnitActivityName: record.mobileUnitActivityName,
                activityHour: record.activityHour,
                isOperativeTime: record.isOperativeTime});
        }
        values.items = JSON.stringify(items);
        return true;
    },
    beforeRender: function() {
        var idMobileUnitActivityPeriod = Ext.getCmp('idMobileUnitActivityPeriod').getValue();
        if (Ext.isDefined(idMobileUnitActivityPeriod) && idMobileUnitActivityPeriod !== null) {
            var store = Ext.StoreManager.lookup('mobileUnitActivityStoreGrid');
            store.load({
                params: {
                    idPeriod: idMobileUnitActivityPeriod
                }
            });
        }
        else {
            Ext.Msg.alert(me.messages.validation.alertTitle, 'Error');
            return false;
        }
    }
});