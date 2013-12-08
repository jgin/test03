

Ext.define('sisprod.view.EquipmentCondition.AddEquipmentCondition', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addEquipmentCondition',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        equipmentConditionNameLabel:'Equipment Condition',
        equipmentConditionAcronymLabel:'Acronym'
    },
    title: 'Add Equipment Condition',
    modal: true,
    width: 400,
    initComponent:function(){
        var me =this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'textfield',
                grow: true,
                name: 'equipmentConditionName',
                fieldLabel:me.messages.equipmentConditionNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 50
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'equipmentConditionAcronym',
                fieldLabel: me.messages.equipmentConditionAcronymLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 5
            }
        ]
        }
        me.callParent(arguments);
    }
});