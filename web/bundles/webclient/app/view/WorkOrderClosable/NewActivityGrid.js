/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WorkOrderClosable.NewActivityGrid',{
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
        unperformedReason: 'Motivo de no ejecución',
        isPlanned: 'Planned',
        alertActivityPlanned: 'Already been planned activity!'
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
                flex: .8
            },
            {
                text: me.messages.performedMachineHoursLabel,
                dataIndex: 'performedMachineHours',
                flex: .8
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
//   
//        me.listeners = {
//            'selectionchange': function(view, records){
//                me.down('#removeActivityOt').setDisabled(!records.length);
//            }
//        };
//        
        me.on('updateHours', me.updateHours, me);
        
        me.callParent(arguments);
    }
});


