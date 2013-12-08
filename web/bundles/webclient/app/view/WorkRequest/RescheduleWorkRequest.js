/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkRequest.RescheduleWorkRequest', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.rescheduleWorkRequest',
    
    require: [
        'sisprod.view.base.BaseDataWindow',
        'sisprod.view.base.SensitiveComboBox'
    ],
    
    windowMessages: {
        saveText: 'Reschedule',
        closeText: 'Close'
    },
    messages: {
        labels: {
            workRequestFullNumber: 'Request Number',
            attentionMaximumDate: 'Max Attention Date',
            workCategory:'Work Category',
            workCategoryDetail:'Work Type',
            sector:'Sector',
            taskScheduler:'Scheduler'
        },
        alertMessage:'Message',
        selectWorkCategory:'Select a Work Category First',
        firstSelectSector:'Select a Sector First',
        workCategoryDetailEmptyText:'Type a Work Type',
        taskSchedulerEmptyText:'Type a Task Scheduler ...'
    },
    
    title: 'Reschedule Work Request',
    modal: true,
    width: 500,
    layout: 'fit',
    
    record: {},
    store: null,
    
    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            fieldDefaults: {
                labelWidth: 120
            },
            region: 'center',
            bodyStyle: 'padding:5px 5px 0',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idWorkRequest',
                    value: me.record['idWorkRequest']
                },
                {
                    xtype: 'textfield',
                    name: 'workRequestFullNumber',
                    id: 'workRequestFullNumber',
                    anchor: '75%',
                    fieldLabel: me.messages.labels.workRequestFullNumber,
                    value: me.record['workRequestFullNumber'],
                    readOnly: true
                },
                {
                    xtype: 'combobox',
                    name: 'idWorkCategory',
                    id: 'idWorkCategory',
                    anchor: '80%',
                    flex: 1,
//                    labelWidth: 120,
                    store: Ext.create('sisprod.store.WorkCategoryAll'),
                    fieldLabel: me.messages.labels.workCategory,
                    displayField: 'workCategoryName',
                    valueField: 'idWorkCategory',
                    forceSelection: true,
                    allowBlank: false
                },
                {
                    xtype: 'sensitivecombocontainer',
                    anchor: '80%',
                    showAddButton: false,
                    sensitiveComboBoxOptions:{
                        hideTrigger: false,
                        name: 'idWorkCategoryDetail',
                        id: 'idWorkCategoryDetail',
                        fieldLabel: me.messages.labels.workCategoryDetail,
//                        labelWidth: 120,
//                                store: Ext.create('sisprod.store.WorkCategoryDetailByCategory'),
                        store: Ext.create('sisprod.store.WorkCategoryDetailByCategory',{
                            listeners: {
                                beforeload: function(store, operation, options){
                                    var idWorkCategory = me.down('#idWorkCategory').getValue();
                                    if(Ext.isDefined(idWorkCategory) && idWorkCategory!==null){
                                        if(Ext.isDefined(operation.params) && operation.params!==null)
                                            operation.params.idWorkCategory = idWorkCategory;
                                        else operation.params = {query: '', idWorkCategory: idWorkCategory};
                                    }
                                    else{
                                        Ext.Msg.alert(me.messages.alertMessage,me.messages.selectWorkCategory);
                                        return false;
                                    }
                                }
                            }
                        }),
                        emptyText: me.messages.workCategoryDetailEmptyText,
                        forceSelection : true,
                        allowBlank: false,
                        displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">','{workCategoryDetailName}','</tpl>'),
                        valueField: 'idWorkCategoryDetail',
                        listConfig: {
                            getInnerTpl: function() {
                                return "{workCategoryDetailName}";
                            }
                        }
                    }
                },
                {
                    xtype: 'datefield',
                    id: 'attentionMaximumDate',
                    name: 'attentionMaximumDate',
                    fieldLabel: me.messages.labels.attentionMaximumDate,
                    anchor: '45%',
                    value: new Date(),
                    minValue:new Date()
                },
                {
                    xtype: 'combobox',
                    name: 'idSector',
                    id: 'idSector',
                    anchor: '60%',
                    store: Ext.create('sisprod.store.SectorAll'),
                    fieldLabel: me.messages.labels.sector,
                    displayField: 'sectorName',
                    valueField: 'idSector',
                    forceSelection: true,
                    allowBlank: false
                },
                {
                    xtype: 'sensitivecombocontainer',
                    anchor: '100%',
                    showAddButton: false,
                    sensitiveComboBoxOptions:{
                        hideTrigger: false,
                        name: 'idTaskScheduler',
                        id: 'idTaskScheduler',
                        fieldLabel: me.messages.labels.taskScheduler,
                        labelWidth: 120,
                        store: Ext.create('sisprod.store.TaskSchedulerBySector',{
                            listeners: {
                                beforeload: function(store, operation, options){
                                    var form = me.down('form');
                                    var sectorInput = form.queryById('idSector');
                                    var selectedSector = sectorInput.getValue();
                                    if(Ext.isDefined(selectedSector) && selectedSector!==null){
                                        if(Ext.isDefined(operation.params) && operation.params!==null)
                                            operation.params.idSector = selectedSector;
                                        else operation.params = {query: '', idSector: selectedSector};
                                    }
                                    else{
                                        Ext.Msg.alert(me.messages.alertMessage, me.messages.firstSelectSector);
                                        return false;
                                    }
                                }
                            }
                        }),
                        emptyText: me.messages.taskSchedulerEmptyText,
                        forceSelection : true,
                        allowBlank: false,
                        displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">','{personFullName} ({fullDocumentNumber})','</tpl>'),
                        valueField: 'idTaskScheduler',
                        listConfig: {
                            getInnerTpl: function() {
                                return "{personFullName} ({fullDocumentNumber})";
                            }
                        }
                    }        
                }  
            ]
        };
        
        me.callParent(arguments);
    }
});