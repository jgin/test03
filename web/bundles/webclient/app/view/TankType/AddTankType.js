

Ext.define('sisprod.view.TankType.AddTankType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addTankType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        tankTypeNameLabel:"Name",
        tankTypeAcronymLabel:"Acronym"
    },
    title: 'Add Tank Type',
    modal: true,
    width: 400,
    initComponent:function(){
        var me = this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'textfield',
                grow: true,
                name: 'tankTypeName',
                fieldLabel:me.messages.tankTypeNameLabel,
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
                name:'tankTypeAcronym',
                fieldLabel: me.messages.tankTypeAcronymLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 10
            }
        ]
    };
    me.callParent(arguments);
    }
});