

Ext.define('sisprod.view.WellServiceType.AddWellServiceType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addWellServiceType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        wellServiceTypeNameLabel:'Name',
        wellServiceTypeAcronymLabel:'Acronym'
    },
    title: 'Add Well Service Type',
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
                name: 'wellServiceTypeName',
                fieldLabel:me.messages.wellServiceTypeNameLabel,
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
                name: 'wellServiceTypeAcronym',
                fieldLabel:me.messages.wellServiceTypeAcronymLabel,
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