Ext.define('sisprod.view.OilSale.ListOilSale', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listOilSale',
    require: [
        'sisprod.view.base.TabPanelGridItem'
    ],
    options: {},
    messages: {
        idOilSale: 'Oil Sale ID',
        productionPeriod: 'Production Period',
        tank: 'Tank',
        quantity: 'Quantity',
        measureUnitName: 'Measure Unit'
    },
    entityName: '',
    title: '',
    listTitle: 'Oil Sale List',
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
                    idOilSale: {header: me.messages.idOilSale, hideable:false},
                    'productionPeriod.idProductionPeriod':{header:me.messages.productionPeriodID,hideable:false},
                    'productionPeriod.productionPeriodDate':{header:me.messages.productionPeriod},
                    'tank.idTank':{header:me.messages.idTank,hideable:false},
                    'tank.tankName':{header:me.messages.tank},
                    quantity: {header: me.messages.quantity},
                    'measureUnit.idMeasureUnit':{header:me.messages.measureUnitId,hideable:false},
                    'measureUnit.measureUnitName':{header:me.messages.measureUnitName}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});