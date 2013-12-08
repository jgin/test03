Ext.define('sisprod.view.GasSale.ListGasSale', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listGasSale',
    require: [
        'sisprod.view.base.TabPanelGridItem'
    ],
    options: {},
    messages: {
        idGasSale: 'Gas Sale ID',
        productionPeriod: 'Production Period',
        saleHours: 'Sale Hours',
        quantity: 'Quantity',
        measureUnitName: 'Measure Unit',
        auditedSale: 'Audited Sale'
    },
    entityName: '',
    title: '',
    listTitle: 'Gas Sale List',
    usedInDailyReport: true,
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
                    idGasSale: {header: me.messages.idGasSale, hideable:false},
                    'productionPeriod.idProductionPeriod':{header:me.messages.productionPeriodID,hideable:false},
                    'productionPeriod.productionPeriodDate':{header:me.messages.productionPeriod},
                    saleHours: {header: me.messages.saleHours},
                    quantity: {header: me.messages.quantity},
                    'measureUnit.idMeasureUnit':{header:me.messages.measureUnitId,hideable:false},
                    'measureUnit.measureUnitName':{header:me.messages.measureUnitName},
                    auditedSale: {header: me.messages.auditedSale}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});