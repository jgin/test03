/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkOrder.NullifyWorkOrder', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.nullifyWorkOrder',
    
    require: [
        'sisprod.view.base.BaseDataWindow',
        'sisprod.view.base.SensitiveComboBox'
    ],
    
    windowMessages: {
        saveText: 'Nullify',
        closeText: 'Close'
    },
    messages: {
        labels: {
            workOrderFullNumber: 'Order Number',
            nullificationDate: 'Nullification Date',
            nullificationReason: 'Reason',
            observation: 'Observation'
        }
    },
    
    title: 'Nullify Work Order',
    modal: true,
    width: 400,
    layout: 'fit',
    
    record: {},
    store: null,
    
    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            region: 'center',
            bodyStyle: 'padding:5px 5px 0',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idWorkOrder',
                    value: me.record['idWorkOrder']
                },
                {
                    xtype: 'textfield',
                    name: 'workOrderFullNumber',
                    id: 'workOrderFullNumber',
                    anchor: '75%',
                    fieldLabel: me.messages.labels.workOrderFullNumber,
                    value: me.record['workOrderFullNumber'],
                    readOnly: true
                },
                {
                    xtype: 'datefield',
                    name: 'nullificationDate',
                    fieldLabel: me.messages.labels.nullificationDate,
                    anchor: '45%',
                    value: new Date(),
                    readOnly: true
                },
                {
                    xtype: 'combobox',
                    name: 'idWorkOrderStatusReason',
                    id: 'idWorkOrderStatusReason',
                    anchor: '100%',
                    store: Ext.create('sisprod.store.AllNullificationOrderReasonStore'),
                    fieldLabel: me.messages.labels.nullificationReason,
                    displayField: 'workOrderStatusReasonName',
                    valueField: 'idWorkOrderStatusReason',
                    forceSelection: true,
                    allowBlank: false
                },
                {
                    xtype:'fieldset',
                    columnWidth: 0.5,
                    title: me.messages.labels.observation,
                    defaultType: 'textfield',
                    layout: 'anchor',
                    defaults: {anchor: '100%'},
                    items: [
                        {
                            xtype: 'textareafield',
                            name: 'observation',
                            id: 'observation',
                            allowBlank: false
                        }
                    ]
                }
            ]
        };
        
        me.callParent(arguments);
    }
});