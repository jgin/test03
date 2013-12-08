/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.HsseSupervisor.UpdateHsseSupervisor', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateHsseSupervisor',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Update HSSE Supervisor',
    messages: {
        labels: {
            employee: 'Employee'
        },
        employeeEmptyText: 'Type an employee name...'
    },
    modal: true,
    width: 450,
    
    initComponent: function(){
        var me = this;
        me.formOptions = {
            bodyPadding: 2,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idHsseSupervisor',
                    id: 'idHsseSupervisor'
                },
                {
                    xtype: 'sensitivecombocontainer',
                    showAddButton: false,
                    anchor: '100%',
                    sensitiveComboBoxOptions:{
                        name: 'idEmployee',
                        hideTrigger: false,
                        fieldLabel: me.messages.labels.employee,
                        store: Ext.create('sisprod.store.EmployeeFromGMP'),
                        emptyText: me.messages.employeeEmptyText,
                        id: 'idEmployee',
                        forceSelection : true,
                        allowBlank: false,
                        displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">','{personFullName} ({fullDocumentNumber})','</tpl>'),
                        valueField: 'idEmployee',
                        listConfig: {
                            getInnerTpl: function() {
                                return '{personFullName} ({fullDocumentNumber})';
                            }
                        }
                    }
                }
            ]
        };
        me.callParent(arguments);
    }
});