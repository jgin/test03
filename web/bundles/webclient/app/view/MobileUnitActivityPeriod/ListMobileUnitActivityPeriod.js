Ext.define('sisprod.view.MobileUnitActivityPeriod.ListMobileUnitActivityPeriod', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listMobileUnitActivityPeriod',
    require: [
        'sisprod.view.base.TabPanelGridItem'
    ],
    options: {},
    messages: {
        idMobileUnitActivityPeriodHeader: 'Mobile Unit Activity Period ID',
        mobileUnitHeader: 'Mobile Unit',
        operativeHourHeader: 'Operative Hours',
        operativeEfficiencyHeader: 'Operative Efficiency (%)',
        idProductionPeriodHeader: 'Id Production Period',
        productionPeriodDateHeader: 'Production Period Date',
        idMobileUnitHeader: 'Id Mobile Unit',
        mobileUnitNameHeader: 'Mobile Unit Name',
        operativeHour:'Operative Hours',
        operativeEfficiency: 'Operative Efficiency'
    },
    entityName: '',
    title: '',
    listTitle: 'Mobile Unit Activity Period List',
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
                    idMobileUnitActivityPeriod: {header: me.messages.idMobileUnitActivityPeriodHeader},
                    idProductionPeriod: {header: me.messages.idProductionPeriodHeader},
                    productionPeriodDate: {header: me.messages.productionPeriodDateHeader},
                    'idMobileUnit': {header: me.messages.idMobileUnitHeader},
                    'mobileUnitName': {header: me.messages.mobileUnitNameHeader},
                    operativeHour: {header: me.messages.operativeHourHeader},
                    operativeEfficiency: {header: me.messages.operativeEfficiencyHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});