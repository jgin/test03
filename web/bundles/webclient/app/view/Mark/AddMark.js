

Ext.define('sisprod.view.Mark.AddMark', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addMark',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    messages:{
            markNameLabel:'Mark'
    },
    title: 'Add Mark',
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
                name: 'markName',
                fieldLabel:me.messages.markNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 255               
            }
        ]
        };
        me.callParent(arguments)
    }
    
});