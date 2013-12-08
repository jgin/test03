/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.FluidLevel.ListFluidLevel', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listFluidLevel',
   
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Fluid Level List',
   messages: {
       headers: {
           idFluidLevel: 'ID',
           wellName: 'Well',
           batteryName: 'Battery',
           carrera: 'Carrera',
           spm: 'SPM',
           companyName: 'Company',
           level: 'Level',
           submergence: 'Submergence',
           freeGas: 'Free Gas',
           pressionCasing: 'Pression Casing',
           pressionTubing: 'Pression Tubing',
           gearboxExisting: 'Gearbox Existing',
           initialLevel: 'Initial Level',
           finalLevel: 'Final Level',
           minutes: 'Minutes',
           seconds: 'Seconds',
           productionPeriodDate: 'Report Date',
           fluidLevelTypeName: 'Type'
       },
       attachFilesButtonText: 'Attach Files'
   },
   usedInDailyReport: true,
   
   initComponent: function(){
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
                    idFluidLevel:{header: me.messages.headers.idFluidLevel},
                    'well.wellName': {header: me.messages.headers.wellName},
                    'well.battery.batteryName': {header: me.messages.headers.batteryName},
                    carrera: {header: me.messages.headers.carrera},
                    spm: {header: me.messages.headers.spm},
                    'productionPeriod.productionPeriodDate': {header: me.messages.headers.productionPeriodDate},
                    'fluidLevelType.fluidLevelTypeName': {header: me.messages.headers.fluidLevelTypeName},
                    'company.companyName': {header: me.messages.headers.companyName},
                    'fluidLevelMeasure.level': {
                        header: me.messages.headers.level
//                        editor: {
//                            xtype: 'numberfield'
//                        }
                    },
                    'fluidLevelMeasure.submergence': {
                        header: me.messages.headers.submergence
//                        editor: {
//                            xtype: 'numberfield'
//                        }
                    },
                    'fluidLevelMeasure.freeGas': {
                        header: me.messages.headers.freeGas
//                        editor: {
//                            xtype: 'numberfield'
//                        }
                    },
                    'fluidLevelMeasure.pressionCasing': {
                        header: me.messages.headers.pressionCasing
//                        editor: {
//                            xtype: 'numberfield'
//                        }
                    },
                    'fluidLevelMeasure.pressionTubing': {
                        header: me.messages.headers.pressionTubing
//                        editor: {
//                            xtype: 'numberfield'
//                        }
                    },
                    'fluidLevelMeasure.gearboxExisting': {
                        header: me.messages.headers.gearboxExisting
//                        editor: {
//                            xtype: 'numberfield'
//                        }
                    },
                    'manometricTest.initialLevel': {header: me.messages.headers.initialLevel},
                    'manometricTest.finalLevel': {header: me.messages.headers.finalLevel},
                    'manometricTest.minutes': {header: me.messages.headers.minutes},
                    'manometricTest.seconds': {header: me.messages.headers.seconds}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName),
            topBarButtons: [
                {
                    xtype: 'button',
                    text: me.messages.attachFilesButtonText,
                    iconCls: 'attach',
                    action: 'attachFiles'
                }
            ]
//            editorOptions: {
//                listeners: {
//                    'beforeedit': function(editor, context, eventOptions) {
//                        me.controller.beforeEdit.apply(me.controller, [editor, context, eventOptions]);
//                    },
//                    'afteredit': function(editor, context, eventOptions) {
//                        me.controller.afterEdit.apply(me.controller, [editor, context, eventOptions]);
//                    },
//                    'canceledit': function(editor, context, eventOptions) {
//                        me.controller.cancelEdit.apply(me.controller, [editor, context, eventOptions]);
//                    }
//                }
//            }
       };
       
       me.callParent(arguments);
   }
   
});