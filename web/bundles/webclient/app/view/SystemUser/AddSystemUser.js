/**
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.view.SystemUser.AddSystemUser', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addSystemUser',
    require: [
        'sisprod.view.base.BaseDataWindow',
        'sisprod.view.base.SensitiveComboBox'
    ],
    messages:{
        entityLabel: 'Entity',
        userNameLabel: 'Name',
        passwordLabel:'Password',
        userTypeLabel:'User Type',
        multiSessionLabel:'is Multi Session',        
        expirationDateLabel:'Expiration Date',
        msgEntity: 'Enter Entity',
        msgTitle: 'Group',
        msgGroupName: 'Name'
    },
    modal: true,
    width: 460,
//    height: 600,
//    selectorModel: Ext.create('Ext.selection.CheckboxModel'),
    store: null,
    record: null,
    initComponent: function(){
        var me = this;
        me.formOptions = {
            bodyPadding: 2,
            items: [
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
//                    fieldStyle: {
//                        textTransform: 'uppercase'
//                    },
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
                    store: Ext.create('sisprod.store.SystemUserGroupAll').load(),
                    collapsible: true,
                    frame: true,
                    autoScroll: true,
                    name: 'gridSystemUserGroupSelector',
                    selModel: Ext.create('Ext.selection.CheckboxModel', { mode: "MULTI" }),
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
        };
        
        me.callParent(arguments);
    }
    
});
