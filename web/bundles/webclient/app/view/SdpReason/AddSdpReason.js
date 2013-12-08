

Ext.define('sisprod.view.SdpReason.AddSdpReason', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addSdpReason',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        sdpReasonNameLabel:'Name',
        sdpReasonAcronymLabel:'Acronym'
    },
    title: 'Add Service Reason',
    modal: true,
    width: 400,
    initComponent:function(){
        var me= this;
        me.formOptions= {
        bodyPadding: 2,
        fieldDefaults: {
            labelWidth: 120
        },
        items: [
                {
                xtype: 'textfield',
                grow: true,
                name: 'sdpReasonName',
                fieldLabel:me.messages.sdpReasonNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 150
                },
                {
                xtype: 'textfield',
                grow: true,
                name: 'sdpReasonAcronym',
                fieldLabel:me.messages.sdpReasonAcronymLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 20
                }
            ]
        };
        me.callParent(arguments);
    }
});