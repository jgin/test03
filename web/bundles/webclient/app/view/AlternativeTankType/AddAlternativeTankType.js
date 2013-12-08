

Ext.define('sisprod.view.AlternativeTankType.AddAlternativeTankType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addAlternativeTankType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    messages:{
        alternativeTankTypeNameLabel:"Name",
        alternativeTankTypeAcronymLabel:"Acronym"
    },
    title: 'Add Alternative Tank Type',
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
                    name: 'alternativeTankTypeName',
                    fieldLabel:me.messages.alternativeTankTypeNameLabel,
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
                    name: 'alternativeTankTypeAcronym',
                    fieldLabel:me.messages.alternativeTankTypeAcronymLabel,
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