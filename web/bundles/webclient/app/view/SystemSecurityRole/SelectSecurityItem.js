Ext.define('sisprod.view.SystemSecurityRole.SelectSecurityItem', {
    extend: 'Ext.panel.Panel',
//    closable: true,
    
//    height: 300,
//    width: 300,
    
    listeners: {
       beforerender: function(){
           sisprod.getApplication().showMask();
       },
       afterrender: function(){
           sisprod.getApplication().hideMask();
       }
   },
    
    messages: {
        title: "Permissions",
        labels: {
            securityItem: "Security Item"
        },
        radioGroup: {
            username: 'Username',
            group: 'Group'
        },
        showPermissions: 'Show Permissions'
    },
    
    layout:{
        type: 'table',
        columns: 3
//        align: 'center'
    },
    
    initComponent: function(){
       var me = this;
//       me.items = new Array();
       
       me.items=[
            {
                 xtype:"radiogroup",
                 columns: 1,
                 vertical: true,
                 padding: '10 10 10 10',
                 name: 'securityItemType',
                 id: 'securityItemType',
                 items: [
                     { boxLabel: me.messages.radioGroup.username, name: 'type', inputValue: 'user' },
                     { boxLabel: me.messages.radioGroup.group, name: 'type', inputValue: 'group', checked: true }
                 ]
            },
            {
                xtype: 'sensitivecombo',
                name: 'idSecurityItem',
                labelWidth: 120,
                width: 500,
                hideTrigger: false,
                fieldLabel: me.messages.labels.securityItem,
                store: Ext.create('sisprod.store.SecurityItemStore', {
                    listeners: {
                        beforeload: function(store, operation, options){
                            var securityItemType = Ext.getCmp('securityItemType').getValue();
                            if(Ext.isDefined(securityItemType) && securityItemType !== null)
                                if(Ext.isDefined(operation.params) && operation.params!==null)
                                    operation.params.type = securityItemType.type;
                                else operation.params = {query: '', type: securityItemType.type};
                            else return false;
                        }
                    }
                }),
//                emptyText: me.messages.applicantEmptyText,
                id: 'idSecurityItem',
                forceSelection : true,
                allowBlank: false,
                displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">','{name}','</tpl>'),
                valueField: 'id',
                listConfig: {
                    getInnerTpl: function() {
                        return '{name}';
                    }
                }
            },
            {
                xtype: 'button',
                action: 'showPermissions',
//                hidden: true,
                text: me.messages.showPermissions,
//                padding: '10 10 10 10'
                margin: '0 0 0 10'
            }
//            {
//                xtype:"textfield",
//                id:"securityItem",
//                fieldLabel:me.messages.labels.securityItem
//            }
       ];
       
       me.callParent(arguments);
    }
});