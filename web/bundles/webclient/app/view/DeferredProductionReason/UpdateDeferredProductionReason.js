/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.DeferredProductionReason.UpdateDeferredProductionReason', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateDeferredProductionReason',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        deferredProductionReasonLabel: 'Reason',
        deferredProductionCodeLabel: 'Code',
        deferredProductionTypeLabel: 'Type'
    },
    title: 'Update Deferred Production Reason',
    autoMappingOptions: {
        autoMapping: false
    },
    modal: true,
    width: 400,
    initComponent: function(){
        var me=this;
        me.formOptions= {
            bodyPadding: 2,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idDeferredProductionReason'
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'deferredProductionReasonName',
                    fieldLabel: me.messages.deferredProductionReasonLabel,
                    fieldStyle: {
                        textTransform: 'uppercase'
                    },
                    labelWidth:100,
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 150
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'deferredProductionCode',
                    fieldLabel: me.messages.deferredProductionCodeLabel,
                    labelWidth:100,
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 6
                },
                {
                    xtype: 'combobox',
                    anchor: '100%',             
                    fieldLabel : me.messages.deferredProductionTypeLabel,
                    labelWidth:100,
                    store : Ext.create('sisprod.store.DeferredProductionTypeAll').load(),
                    displayField : 'deferredProductionTypeName',
                    valueField : 'idDeferredProductionType',
                    id:'idDeferredProductionType',
                    name:'idDeferredProductionType',
                    forceSelection : true,
                    allowBlank : false,
                    editable : false
                }
            ]
        };
        me.callParent(arguments);
    }
});
