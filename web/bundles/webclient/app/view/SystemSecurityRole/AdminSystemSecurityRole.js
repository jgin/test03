Ext.define('sisprod.view.SystemSecurityRole.AdminSystemSecurityRole', {
    extend: 'sisprod.view.base.TabPanelItem',
    
    alias: 'widget.adminSystemSecurityRole',
    
    closable: true,
//    height: 300,
//    width: 300,
    
    messages: {
        title: "Permissions",
        buttons: {
            save: 'Save'
        }
    },
    
    layout:{
        type: 'border'
//        align: 'center'
    },
    
    initComponent: function(){
       var me = this;
       me.items = new Array();
       
       var selectSecurityItemPanel = Ext.create("sisprod.view.SystemSecurityRole.SelectSecurityItem", {
           region: 'north'
       });
       //
       var tabItems = new Array();
       tabItems.push(Ext.create('sisprod.view.SystemSecurityRole.SystemEntityRoleAssignmentGrid'));
       tabItems.push(Ext.create('sisprod.view.SystemSecurityRole.SystemEntityRoleAssignmentMenu'));
       var tab = Ext.create('Ext.tab.Panel', {
           items: tabItems,
           region: 'center',
           bbar: [
                {xtype: 'tbfill'},
                {
                    xtype: 'button',
                    iconCls: 'save',
                    action: 'savePermissions',
                    text: me.messages.buttons.save
                }
            ]
       });
//       var securityRolesTabPanel
       
       me.items.push(selectSecurityItemPanel);
       me.items.push(tab);
       me.callParent(arguments);
    }
});