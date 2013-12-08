/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.SystemUserController', {
   extend: 'sisprod.controller.Base',
   stores : ['SystemUserStore'],
   models : ['SystemUserModel'],
   entityName: 'SystemUser',
   refs: [{ref: 'listSystemUser', selector: 'listSystemUser'}],
   views : ['SystemUser.ListSystemUser'],
   
   requires: [
       'sisprod.store.SystemUserStore',
       'sisprod.store.SystemUserGroupAll'
   ],
   messages: {
        msgSelectGroup: 'Select a group at last!',
        resetPasswordConfirmationMessage: 'Are you sure to reset the password of "{0}"?',
        changePasswordConfirmationMessage: 'Are you sure change you password?'
   },
   deleteOptions: {
       deleteKeys: ['id'],
       caption: function(data){
           return data['username'];
       }
   },
   idUser: null,
   init : function(){
        this.control({
           'listSystemUser button[action=add]':{
               click: this.showAdd
           },
           
           'listSystemUser button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listSystemUser dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listSystemUser button[action=delete]': {
               click: this.destroy
           },
           
           'listSystemUser button[action=activate]': {
               click: this.activate
           },
           
           'addSystemUser button[action=save]': {
               click: this.saveEntity
           },
           
           'updateSystemUser button[action=save]': {
               click: this.saveEntity
           },
           
           'changePasswordLoggedSystemUser button[action=changePassword]': {
               click: this.changeLoggedSystemUserPasswordButton_click
           }
//           'updateSystemUser': {
//               afterrender: this.selected
//           }
          
       });
       this.callParent(arguments);
    },
    
    getGridForEntity: function(){
        var tabGrid = this.getListSystemUser();
        return tabGrid.getGridPanel();
    },
    beforeSaveEntity:function(win, form, values){
//        values.enabled=true;
        if(!Ext.isDefined(values.multiSession)){
            values.multiSession = false;
        }
        if(!Ext.isDefined(values.enabled)){
            values.enabled = false;
        }else{
            values.enabled = true;
        }
        var store =  Ext.getCmp('gridSystemUserGroupSelector').getStore();//this.getStore('sisprod.store.SystemUserGroupAll');
        if(store.getCount() === 0){
            showAlertMessage(this.messages.msgSelectGroup);
            return false;
        }
        var selectorModel = Ext.getCmp('gridSystemUserGroupSelector').selModel;
        var listGroup = new Array();
        for(var i = 0; i < selectorModel.selected.getCount(); i++){
            var etRecord = selectorModel.selected.getAt(i);
            listGroup.push(etRecord.data);
        }
        values.gridSystemUserGroupSelector =  JSON.stringify(listGroup);
        return true;
    },
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
//        var cboUserType = varForm.query("[name=idUserType]")[0];
//                
//        var idUserType = record.raw.userType.idUserType;
//                
//        if(Ext.isDefined(cboUserType)){
//            cboUserType.getStore().load({
//                scope: this,
//                callback: function(records, operation, success){
//                    cboUserType.select(idUserType);
//                }
//            });
//        }
        
        var entity = Ext.getCmp('entityId');
        var data = record.raw;
        entity.setValue(Ext.create(sisprod.getApplication().getModelName('Entity'), {
            entityId: (data.entity != null ? data.entity.entityId : null),
            entityName: (data.entity != null ? data.entity.entityName : null)
        }));
        
//        this.idUser = record.raw.id;
//        var idUser = record.raw.id;
        //
