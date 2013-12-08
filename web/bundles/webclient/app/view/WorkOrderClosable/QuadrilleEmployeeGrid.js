/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WorkOrderClosable.QuadrilleEmployeeGrid',{
    extend: 'Ext.grid.Panel',
    messages:{
        employeesTitle:"Employees",
        employeeLabel:"Employee",
        employeesFullName:"Full Name",
        addButtonText:'Add',
        removeButtonText:'Remove',
        alertCaption: 'Message',
        employeeEmptyText: 'Type an employee name',
        duplicateEmployeeError: 'This Employee has already been added',
        noEmployeeToAddError: 'Select a Employee'
    },
    constructor: function(config){
            var me = this;
            me.callParent([config]);
    },
    id: 'quadrilleEmployeesGrid',
    store: Ext.create('Ext.data.Store',{
        model: 'sisprod.model.EmployeeTempModel',
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    }),
    height: 200,
    autoScroll:true,
    forceFit:true,
    initComponent: function(){
        var me = this;
        me.title=me.messages.employeesTitle;
        me.columns= [
            {
                text: 'Id',
                dataIndex: 'idEmployee',
                hidden:true
            },
            {
                text: me.messages.employeesFullName,
                dataIndex: 'personFullName'
            }
        ];
//        var store = me.store;
//        me.tbar=[
//            {
//            xtype: 'sensitivecombocontainer',
//            showAddButton: false,
//            flex:7,
//            sensitiveComboBoxOptions:{
//                name: 'cboEmployee',
//                id: 'cboEmployee',
//                fieldLabel: me.messages.employeeLabel,
//                store: Ext.create('sisprod.store.EmployeeFromGMP'),
//                emptyText: me.messages.employeeEmptyText,
//                forceSelection : true,
//                displayTpl: Ext.create('Ext.XTemplate',
//                    '<tpl for=".">','{personFullName}','</tpl>'),
//                valueField: 'idEmployee',
//                listConfig: {
//                    getInnerTpl: function() {
//                        return '{personFullName} ({fullDocumentNumber})';
//                    }
//                }
//            }
//            },
//            {
//                iconCls: 'add',
//                id: 'saveEmployee',
//                action: 'saveEmployee',
//                text: me.messages.addButtonText,
//                flex:1,
//                handler:function(){
//                    var combo=Ext.getCmp('cboEmployee');
//                    var value=Ext.getCmp('cboEmployee').getValue();
//                    var record = combo.findRecordByValue(value);            
//                    if(record){
//                        var employeeGrid;
//                        employeeGrid = Ext.getCmp('quadrilleEmployeesGrid');
//                        var store=employeeGrid.store;
//                        var pos=store.find('idEmployee',value);
//                        if(pos<0){
//                            var model = Ext.create('sisprod.model.EmployeeTempModel',{
//                                    idEmployee:value,
//                                    personFullName:record.raw.person.personFullName
//                            });
//                            store.insert(store.getCount(),model);
//                            combo.clearValue();
//                        }else{
//                            Ext.Msg.alert(me.messages.alertCaption,me.messages.duplicateEmployeeError);                    
//                        }
//                    }else{
//                        Ext.Msg.alert(me.messages.alertCaption,me.messages.noEmployeeToAddError);
//                    } 
//                }
//            },
//            {
//                iconCls: 'remove',
//                id: 'removeEmployee',
//                action: 'removeEmployee',
//                text: me.messages.removeButtonText,
//                flex:1,
//                handler:function(){
//                    var sm = me.getSelectionModel();
//                    store.remove(sm.getSelection());
//                    sm.select(0);
//                }
//            }
//        ]
        me.callParent(arguments);
    }
});


