/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkShop.WorkShopCoordinatorGrid',{
    extend: 'Ext.grid.Panel',
    
    messages: {
        columnHeaders: {
            fullDocumentNumber: 'Identity Document',
            employeeName: 'Full Name'
        },
        validation: {
            alertTitle: 'Message',
            repeteadItem: 'The selected employee has been added before!',
            selectEmployee: 'Select an employee!'
        },
        labels: {
            employee: 'Employee'
        },
        employeeEmptyText: 'Type an employee name',
        buttons: {
            addMessage: 'Add',
            deleteMessage: 'Delete'
        }
    },
    
    grow: true,
    title: 'Workshop Coordinators',
    id: 'workShopCoordinatorGrid',
    store: Ext.create('Ext.data.Store',{        
        model: 'sisprod.model.WorkShopCoordinatorModel',
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    }),
    height: 250,
    
    constructor: function(config){
        var me = this;
        me.callParent([config]);
    },
    
    initComponent: function(){
        var me = this;
        me.getStore().removeAll();
        me.columns = [
            {
                hidden: true,
                hideable: false,
                dataIndex:'idEmployee'
            },
            {
                text: me.messages.columnHeaders.fullDocumentNumber,
                dataIndex: 'fullDocumentNumber',
                flex: 1
            },
            {
                text: me.messages.columnHeaders.employeeName,
                dataIndex: 'personFullName',
                flex: 3
            }
        ];
        
//        var store = me.store;
        //
        me.tbar = [
            {
                xtype: 'sensitivecombocontainer',
                showAddButton: false,
//                width: 450,
                flex: 6,
                sensitiveComboBoxOptions:{
                    name: 'idEmployee',
                    hideTrigger: false,
                    fieldLabel: me.messages.labels.employee,
                    store: Ext.create('sisprod.store.EmployeeFromGMP'),
                    emptyText: me.messages.employeeEmptyText,
                    id: 'idEmployee',
                    forceSelection : true,
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">','{personFullName}','</tpl>'),
                    valueField: 'idEmployee',
                    listConfig: {
                        getInnerTpl: function() {
                            return '{personFullName} ({fullDocumentNumber})';
                        }
                    }
                }
            },
            {
                text: me.messages.buttons.addMessage,
                iconCls: 'add',
                flex: 1,
                handler: function(){
                    var employeeInput = me.down('#idEmployee');
                    var idEmployee = employeeInput.getValue();
                    var comboStore = employeeInput.getStore();
                    me.checkRepeatedValue(idEmployee, me.getStore(), comboStore);
                }
            },
            {
                itemId: 'remove',
                text: me.messages.buttons.deleteMessage,
                iconCls: 'remove',
                flex: 1,
                handler: function() {
                    var sm = me.getSelectionModel();
                    me.getStore().remove(sm.getSelection());
                    sm.select(0);
                },
                disabled: true
            }
        ];
        
        me.listeners = {
            'selectionchange': function(view, records){
                me.down('#remove').setDisabled(!records.length);
            }
        };
        
        me.callParent(arguments);
    },
            
    checkRepeatedValue: function(value, gridStore, comboStore){
        var me = this;
        if(Ext.isDefined(value) && value!==null && value!==''){
            var searchResult = gridStore.findRecord('idEmployee', value, 0, false, true, true);
            if(Ext.isDefined(searchResult) && searchResult!==null){
                Ext.Msg.alert(me.messages.validation.alertTitle, me.messages.validation.repeteadItem);
                return;
            }
            else{
                var record = comboStore.findRecord('idEmployee', value, 0, false, true, true);
                var data = record.data;
                var row = Ext.create('sisprod.model.WorkShopCoordinatorModel',
                {
                    idEmployee: data['idEmployee'],
                    personFullName: data['personFullName'],
                    fullDocumentNumber: data['fullDocumentNumber']
                });
                gridStore.insert(gridStore.getCount(), row);
            }
        } else Ext.Msg.alert(me.messages.validation.alertTitle, me.messages.validation.selectEmployee);
    }
});