//        this.fillGrid(idUser, grid, form, record);
    },
    
    fillGrid: function(idUser){
        var arrayGroupMember = this.getSystemUserGroupMember(idUser);
        var grid = Ext.getCmp('gridSystemUserGroupSelector');
        var store =  grid.getStore();
//        grid.selModel = Ext.create('Ext.selection.CheckboxModel');
//        var selectModel = grid.selModel;
        
//        store.load({
//            callback: function(){
//                var selectModel = grid.selModel;
//                selectModel.deselectAll();
//                for(var i = 0; i < arrayGroupMember.length; i++){
//                    var index = store.find('id', arrayGroupMember[i].id);                    
//                    if(index >= 0){
//                        selectModel.select(index, true);
//                    }
//                }
////                grid.selModel = selectModel;
//            }
//        });
    },
    
    selected:function(form){
        var arrayGroupMember = this.getSystemUserGroupMember(this.idUser);
        var grid = Ext.getCmp('gridSystemUserGroupSelector');
        var store =  grid.getStore();
//        grid.selModel = Ext.create('Ext.selection.CheckboxModel');
//        var selectModel = grid.selModel;
        
        store.load({
            callback: function(){
                var selectModel = grid.selModel;
                selectModel.deselectAll();
                for(var i = 0; i < arrayGroupMember.length; i++){
                    var index = store.find('id', arrayGroupMember[i].id);                    
                    if(index >= 0){
                        selectModel.select(index, true);
                    }
                }
//                grid.selModel = selectModel;
            }
        });
        
    },
    
    getSystemUserGroupMember:function(idSystemUser){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/systemUser/listGroupMemberUser.htm',
            method: 'POST',
            async:false,
            params: {id: idSystemUser},
            success: function(response, options){
                var responseData = Ext.decode(response.responseText);
                if(responseData.success){
                    me.selectItems(responseData.data);
                }      
            }
        });
    },
    
    selectItems: function(selected){
        var me = this;
        //
        var grid = Ext.getCmp('gridSystemUserGroupSelector');
        var store =  grid.getStore();
        //
        var selectModel = grid.getSelectionModel();
        selectModel.deselectAll();
        for(var i = 0; i < selected.length; i++){
            var index = store.find('id', selected[i].id);                    
            if(index >= 0){
                selectModel.select(index, true);
            }
        }
    },
    
    resetPasswordAndSendToMailButton_click: function(grid, rowIndex, colIndex){
        var systemUserRecord=grid.getRecord(rowIndex, colIndex);
        var rawSystemUser=systemUserRecord.raw;
        
        var me=this;
        
        Ext.Msg.show({
            msg: Ext.String.format(me.messages.resetPasswordConfirmationMessage, rawSystemUser.username),
            buttons: Ext.Msg.YESNO,
            icon: Ext.MessageBox.QUESTION,
            fn: function(buttonId ) {
                if (buttonId=='yes') {
                    Ext.BaseAjax.request({
                        url: 'rest/systemUser/resetPasswordAndSendToMail.htm',
                        method: 'POST',
                        params: {
                            userName:rawSystemUser.username
                        },
                        success: function(response, options){
                            var objResponse = Ext.decode(response.responseText);
                            showAlertMessage(objResponse.message);
                        }
                    });
                }
            }
        });
    },
    
    changeLoggedSystemUserPasswordButton_click: function(btn){
        var me=this;
        var form=btn.up("form");
        
        var currentPasswordField=form.down("[name=currentPassword]");
        var newPasswordField=form.down("[name=newPassword]");
//        var confirmNewPasswordField=form.down("[name=confirmNewPassword]")[0];
        
        if (form.isValid()) {
            Ext.Msg.show({
                msg: me.messages.changePasswordConfirmationMessage,
                buttons: Ext.Msg.YESNO,
                icon: Ext.MessageBox.QUESTION,
                fn: function(buttonId) {
                    if (buttonId=='yes') {
                        Ext.BaseAjax.request({
                            url: 'rest/systemUser/changeLoggedSystemUserPasswordAction.htm',
                            method: 'POST',
                            params: {
                                currentPassword: currentPasswordField.getValue(),
                                newPassword: newPasswordField.getValue()
                            },
                            success: function(response, options){
                                var objResponse = Ext.decode(response.responseText);
                                showAlertMessage(objResponse.message);
                            }
                        });
                    }
                }
            });
        }
    }
});

