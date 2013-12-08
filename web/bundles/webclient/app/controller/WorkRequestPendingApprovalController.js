/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WorkRequestPendingApprovalController', {
   extend: 'sisprod.controller.Base',
   stores : ['WorkRequestBySenderStore'],
   models : ['WorkRequestModel'],
   entityName: 'WorkRequestPendingApproval',
   checkOutPermissions: false,
   refs: [{ref: 'listPendingApproval', selector: 'listPendingApproval'},
            {ref: 'previewWorkRequest', selector: 'previewWorkRequest'}],
   views : ['WorkRequestPendingApproval.ListWorkRequestPendingApproval'],
   
   requires: [
       'sisprod.store.WorkRequestBySenderStore'
   ],
   
   messages:{
       selectWorkOrder:'Select a Work Request...',
       alertErrorSave: 'Error save data',
       disapproveConfirmation: 'Sure you want to disprove the work order {0}?',
       titleConfirmation: 'Confirmation'
   },
   
   init : function(){
        this.control({
           'listPendingApproval button[action=approve]':{
               click: function(button){
                   var grid = this.getGridForEntity();
                   if(grid != null){
                       var record = grid.getSelectionModel().getSelection()[0];
                       if(!Ext.isDefined(record)){
                           showAlertMessage(this.messages.selectWorkOrder);
                           return;
                       }
                       
                       var window = Ext.create('sisprod.view.WorkRequestPendingApproval.PreviewWorkRequest', {record: record.data});
                       if(Ext.isDefined(window) && window != null)
                           window.show();
                   }
               }
           },
                   
           'previewWorkRequest button[action=approve]':{
                click: function(button){
                    var view = this.getPreviewWorkRequest();
                    if(Ext.isDefined(view)){
                        var idWorkRequest = view.record.idWorkRequest;
                        this.approvingScheduledWorkRequest(button, idWorkRequest);
                    }
                }
           },
                   
           'listPendingApproval button[action=notapprove]':{
                click: function(button){
                    var me = this;
                    var grid = this.getGridForEntity();
                    if(grid != null){
                       var record = grid.getSelectionModel().getSelection()[0];
                       if(!Ext.isDefined(record)){
                           showAlertMessage(this.messages.selectWorkOrder);
                           return;
                       }
                       else{
                           Ext.Msg.show({
                                title: me.messages.titleConfirmation,
                                msg: Ext.String.format(me.messages.disapproveConfirmation, record.data.workRequestFullNumber),
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function(res){
                                    if(res === 'yes'){
                                        me.notApprovingScheduledWorkRequest(record.data.idWorkRequest);
                                    }
                                }
                            });
                       }
                    }
                }
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListPendingApproval();
        return tabGrid.getGridPanel();
    },
            
    approvingScheduledWorkRequest: function(button, idWorkRequest){
        var me = this;
        if(!Ext.isDefined(idWorkRequest) || idWorkRequest == null || idWorkRequest == '') return;
        Ext.BaseAjax.request({
            url: 'rest/workRequest/approveRescheduledWorkRequest.htm',
            method: 'POST',
            params: {
                idWorkRequest: idWorkRequest
            },
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                var store = me.getGridForEntity().getStore();
                if(objResponse.success === true){
                    if(store !== null){
                        store.reload();
                    }
                    var window = button.up('window');
                    window.close();
                }
                else{
                    showAlertMessage(me.messages.alertErrorSave);
                }
            },
            failure: function(response, options){
            }
        });
    },
    
    notApprovingScheduledWorkRequest: function(idWorkRequest){
        var me = this;
        if(!Ext.isDefined(idWorkRequest) || idWorkRequest == null || idWorkRequest == '') return;
        Ext.BaseAjax.request({
            url: 'rest/workRequest/notApproveRescheduledWorkRequest.htm',
            method: 'POST',
            params: {
                idWorkRequest: idWorkRequest
            },
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                var store = me.getGridForEntity().getStore();
                if(objResponse.success === true){
                    if(store !== null){
                        store.reload();
                    }
                }
                else{
                    showAlertMessage(me.messages.alertErrorSave);
                }
            },
            failure: function(response, options){
            }
        });
    }
});

