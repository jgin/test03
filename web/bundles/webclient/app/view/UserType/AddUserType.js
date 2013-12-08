

Ext.define('sisprod.view.UserType.AddUserType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addUserType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        isUserTypeDefaultLabel: 'Is Users Default',
        userTypeNameLabel:'Name'
    },
    title: 'Add User Type',
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
                    xtype: 'checkboxfield',
                    name: 'defaultUserType',
                    fieldLabel: me.messages.isUserTypeDefaultLabel,
                    inputValue:true,
                    anchor: '100%'
                },
                {
                xtype: 'textfield',
                grow: true,
                name: 'userTypeName',
                fieldLabel:me.messages.userTypeNameLabel,
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