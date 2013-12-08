/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.SdpActivityDetail.ListSdpActivityDetail', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listSdpActivityDetail',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       idSdpActivityDetail:'ID',
       wellNameHeader:'Well',
       sdpActivityNameHeader:'SDP Activity',
       wellServiceTypeNameHeader:'Well Service Type',
       companyNameHeader: 'Company',
       descriptionHeader: 'Description',
       totalHourHeader: 'Hours',
       completedHeader: 'Completed'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Well Service Activity Detail List',
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
                    idSdpActivityDetail: {header:me.messages.idSdpActivityDetail},
                    'wellService.well.wellName': {header:me.messages.wellNameHeader},                    
                    'sdpCompany.company.companyName':{header:me.messages.companyNameHeader,flex:2,align:'center',
                        editor: {
                            xtype: 'combobox',
                            store: Ext.create('sisprod.store.SdpCompanyByWellServiceAll',{
                                listeners: {
                                    beforeload: function(store, operation, options){
                                        var grid = me.getGridPanel();
                                        var selected = grid.getSelectionModel().getSelection()[0];
                                        var data = selected.raw;
                                        var selectedSdp = data.wellService.idSdp;
                                        if(Ext.isDefined(selectedSdp) && selectedSdp!==null){
                                            if(Ext.isDefined(operation.params) && operation.params!==null)
                                                operation.params.idSdp = selectedSdp;
                                            else operation.params = {query: '', idSdp: selectedSdp};
                                        }
                                    }
                                }
                            }),
                            displayField: 'companyName',
                            valueField: 'companyName',
                            editable: false,
                            allowBlank: false,
                            listeners: {
                                'select': function(combobox, record, eventOptions){
                                    me.controller.onSelectSdpCompanyForEdit.apply(me.controller, [combobox, record, eventOptions]);
                                }
                            }
                        }
                    },
                    'sdpActivity.sdpActivityName': {header: me.messages.sdpActivityNameHeader,
                        editor:{
                            xtype: 'combobox',
                            store : Ext.create('sisprod.store.SdpActivityAll').load(),
                            displayField : 'sdpActivityName',
                            valueField : 'sdpActivityName',
                            forceSelection : true,
                            editable : false,
                            listeners: {
                                'select': function(combobox, record, eventOptions){
                                    me.controller.onSelectSdpActivityForEdit.apply(me.controller, [combobox, record, eventOptions]);
                                }
                            }
                        }
                    },
                    'wellService.wellServiceType.wellServiceTypeName': {header:me.messages.wellServiceTypeNameHeader},
                    description: {header:me.messages.descriptionHeader,
                        editor:{
                            xtype: 'textfield'
                        }
                    },
                    totalHour: {header:me.messages.totalHourHeader,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            allowDecimals:false,
                            minValue:0
                        }
                    },
                    isCompleted: {header:me.messages.completedHeader,
                        editor: {
                            xtype: 'checkboxfield',
                            allowBlank: false
                        }
                    },
                    'productionPeriod.idProductionPeriod': {hideable:false, hidden: true},
                    'productionPeriod.productionPeriodDate': {hideable:false, hidden: true},
                    'wellService.idSdp': {hideable:false, hidden: true},
                    'wellService.well.idWell': {hideable:false, hidden: true},
                    'sdpCompany.idSdpCompany': {hideable:false, hidden: true},
                    'sdpActivity.idSdpActivity': {hideable:false, hidden: true}
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
            }
       };
       me.callParent(arguments);
   }
   
});