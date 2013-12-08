/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkOrderClosable.WorkOrderObservation', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.workOrderObservation',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    messages: {
        labels: {
            taskDescription: 'Observation'
        },
        saveObservation: 'Observe'
    },
    
    title: 'Work Order Observation',
    modal: true,
    width: 450,    
    layout: 'fit',
    
    record: {},
    
    initComponent: function(){
        var me = this;
        
        me.formOptions = {
//            region: 'center',
            bodyStyle: 'padding:5px 5px 0',
            items: [
        
                {
                    xtype:'fieldset',
                    columnWidth: 0.5,
                    title: me.messages.labels.taskDescription,
                    defaultType: 'textfield',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'idWorkOrder',
                            value: me.record['idWorkOrder']
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'workOrderFullNumber',
                            value: me.record['workOrderFullNumber']
                        },
                        {
                            xtype: 'textareafield',
                            anchor: '100%',
                            name: 'Observation',
                            id: 'Observation',
                            allowBlank: false,
                            height: 150
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: me.messages.saveObservation,
                    action: 'observeOrder'
                }
            ]
        };
        
        me.callParent(arguments);
    }
});