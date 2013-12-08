

Ext.define('sisprod.view.DeferredProductionType.AddDeferredProductionType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addDeferredProductionType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    messages:{
            deferredProductionTypeNameLabel:'Name'
    },
    title: 'Add DeferredProductionType',
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
                    name: 'deferredProductionTypeName',
                    fieldLabel:me.messages.deferredProductionTypeNameLabel,
                    fieldStyle: {
                        textTransform: 'uppercase'
                    },
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 100               
                }
            ]
        };
        me.callParent(arguments);
    }    
});