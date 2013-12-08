Ext.define('sisprod.view.SystemUser.UpdateSystemUser', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateSystemUser',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        entityLabel: 'Entity',
        userNameLabel: 'Name',
        passwordLabel:'Password',
        multiSessionLabel:'is Multi Session',
        enabledLabel:'Enabled',
        expirationDateLabel:'Expiration Date',
        msgEntity: 'Enter Entity',
        msgTitle: 'Group',
        msgGroupName: 'Name'
    },
    modal: true,
    width: 460,
//    selectorModel: Ext.create('Ext.selection.CheckboxModel'),
    store: null,
    record: null,
    controller: null,
    
    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            bodyPadding: 5,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'id'
                },
                {
                    xtype: 'sensitivecombocontainer',
                    showAddButton: false,
                    flex: 5,
                    sensitiveComboBoxOptions:{
                        name: 'entityId',
                        fieldLabel: me.messages.formFields.entityLabel,
                        store: Ext.create('sisprod.store.EntityTemplateStore'),
                        emptyText: me.messages.formFields.msgEntity,
                        id: 'entityId',
                        forceSelection : true,
                        allowBlank: false,
                        displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">','{entityName}','</tpl>'),
                        valueField: 'entityId',
                        listConfig: {
                            getInnerTpl: function() {
                                 return "{entityName}";
                            }
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'username',
                    fieldLabel:me.messages.formFields.userNameLabel,
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 100
                },
                {
                    xtype: 'checkboxfield',
                    name: 'multiSession',
                    fieldLabel: me.messages.formFields.multiSessionLabel,
                    inputValue:true,
                    anchor: '100%'
                },
                {
                    xtype: 'checkboxfield',
                    name: 'enabled',
                    fieldLabel: me.messages.formFields.enabledLabel,
                    inputValue:true,
                    anchor: '100%'
                },
                {
                    xtype: 'datefield',
                    name: 'expirationDate',
                    id: 'expirationDate',
                    value : new Date(),
                    fieldLabel: me.messages.formFields.expirationDateLabel
                },
                {
                    height: 120,
                    title: me.messages.formFields.msgTitle,
                    xtype: 'gridpanel',
                    id: 'gridSystemUserGroupSelector',
                    store: Ext.create('sisprod.store.SystemUserGroupAll').load({
                        callback : function(record, options, success) {
                            var idUser = me.record.data['id'];
                            me.controller.getSystemUserGroupMember.apply(me.controller, [idUser]);
                        }
                    }),
                    collapsible: true,
                    frame: true,
                    autoScroll: true,
                    name: 'gridSystemUserGroupSelector',
                    selModel: Ext.create('Ext.selection.CheckboxModel',{ mode: 'MULTI'}),
                    columns: [
                        {
                            text: 'id',
                            dataIndex: 'id',
                            flex: 1,
                            hidden:true
                        },
                        {
                            text: me.messages.formFields.msgGroupName,
                            dataIndex: 'groupName',
                            flex: 2
                        }
                    ]
                }
            ]
//            ,
//            fieldDefaults: {
//                labelWidth: 100,
//                margins: '0 0 0 5',
//                anchor: '100%'
//            }
        }
        
        me.callParent(arguments);
    }
    
});