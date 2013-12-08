Ext.define('sisprod.view.MobileUnitActivity.ListMobileUnitActivity', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listMobileUnitActivity',
    require: [
        'sisprod.view.base.TabPanelGridItem'
    ],
    options: {},
    messages: {
        idMobileUnitActivityHeader: 'Mobile Unit Activity ID',
        mobileUnitActivityAcronymHeader: 'Acronym',
        mobileUnitActivityNameHeader: 'Name',
        isOperativeTimeHeader: 'Is Operative Time'
    },
    entityName: '',
    title: '',
    listTitle: 'Mobile Unit Activity List',
    gridOptions: {
        region: 'center'
    },
    initComponent: function() {
        var me = this;
        var storeName = sisprod.getApplication().getStoreName(me.entityName);
        var modelName = sisprod.getApplication().getModelName(me.entityName);
        me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions: {
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idMobileUnitActivity: {header: me.messages.idMobileUnitActivityHeader},
                    'mobileUnitActivityName': {header: me.messages.mobileUnitActivityNameHeader},
                    'mobileUnitActivityAcronym': {header: me.messages.mobileUnitActivityAcronymHeader},
                    isOperativeTime: {header: me.messages.isOperativeTimeHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});