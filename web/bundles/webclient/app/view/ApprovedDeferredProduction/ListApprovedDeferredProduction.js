/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.ApprovedDeferredProduction.ListApprovedDeferredProduction', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listApprovedDeferredProduction',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   messages: {
       headers:{
           idDeferredProduction:'ID',
           wellCode:'Well',
           batteryCode:'Battery',
           reason:'Reason',
           hours:'Hours',
           minute:'Minutes',
           oil:'Oil',
           deferredNumber:'Deferred',
           offWell:'Off',
           period:'Period',
           comment:'Comment'
       },
       buttons:{
           approve:'Approve'
       }
    },
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Deferred Production  List',
   
   usedInDailyReport: true,
   
   gridOptions: {
        region: 'center'
    },
   showCheckInactive:false,
   initComponent: function(){
       var me = this;
       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
//       me.gridOptions = {};
       
       //
       me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idDeferredProduction: {header:me.messages.headers.idDeferredProduction},
                    'well.idWell':{hiddeable:false},
                    'well.wellName':{hideable:false},
                    'well.wellCode':{header:me.messages.headers.wellCode,flex:1,align:'center'},
                    'battery.idBattery':{hideable:false},
                    'battery.batteryName':{hideable:false},
                    'battery.batteryCode':{header:me.messages.headers.batteryCode,flex:1,align:'center'},
                    forecastOil:{header:me.messages.headers.oil,align:'center'},
                    deferredNumber:{header:me.messages.headers.deferredNumber,flex:1,align:'center',
                        editor: {
                            xtype: 'numberfield',
                            id: 'deferredNumberEdit',
                            allowBlank: false,
                            minValue:0
                        }
                    },
                    totalHours:{header:me.messages.headers.hours,flex:1,align:'center',
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            allowDecimals:false,
                            minValue:0,
                            maxValue:24,
                            listeners: {
                                'change': function(txthours,newValue,oldValue,opt){
                                    me.controller.onChangeHoursForEdit.apply(me.controller,[txthours,newValue,oldValue,opt]);
                                }
                            }
                        }
                    },
                    totalMinute:{header:me.messages.headers.minute,flex:1,align:'center',
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            allowDecimals:false,
                            minValue:0,
                            maxValue:59,
                            listeners: {
                                'change': function(txtMinute,newValue,oldValue,opt){
                                    me.controller.onChangeMinutesForEdit.apply(me.controller,[txtMinute,newValue,oldValue,opt]);
                                }
                            }
                        }
                    },
                    comment:{header:me.messages.headers.comment,flex:3,align:'center',
                        editor: {
                            xtype: 'textfield'
                        }
                    },
                    offWell:{header:me.messages.headers.offWell,flex:1,align:'center',
                        editor: {
                            xtype: 'checkboxfield',
                            allowBlank: false
                        }
                    },
                    'deferredProductionReason.idDeferredProductionReason':{hideable:false},
                    'deferredProductionReason.deferredProductionReasonName':{header:me.messages.headers.reason,flex:3,align:'center',
                        editor: {
                            xtype: 'combobox',
                            store: Ext.create('sisprod.store.DeferredProductionReasonAll'),
                            displayField: 'deferredProductionReasonName',
                            valueField: 'deferredProductionReasonName',
                            editable: false,
                            allowBlank: false,
                            allowDecimals:false,
                            listeners: {
                                'select': function(combobox, record, eventOptions){
                                    me.controller.onSelectReasonForEdit.apply(me.controller, [combobox, record, eventOptions]);
                                }
                            }
                        }
                     },
                    'battery.lot.idLot':{hideable:false},
                    'battery.lot.lotName':{hideable:false},
                    'measureUnit.idMeasureUnit':{hideable:false},
                    'measureUnit.measureUnitName':{hideable:false},
                    'productionPeriod.idProductionPeriod':{hideable:false},
                    'productionPeriod.productionPeriodDate':{hideable:false},
                    productionPeriodDate:{header:me.messages.headers.period,filter:null,flex:1.5,align:'center',excludeForExport:true}
               }
            },
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
            },
            topBarButtons: [
                {
                    xtype: 'button',
                    text: me.messages.buttons.approve,
                    iconCls: 'accept',
                    action: 'approve'
                }
            ]
       };
       me.callParent(arguments);
   }
});