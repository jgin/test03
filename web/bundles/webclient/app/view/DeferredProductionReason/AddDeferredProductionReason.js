

Ext.define('sisprod.view.DeferredProductionReason.AddDeferredProductionReason', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addDeferredProductionReason',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        deferredProductionReasonLabel: 'Reason',
        deferredProductionCodeLabel: 'Code',
        deferredProductionTypeLabel: 'Type'
    },
    title: 'Add Deferred Production Reason',
    modal: true,
    width: 400,
    initComponent: function(){
        var me = this;
        me.formOptions = {
            bodyPadding: 2,
            items: [
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