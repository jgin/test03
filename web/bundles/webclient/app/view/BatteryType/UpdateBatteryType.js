Ext.define('sisprod.view.BatteryType.UpdateBatteryType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateBatteryType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        batteryTypeNameLabel:'Name',
        batteryTypeAcronymLabel:'Acronym'
    },
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Battery Type',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idBatteryType'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'batteryTypeName',
                fieldLabel:me.messages.batteryTypeNameLabel,
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
                name: 'batteryTypeAcronym',
                fieldLabel: me.messages.batteryTypeAcronymLabel,
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