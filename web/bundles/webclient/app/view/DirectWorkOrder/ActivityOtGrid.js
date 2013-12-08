/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.DirectWorkOrder.ActivityOtGrid',{
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
        confirmText:'Add {0} as a new activity ?',
        inputStartDateForDetail: '¡Ingrese Fecha de Inicio para poder ingresar detalle de atividades!'
    },
    collapsible: true,
    constructor: function(config){
            var me = this;
            me.callParent([config]);
    },
    id: 'directWOActivityOtGrid',
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
                flex: 1,
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                    return Ext.util.Format.number(value, "0.00");
                }
            },
            {
                text: me.messages.machineHoursLabel,
                dataIndex: 'machineHours',
                flex: 1,
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
                        var window = Ext.create('sisprod.view.DirectWorkOrder.WorkOrderActivityDetailDirect', {record: record});
                        window.show();
                    }
                }]
            }
        ];
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
                    activityOtGrid = Ext.getCmp('directWOActivityOtGrid');
                    var store= activityOtGrid.getStore();
                    if(record){
                        var pos=store.find('idActivityOt',value);
                        if(pos<0){
                            var model = Ext.create('sisprod.model.WorkOrderActivityModel',{
                                idActivityOt:value,
                                description:record.raw.description,
                                manHours: 0,
                                machineHours: 0,
                                listWorkOrderActivityDetail: []
                            });
                            store.insert(store.getCount(),model);
                            me.updateHours();
                            combo.clearValue();
                        }else{
                            Ext.Msg.alert(me.messages.alertCaption,me.messages.duplicateActivityOtError);                    
                        }
                    }else{
                        var textCombo=combo.getValue();
                        if(textCombo!==null && textCombo.trim()!==""){
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
                                                        machineHours: 0,
                                                        listWorkOrderActivityDetail: []
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


