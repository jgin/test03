/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.SdpFileController', {
   extend: 'sisprod.controller.Base',
   refs: [{ref: 'addSdpFile', selector: 'addSdpFile'}],
   entityName: 'SdpFile',
  
  
      
   init : function(){
        this.control({           
//           'addSdpFile button[action=save]': {
//               click: this.saveFile
//           },
//           'addSdpFile': {
//               beforerender: this.onBeforeRender
//           }
       });
       this.callParent(arguments);
    },
    onBeforeRender:function(){
        var input = Ext.getCmp('file');
        Ext.BaseAjax.request({
            url:'listMessageMaxUploadFileSize.htm',
            method: 'GET',
            async:false,
            success: function(response, options){
                var data = Ext.JSON.decode(response.responseText);
                if(data.success){
                    input.setFieldLabel(input.getFieldLabel()+' (Max. '+data.message+')');
                }
            }
        });
        
    },
    getGridForEntity: function(){
        var tabGrid = this.getListSdpFile();
        return tabGrid.getGridPanel();
    },
    deleteSdpFile:function(record,win){
        if(record !== null){
            var me =this;
            var grid = Ext.getCmp('sdpFilesGrid');
            Ext.BaseAjax.request({
                url:'rest/sdpFile/delete.htm',
                method: 'POST',
                params:{
                    idSdpFile: record.raw.idSdpFile
                },
                success: function(response, options){
                    var data = Ext.JSON.decode(response.responseText);
                    if(data.success){
                        win.store.load({params:{idSdp:win.idSdp}})
                    }else{
                        Ext.Msg.alert(me.controllerMessages.alertMessage,data.message)
                    }
                }
            });
        }
    },
    saveFile:function(button){
        var me = this;
        var window = button.up('window');
        var form = window.down('form');
        if(!form.isValid()) return;
        if (form.isValid()) {
            // Submit the Ajax request and handle the response
            form.submit({
                url: 'rest/sdpFile/register.htm',
                method:"POST",
                success: function(form, action){
                    var response=action.response.responseText;
                    response=Ext.JSON.decode(response);
                    if(response.success){
                        window.storeRef.load({params:{idWorkOrder:window.idWorkOrder}});
                        window.close();                        
                    }
                },
                failure:function(form, action){
                    var response=action.response.responseText;
                    response=Ext.JSON.decode(response);
                    if(!response.success){
                        Ext.Msg.alert(me.controllerMessages.alertMessage, response.message);                     
                    }                    
                }
            });
        }
    }
});
    
