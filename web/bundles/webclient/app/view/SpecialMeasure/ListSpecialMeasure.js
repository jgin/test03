Ext.define('sisprod.view.SpecialMeasure.ListSpecialMeasure', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    require: [
        'sisprod.view.base.TabPanelGridItem'
    ],
    alias: 'widget.listSpecialMeasure',
    options: {},
    entityName: '',
    listTitle: 'Special Measure List',
    usedInDailyReport: true,
    messages: {
        headers: {
            idSpecialMeasure: 'ID Special Measure',
            idProductionPeriod: 'ID Production Period',
            idWell: 'ID Well',
            well: 'Well',
            oil: 'Oil',
            oilMeasureUnitName: 'Oil Measure Unit',
            oilIdMeasureUnit: 'Oil Measure Unit ID',
            battery: 'Battery',
            water: 'Water',
            waterMeasureUnit: 'Water Measure Unit',
            waterIdMeasureUnit: 'Water Measure Unit ID',
            idBattery: 'Battery ID',
            batteryName: 'Battery Name',
            totalHours: 'Total Hours',
            observation: 'Observation'
        }
    },
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
                    idSpecialMeasure: {header: me.messages.headers.idSpecialMeasure},
                    'productionPeriod.idProductionPeriod': {header:me.messages.headers.idProductionPeriod},
                    'well.idWell': {header:me.messages.headers.idWell},
                    'well.wellName': {header: me.messages.headers.well},
                    'battery.idBattery': {header:me.messages.headers.idBattery},
                    'battery.batteryName': {header:me.messages.headers.batteryName},
                    oil: {header:me.messages.headers.oil, flex:0.5},
                    'oilMeasureUnit.idMeasureUnit': {header:me.messages.headers.oilIdMeasureUnit},
                    'oilMeasureUnit.measureUnitName': {header:me.messages.headers.oilMeasureUnitName, flex:0.5},
                    water: {header:me.messages.headers.water, flex:0.5},
                    'waterMeasureUnit.idMeasureUnit': {header:me.messages.headers.waterIdMeasureUnit},
                    'waterMeasureUnit.measureUnitName': {header:me.messages.headers.waterMeasureUnit, flex:0.5},
                    totalHours: {header:me.messages.headers.totalHours, flex:0.5},
                    observation: {header:me.messages.headers.observation, flex:3}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName),
            topBarButtons: [
                
            ]
        };
        me.callParent(arguments);
    }
});