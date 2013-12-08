

Ext.define('sisprod.view.ToolType.AddToolType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addToolType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        toolTypeNameLabel:'Name'
    },
    title: 'Add Tool Type',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'textfield',
                grow: true,
                name: 'toolTypeName',
                fieldLabel:me.messages.toolTypeNameLabel,
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