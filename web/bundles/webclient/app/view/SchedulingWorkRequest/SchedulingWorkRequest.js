/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.SchedulingWorkRequest.SchedulingWorkRequest', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.schedulingWorkRequest',
    
    require: [
        'sisprod.view.base.BaseDataWindow',
        'sisprod.view.base.SensitiveComboBox'
    ],
    
//    windowMessages: {
//        saveText: 'Nullify',
//        closeText: 'Close'
//    },
    messages: {
        validation: {
            alertTitle: 'Message',
            firstSelectSectorText: 'Please, first select a sector...'
        },
        labels: {
            workRequestFullNumber: 'Request Number',
            workCategoryDetail: 'Work Type',
            attentionMaximumTime: 'Attention Max. Date',
            sector: 'Sector',
            taskScheduler: 'Task Scheduler'
        },
        taskSchedulerEmptyText: 'Type an employee name'
    },
    formats: {
        sourceDateFormat: 'Y-m-d',
        targetDateFormat: 'd-m-Y'
   },
    
    title: 'Pre Scheduling Work Request',
    modal: true,
    width: 600,
    layout: 'fit',
    
    record: {},
    store: null,
    
    initComponent: function(){
        var me = this;
        me.formOptions = {
            region: 'center',
            bodyStyle: 'padding:5px 5px 0',
            layout: 'anchor',
            defaults: {labelWidth: 120},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idWorkRequest',
                    id: 'idWorkRequest',
                    value: me.record['idWorkRequest']
                },
                {
                    xtype: 'textfield',
                    name: 'workRequestFullNumber',
                    id: 'workRequestFullNumber',
                    anchor: '50%',
                    fieldLabel: me.messages.labels.workRequestFullNumber,
                    value: me.record['workRequestFullNumber'],
                    readOnly: true,
                    fieldStyle: 'text-align: center;'
                },
                {
                    xtype: 'sensitivecombocontainer',
                    anchor: '100%',
                    showAddButton: false,
                    sensitiveComboBoxOptions:{
                        hideTrigger: false,
                        name: 'idWorkCategoryDetail',
                        id: 'idWorkCategoryDetail',
                        fieldLabel: me.messages.labels.workCategoryDetail,
                        labelWidth: 120,
                        store: Ext.create('sisprod.store.WorkCategoryDetailByCategory'),
                        emptyText: me.messages.workCategoryDetailEmptyText,
                        forceSelection : true,
                        allowBlank: false,
                        displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">','{workCategoryDetailName} ({workCategoryName})','</tpl>'),
                        valueField: 'idWorkCategoryDetail',
                        listConfig: {
                            getInnerTpl: function() {
                                return "{workCategoryDetailName} ({workCategoryName})";
                            }
                        },
                        value: new Ext.create(sisprod.getApplication().getModelName('WorkCategoryDetail'),{
                            workCategoryName: me.record.workCategoryDetail.workCategory.workCategoryName,
                            idWorkCategoryDetail: me.record.workCategoryDetail.idWorkCategoryDetail,
                            workCategoryDetailName: me.record.workCategoryDetail.workCategoryDetailName
                        })
                    }
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    anchor: '50%',
                    fieldLabel: me.messages.labels.attentionMaximumTime,
                    name: 'attentionMaximumDate',
                    id: 'attentionMaximumDate',
                    value: Ext.util.Format.date(Ext.Date.parse(me.record['attentionMaximumDate'], me.formats.sourceDateFormat), me.formats.targetDateFormat),
//                    value: me.record['attentionMaximumDate'],
                    fieldStyle: 'text-align: center;'
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
                                        else operation.params = {query: '', idSector: selectedSector}
                                    }
                                    else{
                                        Ext.Msg.alert(me.messages.validation.alertTitle, me.messages.validation.firstSelectSectorText);
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