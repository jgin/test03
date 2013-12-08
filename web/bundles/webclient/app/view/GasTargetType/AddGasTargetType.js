

Ext.define('sisprod.view.GasTargetType.AddGasTargetType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addGasTargetType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        gasTargetTypeNameLabel:'Name'
    },
    title: 'Add Gas Target Type',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'textfield',
                grow: true,
                name: 'gasTargetTypeName',
                fieldLabel:me.messages.gasTargetTypeNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 255
            }
        ]
        };
        me.callParent(arguments);
    }
});