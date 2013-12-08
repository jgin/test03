/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WorkOrderExecution.NewActivityGrid',{
    extend: 'Ext.grid.Panel',
    messages:{
        activityOtTitle:"Not Schedule Activities",
        manHoursLabel: 'H. H.',
        machineHoursLabel:'M. H.',
        activityOtLabel:'Activity',
        addButtonText:'Add',
        removeButtonText:'Remove',
        alertCaption: 'Message',
        duplicateActivityOtError: 'This Activity has already been added',
        noActivityOtToAddError: 'Select a Activity',
        noActivityOtSelectToRemoveError: 'Select the Activity to remove',
        activityOtEmptyText:'Type a Activity',
        confirmText:'Add {0} as a new activity ?',
        performedManHoursLabel: 'P. H. H.',
        performedMachineHoursLabel: 'P. M. H.',
        idWorkOrderActivity: 'Id work Order activity',
        idActivityOt: 'Id ActivityOt',
        unperformedReason: 'Unperformed Reason',
        isPlanned: 'Planned',
        alertActivityPlanned: 'Already been planned activity!',
        tipDetail: 'Activity Detail',
        inputStartDateForDetail: 'Enter Start Date for entry atividades detail!'
    },
    collapsible: true,
    
    constructor: function(config){
            var me = this;
            me.callParent([config]);
    },
            
    id: 'newActivityGrid',
    alias: 'widget.newActivityGrid',
    store: Ext.create('sisprod.store.WorkOrderActivityByWorkOrderStore'),
    height: 200,
    autoScroll:true,
    
    updateHours: function(){
        if(this.controller !== null)   
            this.controller.updateHours();
    },
    
    initComponent: function(){
        var me = this;
        me.title=me.messages.activityOtTitle;
        me.columns= [
            {
                text: me.messages.idActivityOt,
                dataIndex: 'idActivityOt',
                flex: 1,
                hidden:true
            },
            {
                text: me.messages.idWorkOrderActivity,
                dataIndex: 'idWorkOrderActivity',
                flex: 1,
                hidden:true
            },
            {
                text: me.messages.activityOtLabel,
                dataIndex: 'description',
                flex: 2
            },
            {
                text: me.messages.performedManHoursLabel,
                dataIndex: 'performedManHours',
//                editor:{
//                    xtype: 'numberfield',
//                    allowBlank: false,
//                    allowDecimals:false,
//                    minValue: 0
//                },
                flex: .8,
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                    return Ext.util.Format.number(value, "0.00");
                }
            },
            {
                text: me.messages.performedMachineHoursLabel,
                dataIndex: 'performedMachineHours',
//                editor:{
//                    xtype: 'numberfield',
//                    allowBlank: false,
//                    allowDecimals:false,
//                    minValue: 0
//                },
                flex: .8,
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                    return Ext.util.Format.number(value, "0.00");
                }
            },
            {
                xtype: 'actioncolumn',
                width: 20,
                sortable: false,
                menuDisabled: true,
                items: [{
                    iconCls: 'viewDetail',
                    tooltip: me.messages.tipDetail,
                    scope: this,
                    handler: function(grid, index){
                        var record = grid.getStore().getAt(index);
                        var startDate = Ext.getCmp('executionStartDate').getValue();
                        if(startDate == '' || startDate == null){
                            showAlertMessage(me.messages.inputStartDateForDetail);
                            return;
                        }
                        var window = Ext.create('sisprod.view.WorkOrderExecution.WorkOrderActivityDetail', {record: record, alias: 'widget.workOrderActivityDetailExecution'});
                        window.show();
                    }
                }]
            }
        ];
