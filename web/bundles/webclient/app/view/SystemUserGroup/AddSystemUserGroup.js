

Ext.define('sisprod.view.SystemUserGroup.AddSystemUserGroup', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addSystemUserGroup',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        systemUserGroupNameLabel:'Name'
    },
    title: 'Add System User Group',
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
                name: 'groupName',
                fieldLabel:me.messages.systemUserGroupNameLabel,
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