/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.CompressorStop.ListCompressorStop', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listCompressorStop',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   messages: {
       headers:{
           idCompressorStop:'ID',
           compressor:'Compressor',
           reason:'Reason',
           finishTime:'Finish',
           startTime:'Start',
           stopHour:'Stop Hour',
           volumen:'Volumen',
           pressure:'Pressure',
           comment:'Comments',
           productionPeriodDate:'Report Date'
       }   
    },
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Compressor List',
   
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
                    idCompressorStop: {header:me.messages.headers.idCompressorStop},
                    'equipment.idEquipment': {hiddeable:false},
                    'equipment.equipmentName': {header:me.messages.headers.compressor,flex:3},
                    'compressorStopReason.idCompressorStopReason': {hiddeable:false},
                    'compressorStopReason.compressorStopReasonName': {header:me.messages.headers.reason,flex:3,
                            editor: {
                                xtype: 'combobox',
                                store: Ext.create('sisprod.store.CompressorStopReasonAll'),
                                displayField: 'compressorStopReasonName',
                                valueField: 'compressorStopReasonName',
                                editable: false,
                                allowBlank: false,
                                listeners: {
                                    'select': function(combobox, record, eventOptions){
                                        me.controller.onSelectReasonForEdit.apply(me.controller, [combobox, record, eventOptions]);
                                    }
                                }
                            }
                    },
                    'startTime': {header:me.messages.headers.startTime,flex:1,hidden:true,hiddeable:false},
                    'finishTime': {header:me.messages.headers.finishTime,flex:1,hidden:true,hiddeable:false},
                    'stopHours': {header:me.messages.headers.stopHour,flex:1,
                            editor: {
                                xtype: 'numberfield',
                                id: 'stopHoursGrid',
//                                name: 'pressureGrid',
                                allowBlank: true,
                                decimalSeparator:'.',
                                allowDecimals:true,
                                minValue:0.1
                            }
                     },
                    'pressure': {header:me.messages.headers.pressure,flex:1,
                            editor: {
                                xtype: 'numberfield',
                                id: 'pressureGrid',
//                                name: 'pressureGrid',
                                allowBlank: true,
                                decimalSeparator:'.',
                                allowDecimals:true,
                                minValue:0
                            }
                    },
                    'volume': {header:me.messages.headers.volumen,flex:1,
                            editor: {
                                xtype: 'numberfield',
                                id: 'volumeGrid',
                                allowBlank: true,
                                decimalSeparator:'.',
                                allowDecimals:true,
                                minValue:0
                            }                        
                    },
                    'comment': {header:me.messages.headers.comment,flex:3,
                            editor: {
                                xtype: 'textfield',
                                id: 'commentGrid',
                                allowBlank:true,
                                length:5000
                            }
                    },
                    'productionPeriod.idProductionPeriod': {hiddeable:false},
                    'productionPeriod.productionPeriodDate': {hiddeable:false},
                    'productionPeriodDate': {header:me.messages.headers.productionPeriodDate,flex:1.5}
               }
            },
            region: 'center',
            store: me.controller.getStore(storeName),
            editorOptions: {
                listeners: {
                    'beforeedit': function(editor, context, eventOptions){
                        me.controller.beforeEditOnGrid.apply(me.controller, [editor, context, eventOptions]);
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
});