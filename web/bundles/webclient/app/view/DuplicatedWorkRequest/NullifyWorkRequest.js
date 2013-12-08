/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.DuplicatedWorkRequest.NullifyWorkRequest', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.nullifyDuplicatedWorkRequest',
    
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
            workRequestFullNumber: 'Request Number',
            nullificationDate: 'Nullification Date',
            nullificationReason: 'Reason',
            observation: 'Observation'
        }
    },
    
    title: 'Nullify Work Request',
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
                    name: 'idWorkRequest',
                    value: me.record['idWorkRequest']
                },
                {
                    xtype: 'textfield',
                    name: 'workRequestFullNumber',
                    id: 'workRequestFullNumber',
                    anchor: '75%',
                    fieldLabel: me.messages.labels.workRequestFullNumber,
                    value: me.record['workRequestFullNumber'],
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
                    name: 'idWorkRequestStatusReason',
                    id: 'idWorkRequestStatusReason',
                    anchor: '100%',
                    store: Ext.create('sisprod.store.AllNullificationReasonStore'),
                    fieldLabel: me.messages.labels.nullificationReason,
                    displayField: 'workRequestStatusReasonName',
                    valueField: 'idWorkRequestStatusReason',
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