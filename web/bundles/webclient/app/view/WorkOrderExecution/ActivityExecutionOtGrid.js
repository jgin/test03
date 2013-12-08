/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WorkOrderExecution.ActivityExecutionOtGrid',{
    extend: 'Ext.grid.Panel',
    messages:{
        activityOtTitle:"Schedule Activities",
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
        unperformedReason: 'Motivo de no ejecución',
        isPlanned: 'Planned',
        isPerformed: 'Performed',
        alertNoRemovePlannedActivity: 'can not eliminate a planned activity!',
        tipDetail: 'Activity Detail',
        alertNoAddDetail: 'You can not add detail to an unexecuted activity!',
        inputStartDateForDetail: '¡Ingrese Fecha de Inicio para poder ingresar detalle de atividades!'
    },
    
    collapsible: true,
    
    constructor: function(config){
        var me = this;
        me.callParent([config]);
    },
            
    id: 'activityExecutionOtGrid',
    alias: 'widget.scheduledActivityGrid',
    store: Ext.create('sisprod.store.WorkOrderActivityByWorkOrderStore'),
    height: 200,
    autoScroll:true,
    controller: null,
    
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
                width: 200
            },
            {
                text: me.messages.isPerformed,
                dataIndex: 'isPerformed',
                editor:{
                    xtype: 'checkboxfield',
                    inputValue: true,
                    handler: function(checkbox){
                        var grid = Ext.getCmp('activityExecutionOtGrid');
                        var record = grid.getSelectionModel().getSelection()[0];
                        me.performedActivity(checkbox.getValue(), record);
                    }
                },
                width: 60,
                renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                    if(value != undefined){
                        if(value){
                            metaData.tdCls = 'checked';
                        }
                        else{
                            metaData.tdCls = 'fail';
                        }
                    }
                    return '';
                }    
            },
            {
                text: me.messages.manHoursLabel,
                dataIndex: 'manHours',
                width: 50
            },
            {
                text: me.messages.machineHoursLabel,
                dataIndex: 'machineHours',
                width: 50
            },
            {
                text: me.messages.performedManHoursLabel,
                dataIndex: 'performedManHours',
//                editor:{
//                    xtype: 'numberfield',
//                    allowBlank: false,
//                    allowDecimals:false,
//                    minValue: 0,
//                    id: 'editorManHours'
//                },
                width: 50,
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
//                    minValue: 0,
//                    id: 'editorMachineHours'
//                },
                width: 50,
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                    return Ext.util.Format.number(value, "0.00");
                }
            },
            {
                text: me.messages.unperformedReason,
                dataIndex: 'unperformedReasonName',
                editor:{
                    xtype: 'combobox',
                    store: 'UnperformedReasonAll',
                    displayField: 'unperformedReasonName',
                    valueField: 'unperformedReasonName',
                    id: 'editorUnperformedReson',
                    listeners:{
                        'select': function(cbo, records, eOpts){
                            var grid = Ext.getCmp('activityExecutionOtGrid');
                            var activity = grid.getSelectionModel().getSelection()[0];
                            var ur = records[0];
                            activity.set('idUnperformedReason', ur.data.idUnperformedReason);
                        }
                    }
                },
                flex: 1
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
                        if(!record.data.isPerformed){
                            showAlertMessage(me.messages.alertNoAddDetail);
                            return;
                        }
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
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            errorSummary: false,
            listeners:{
                'canceledit': function(editor, context, options){
                    if(context.value===""){
                        var sm = context.grid.getSelectionModel();
                        //context.store.remove(sm.getSelection());
                        sm.select(0);
                    }
                },
                'afteredit': function(editor, object, data, rowIndex){
                    me.updateHours();
                },
                        
                'beforeedit': function(editor, e, eOpts){
                    var data = e.record.data;
                    if(data.isPerformed){
                        me.performedActivity(true, e.record);
                    }
                    else{
                        me.performedActivity(false, e.record);
                    }
                }
            }
        });
        me.plugins = [rowEditing];
        me.on('updateHours', me.updateHours, me);
        me.callParent(arguments);
    },
    
    performedActivity: function(value, record){
        Ext.getCmp('editorUnperformedReson').setDisabled(value);
//        Ext.getCmp('editorManHours').setDisabled(!value);
//        Ext.getCmp('editorMachineHours').setDisabled(!value)
        
        if(value){
            Ext.getCmp('editorUnperformedReson').setValue(null);
            record.set('unperformerReasonName', '');
            record.set('idUnperformedReason', null);
        }
        else{
//            Ext.getCmp('editorManHours').setValue(0);
//            Ext.getCmp('editorMachineHours').setValue(0);
            record.set('performedManHours', 0);
            record.set('performedMachineHours', 0);
        }
    }
});


