/* 
 * To change this template, choose Users | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.SystemUserGroup.UpdateSystemUserGroup', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateSystemUserGroup',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        systemUserGroupNameLabel:'Name'
    },
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update System User Group',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'hiddenfield',
                name: 'id'
            },
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