/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.DigitalSignatureController', {
   extend: 'sisprod.controller.Base',
   refs: [{ref: 'uploadDigitalSignature', selector: 'uploadDigitalSignature'}],
   entityName: 'Employee',
  
  
      
   init : function(){
        this.control({           
           'addEvidenceFile button[action=save]': {
               click: this.saveFile
           },
           'addEvidenceFile': {
               beforerender: this.onBeforeRender
           }
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
    getImageForEntity: function(){
        var image = this.getListBloodGroup();
        return image.getGridPanel();
    },
    deleteEvidenceFile:function(record,win){
        if(record !== null){
            var me =this;
            var grid = Ext.getCmp('evidenceFilesGrid');
            Ext.BaseAjax.request({
                url:'rest/evidenceFile/delete.htm',
                method: 'POST',
                params:{
                    idEvidenceFile: record.raw.idEvidenceFile
                },
                success: function(response, options){
                    var data = Ext.JSON.decode(response.responseText);
                    if(data.success){
                        win.store.load({params:{idWorkOrder:win.idWorkOrder}})
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
                url: 'rest/evidenceFile/register.htm',
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
    
