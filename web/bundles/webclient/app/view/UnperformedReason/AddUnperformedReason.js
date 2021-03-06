

Ext.define('sisprod.view.UnperformedReason.AddUnperformedReason', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addUnperformedReason',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        unperformedReasonNameLabel:'Name',
        unperformedReasonCodeLabel:'Code'
    },
    title: 'Add Unperformed Reason',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this
        me.formOptions= {
        bodyPadding: 2,
        fieldDefaults: {
            labelWidth: 120
        },
        items: [
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'unperformedReasonCode',
                    fieldLabel:me.messages.unperformedReasonCodeLabel,
                    fieldStyle: {
                        textTransform: 'uppercase'
                    },
                    anchor: '50%',
                    allowBlank: false,
                    maxLength: 10
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'unperformedReasonName',
                    fieldLabel:me.messages.unperformedReasonNameLabel,
                    fieldStyle: {
                        textTransform: 'uppercase'
                    },
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 100
                }
            ]
        }
        me.callParent(arguments);
    }
});