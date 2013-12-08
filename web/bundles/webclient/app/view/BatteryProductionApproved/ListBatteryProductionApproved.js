/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.BatteryProductionApproved.ListBatteryProductionApproved', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listBatteryProductionApproved',
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
       oilProductionHeader: 'Oil Production',
       oilForecastHeader: 'Oil Forecast'
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
//       var modelName = "sisprod.model.BatteryProductionModel";
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
                    oil: {header: me.messages.oilHeader,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            allowDecimals:false,
                            minValue:0
                        }
                    },
                    'oilMeasureUnit.measureUnitAcronym': {hideable: false},
                    water: {header: me.messages.waterHeader,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            allowDecimals:false,
                            minValue:0
                        }
                    },
                    'waterMeasureUnit.measureUnitAcronym': {hideable: false},
                    gas: {header: me.messages.gasHeader,
                        editor: {
                                xtype: 'numberfield',
                                allowBlank: false,
                                allowDecimals:false,
                                minValue:0
                            }
                    },
                    'gasMeasureUnit.measureUnitAcronym': {hideable: false},
                    wellNumber: {header: me.messages.wellNumberHeader},
                    adjustmentFactor: {header: me.messages.adjustmentFactorHeader},
                    netProduction: {header: me.messages.netProductionHeader},
                    'registerIdEmployee.idEmployee': {hideable: false},
                    'approveIdEmployee.idEmployee': {hideable: false},
                    'oilTransfer': {header: me.messages.oilTransferHeader, hidden: false,
                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false,
                                allowDecimals: true,
                                allowNegative: false,
                                decimalSeparator:'.',
                                minValue:0
                            }
                        },
                    oilForecast: {header: me.messages.oilForecastHeader, 
                            editor: {
                                xtype: 'numberfield',
//                                allowBlank: false,
                                allowDecimals: true,
                                allowNegative: false,
                                decimalSeparator:'.',
                                minValue:0
                            }
                        },
                    'oilPrevios': {header: me.messages.oilPreviousHeader, hidden: false},
                    'oilProduction': {header: me.messages.oilProductionHeader, hidden: false}
                }
            },
//            baseGridOptions: {
//                allowAdd: false,
//                allowUpdate: false,
//                allowDelete: false,
//                allowPrint: false
//            },
            topBarButtons: [
            {
                xtype: 'button',
                text: 'Aprobar',
                iconCls: 'approve',
                action: 'approved'
            }],
            region: 'center',
            store: me.controller.getStore(storeName),
            editorOptions: {
                listeners: {
                    'beforeedit': function(editor, context, eventOptions){
                        me.controller.beforeEdit.apply(me.controller, [editor, context, eventOptions]);
                    },
                    'afteredit': function(editor, context, eventOptions){
                        me.controller.afterEdit.apply(me.controller, [editor, context, eventOptions]);
                    },
                    'canceledit': function(editor, context, eventOptions){
                        me.controller.cancelEdit.apply(me.controller, [editor, context, eventOptions]);
                    }
                }
            }
       };
       me.callParent(arguments);
   }
//   defaultFilters: [ 
//        {dataIndex: 'productionPeriod.productionPeriodDate', value: Ext.getCmp('envProductionPeriodDate').getRawValue()} 
//    ]
});