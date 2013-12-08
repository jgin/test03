/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WorkOrder.ActivityOtGrid',{
    extend: 'Ext.grid.Panel',
    messages:{
        activityOtTitle:"Activity List",
        manHoursLabel: 'Man Hours',
        machineHoursLabel:'Machine Hours',
        activityOtLabel:'Activity',
        addButtonText:'Add',
        removeButtonText:'Remove',
        alertCaption: 'Message',
        duplicateActivityOtError: 'This Activity has already been added',
        noActivityOtToAddError: 'Select a Activity',
        noActivityOtSelectToRemoveError: 'Select the Activity to remove',
        activityOtEmptyText:'Type a Activity',
        confirmText:'Add {0} as a new activity ?'
    },
    collapsible: true,
    constructor: function(config){
            var me = this;
            me.callParent([config]);
    },
    id: 'schedulingActivityOtGrid',
    store: Ext.create('Ext.data.Store',{
        model: 'sisprod.model.WorkOrderActivityModel',
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    }),
    height: 200,
    autoScroll:true,
    updateHours: function(){
        var manHours= Ext.getCmp('manHours');
        var machineHours= Ext.getCmp('machineHours');
        var countManHours = 0;
        var countMachineHours = 0;
        for(var i = 0;i<this.store.getCount();i++){
            var record=this.store.getAt(i);
            countManHours=countManHours+record.data.manHours;
            countMachineHours=countMachineHours+record.data.machineHours;
        }
        manHours.setValue(countManHours);    
        machineHours.setValue(countMachineHours);    
    },
    
    initComponent: function(){
        var me = this;
        me.getStore().removeAll();
        
        me.title=me.messages.activityOtTitle;
        me.columns= [
            {
                text: 'Id',
                dataIndex: 'idActivityOt',
                flex: 1,
                hidden:true,
                hideable:false
            },
            {
                text: me.messages.activityOtLabel,
                dataIndex: 'description',
                flex: 4
            },
            {
                text: me.messages.manHoursLabel,
                dataIndex: 'manHours',
                editor:{
                    xtype: 'numberfield',
                    allowBlank: false,
                    allowDecimals: true,
                    decimalPrecision: 2,
                    minValue: 0
                },
                flex: 1
            },
            {
                text: me.messages.machineHoursLabel,
                dataIndex: 'machineHours',
                editor:{
                    xtype: 'numberfield',
                    allowBlank: false,
                    allowDecimals: true,
                    decimalPrecision: 2,
                    minValue: 0
                },
                flex: 1
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
                        context.store.remove(sm.getSelection());
                        sm.select(0);
                    }
                },
                'afteredit': function(editor, object, data, rowIndex){
                    me.updateHours();
                }
            }
        });
        me.plugins = [rowEditing];
//        var store = me.store; 
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
    //            forceSelection : true,
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
                    var activityOtGrid;
                    activityOtGrid = Ext.getCmp('schedulingActivityOtGrid');
                    var store= activityOtGrid.getStore();
                    if(record){
                        var pos = store.find('idActivityOt',value);
                        if(pos<0){
                            var model = Ext.create('sisprod.model.WorkOrderActivityModel',{
                                idActivityOt:value,
                                description:record.raw.description,
                                manHours: 0,
                                machineHours: 0
                            });
                            store.insert(store.getCount(),model);
                            me.updateHours();
                            combo.clearValue();
                            rowEditing.startEdit(model, 2);
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
                                                        manHours: 0,
                                                        machineHours: 0
                                                    });
                                                    me.getStore().insert(me.getStore().getCount(), model);
                                                    me.updateHours();
                                                    combo.clearValue();
                                                    rowEditing.startEdit(model, 2);
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
                    rowEditing.cancelEdit();
                    me.getStore().remove(sm.getSelection());
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


