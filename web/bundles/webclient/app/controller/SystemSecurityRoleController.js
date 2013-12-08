/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.SystemSecurityRoleController', {
   extend: 'sisprod.controller.Base',
//   stores : ['SystemEntityRoleAssignmentGridStore'],
   models : ['SystemEntityRoleAssignmentModel'],
   entityName: 'SystemSecurityRole',
//   refs: [{ref: 'listSystemSecurityRole', selector: 'listSystemSecurityRole'}],
   views : ['SystemSecurityRole.AdminSystemSecurityRole'],
//   
//   requires: [
//       'sisprod.store.SystemSecurityRoleStore'
//   ],
   
   messages: {
       successfulAssignment: 'Permissions assigned successfuly!',
       confirmationText: 'Are you sure you want assign selected roles?',
       selectSecurityItem: 'Select User/Group before!'
   },
   
   init : function(){
       var me = this;
        this.control({
//           'listSystemSecurityRole button[action=update]':{
//               click: this.showUpdateOnButton
//           },
           
           'adminSystemSecurityRole button[action=showPermissions]':{
               click: this.onShowPermissions
           },
           
           'adminSystemSecurityRole button[action=savePermissions]':{
               click: this.onSavePermissions
           },
           
           'adminSystemSecurityRole radiogroup[id=securityItemType]':{
               change: this.onChangeSecurityItemType
           },
           
           'adminSystemSecurityRole combobox[id=idSecurityItem]':{
               select: this.onSelectSecurityItem
           }
           
//           'listSystemSecurityRole dataview': {
//               itemdblclick: this.showUpdate
//           },
//           
//           'updateSystemSecurityRole button[action=save]': {
//               click: this.saveEntity
//           }
          
       });
       this.callParent(arguments);
    },
    
    beforeShowInitialView: function(data, tabPanel, tabId){
        return true;
    },
      
    onSelectSecurityItem: function(combobox, records, eventOptions){
        var me = this;
        //
        me.showPermissions(combobox);
    },
            
    onShowPermissions: function(button){
        var me = this;
        //
        me.showPermissions(button);
//        if(Ext.isDefined(menuStore) && menuStore !== null){
//            menu.store = Ext.create('sisprod.store.SystemEntityRoleAssignmentMenuStore').load({
//                params: { usedId: 1 },
//                callback: function(record, options){
//                    menu.setRootNode(menuStore.getRootNode());
//                }
//            });
//        }
//        else{
//            menu.store.load({
//                params: { usedId: 1 },
//                callback: function(record, options){
//                    menu.setRootNode(menuStore.getRootNode());
//                }
//            });
//        }
    },
    
    showPermissions: function(component){
        var me = this;
        //
        var menu = component.up('tabPanelItem').queryById('systemEntityRoleAssignmentMenu');
        var grid = component.up('tabPanelItem').queryById('systemEntityRoleAssignmentGrid');
        var securityItem = component.up('panel').queryById('idSecurityItem');
        var idSecurityItem = securityItem.getValue();
        //
        if(!Ext.isDefined(idSecurityItem) || idSecurityItem === null){
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.selectSecurityItem);
            return;
        }
        //
        var gridStore = grid.getStore();
        var values = {};
        var securityItemType = Ext.getCmp('securityItemType').getValue();
        if(securityItemType.type === 'user') values["userId"] = idSecurityItem;
        else values["groupId"] = idSecurityItem;
        gridStore.load({ params: values });
        //
        var menuStore = menu.getStore();
        menuStore = Ext.create('sisprod.store.SystemEntityRoleAssignmentMenuStore').load({
            params: values,
            callback: function(record, options){
                menu.setRootNode(menuStore.getRootNode());
            }
        });
    },
    
    onSavePermissions: function(button){
        var me = this;
        var securityItem = button.up('tabPanelItem').queryById('idSecurityItem');
        var idSecurityItem = securityItem.getValue();
        if(!Ext.isDefined(idSecurityItem) || idSecurityItem === null){
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.selectSecurityItem);
            return;
        }
        var roles = new Array();
        //
        if(Ext.isDefined(idSecurityItem) && idSecurityItem !== null){
            var menu = button.up('tabPanelItem').queryById('systemEntityRoleAssignmentMenu');
            var grid = button.up('tabPanelItem').queryById('systemEntityRoleAssignmentGrid');
            //
//            var menuStore = menu.getStore();
            var gridStore = grid.getStore();
            //
            for(var i = 0; i< gridStore.getCount(); i++){
                var record = gridStore.getAt(i);
                if(record.data['listRoleGranted']) roles.push(record.data['listRoleId']);
                if(record.data['createRoleGranted']) roles.push(record.data['createRoleId']);
                if(record.data['updateRoleGranted']) roles.push(record.data['updateRoleId']);
                if(record.data['deleteRoleGranted']) roles.push(record.data['deleteRoleId']);
                if(record.data['exportRoleGranted']) roles.push(record.data['exportRoleId']);
            }
            //
            var checked = menu.getView().getChecked();
            for(var i = 0; i< checked.length; i++){
                var data = checked[i].raw;
                var roleId = data['roleId'];
                if(Ext.isDefined(roleId) && roleId !== null) roles.push(roleId);
            }
        }
        if(roles.length > 0){
            var values = { grantedRoles: roles.join(',') };
            var securityItemType = Ext.getCmp('securityItemType').getValue();
            if(securityItemType.type === 'user') values["userId"] = idSecurityItem;
            else values["groupId"] = idSecurityItem;
            //
            Ext.Msg.show({
                title: me.controllerMessages.confirmText,
                msg: me.messages.confirmationText,
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(button){
                    if(button==="yes"){
                        Ext.BaseAjax.request({
                            url: 'rest/systemSecurityRole/saveGrantedSecurityRoles.htm',
                            method: "POST",
                            params: values,
                            success: function(response){
                                var responseData = Ext.decode(response.responseText);
                                if(responseData.success)
                                    Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.successfulAssignment);
                                else Ext.Msg.alert(me.controllerMessages.alertMessage, responseData.message);
                            }
                        });
                    }
                }
            });
        }
    },
    
    onChangeSecurityItemType: function(radioGroup, newValue, oldValue, eventOptions){
        var panel = radioGroup.up('panel');
        var securityItem = panel.queryById('idSecurityItem');
        securityItem.clearValue();
        securityItem.getStore().reload();
    }
});

