Ext.define('sisprod.view.BatteryProduction.ListBatteryProduction', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listBatteryProduction',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       idBatteryProductionHeader:'ID',
       batteryNameHeader: 'Battery Name',
       oilHeader:'Oil',
       waterHeader:'Water',
       gasHeader:'Gas',
       wellNumberHeader: 'Well Number',
       adjustmentFactorHeader: 'Factor',
       netProductionHeader: 'Net Production',
       oilTransferHeader: 'Oil Transfer',
       oilPreviousHeader: 'Oil Previous',
       oilProductionHeader: 'Oil Production'
   },
   entityName: '',
   
   title: '',
   showCheckInactive:false,
   listTitle: 'Battery Production List',
   usedInDailyReport: true,
   gridOptions: {
        region: 'center'
    },
   
   initComponent: function(){
       var me = this;
       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
       me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idBatteryProduction: {header: me.messages.idBatteryProductionHeader},
                    'productionPeriod.idProductionPeriod': {hideable: false},
                    'battery.idBattery': {hideable: false},
                    'battery.batteryName': {header: me.messages.batteryNameHeader},
                    oil: {header: me.messages.oilHeader},
                    'oilMeasureUnit.measureUnitAcronym': {hideable: false},
                    water: {header: me.messages.waterHeader},
                    'waterMeasureUnit.measureUnitAcronym': {hideable: false},
                    gas: {header: me.messages.gasHeader},
                    'gasMeasureUnit.measureUnitAcronym': {hideable: false},
                    wellNumber: {header: me.messages.wellNumberHeader},
                    adjustmentFactor: {header: me.messages.adjustmentFactorHeader},
                    netProduction: {header: me.messages.netProductionHeader},
                    'registerIdEmployee.idEmployee': {hideable: false},
                    'approveIdEmployee.idEmployee': {hideable: false},
                    'oilTransfer': {header: me.messages.oilTransferHeader, hidden: false},
                    'oilPrevios': {header: me.messages.oilPreviousHeader, hidden: false},
                    'oilProduction': {header: me.messages.oilProductionHeader, hidden: false}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
//   defaultFilters: [ 
//        {dataIndex: 'productionPeriod.productionPeriodDate', value: Ext.getCmp('envProductionPeriodDate').getRawValue()} 
//    ]
});