//        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
//            clicksToMoveEditor: 1,
//            autoCancel: false,
//            errorSummary: false,
//            listeners:{
//                'canceledit': function(editor, context, options){
//                    if(context.value===""){
//                        var sm = context.grid.getSelectionModel();
//                        context.store.remove(sm.getSelection());
//                        sm.select(0);
//                    }
//                },
//                'afteredit': function(editor, object, data, rowIndex){
//                    me.updateHours();
//                }
//            }
//        });
//        me.plugins = [rowEditing];
        var store = me.store;     
        me.tbar= [
            {
                xtype: 'sensitivecombo',
                flex:5,
                name: 'cboActivityOt',
                fieldLabel: '',
                hideTrigger: false,
                store: Ext.create('sisprod.store.ActivityOtTemplate'),
                emptyText: me.messages.activityOtEmptyText,
                id: 'cboActivityOt',
                displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">','{description}','</tpl>'),
                valueField: 'idActivityOt',
                listConfig: {
                    getInnerTpl: function() {
                        return "{description}";
                    }
                }
            },
            {
                iconCls: 'add',
                id: 'saveActivityOt',
                action: 'saveActivityOt',
                text: me.messages.addButtonText,
                flex:1,
                handler:function(){
                    var combo=Ext.getCmp('cboActivityOt');
                    var value=Ext.getCmp('cboActivityOt').getValue();
                    var record = combo.findRecordByValue(value);            
                    var activityOtGrid, plannedGrid;
                    activityOtGrid = Ext.getCmp('newActivityGrid');
                    plannedGrid = Ext.getCmp('activityExecutionOtGrid');
                    var store=activityOtGrid.store;
                    var plannedStore = plannedGrid.store;
                    if(record){
                        var plannedPos = plannedStore.find('idActivityOt', value);
                        if(plannedPos >= 0) {
                            showAlertMessage(me.messages.alertActivityPlanned);
                            return;
                        }
                        var pos=store.find('idActivityOt', value);
                        if(pos<0){
                            var model = Ext.create('sisprod.model.WorkOrderActivityModel',{
                                idActivityOt:value,
                                description:record.raw.description,
                                manHours:0,
                                machineHours:0
                            });
                            store.insert(store.getCount(),model);
                            me.updateHours();
                            combo.clearValue();
                        }else{
                            Ext.Msg.alert(me.messages.alertCaption,me.messages.duplicateActivityOtError);                    
                        }
                    }else{
                        var textCombo=combo.getValue();
                        if(textCombo!=null && textCombo.trim()!=""){
                            textCombo=textCombo.trim(); 
                            Ext.Msg.show({
                                title: me.messages.alertCaption,
                                msg: Ext.String.format(me.messages.confirmText,textCombo),
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function(button){
                                    if(button==="yes"){
                                        Ext.BaseAjax.request({
                                            url: 'rest/activityOt/register.htm',
                                            method: "POST",
                                            params: {description:textCombo},
                                            success: function(response){
                                                var objResponse = Ext.decode(response.responseText);
                                                if(Ext.isDefined(objResponse.success) && objResponse.success === true){
                                                    var model = Ext.create('sisprod.model.WorkOrderActivityModel',{
                                                        idActivityOt:objResponse.activityOt.idActivityOt,
                                                        description:objResponse.activityOt.description,
                                                        manHours:1,
                                                        machineHours:1
                                                    });
                                                    store.insert(store.getCount(),model);
                                                    me.updateHours();
                                                    combo.clearValue();
                                                }else{
                                                    Ext.Msg.alert(me.messages.alertCaption,objResponse.message);  
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }    
                }
            }, 
            {
                iconCls: 'remove',
                id: 'removeActivityOt',
                text: me.messages.removeButtonText,
                flex:1,
                handler:function(){
                    var sm = me.getSelectionModel();
                    //rowEditing.cancelEdit();
                    store.remove(sm.getSelection());
                    sm.select(0);
                    me.updateHours();
                }
            }
        ];
   
        me.listeners = {
            'selectionchange': function(view, records){
                me.down('#removeActivityOt').setDisabled(!records.length);
            }
        };
        
        me.on('updateHours', me.updateHours, me);
        
        me.callParent(arguments);
    }
});


