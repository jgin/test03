

Ext.define('sisprod.view.SdpActivity.AddSdpActivity', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addSdpActivity',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        sdpActivityNameLabel:'Name'
    },
    title: 'Add Well Service Activity',
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
                    name: 'sdpActivityName',
                    fieldLabel:me.messages.sdpActivityNameLabel,
                    fieldStyle: {
                        textTransform: 'uppercase'
                    },
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 150
                }                
            ]
        };
        me.callParent(arguments);
    }
});