/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.SdpCompanyCostController', {
   extend: 'sisprod.controller.Base',
   stores : ['SdpCompanyCostStore'],
   models : ['SdpCompanyCostModel'],
   entityName: 'SdpCompanyCost',
   refs: [  {ref: 'addSdpCompanyCost', selector: 'addSdpCompanyCost'},
            {ref: 'updateSdpCompanyCost', selector: 'updateSdpCompanyCost'},
            {ref: 'listSdpCompanyCost', selector: 'listSdpCompanyCost'}
        ],
   views : ['SdpCompanyCost.ListSdpCompanyCost'],
   
   requires: [
       'sisprod.store.SdpCompanyCostStore'
   ],
   init : function(){
        this.control({           
           'addSdpCompanyCost button[action=save]': {
               click: this.saveFile
           },
           'addSdpCompanyCost': {
//               beforerender: this.onBeforeRender
           },
           'updateSdpCompanyCost button[action=save]': {
               click: this.saveFile
           },
           'updateSdpCompanyCost': {
               beforerender: this.onBeforeRender
           }
       });
       this.callParent(arguments);
    },
    onBeforeRender:function(){
        var input = Ext.getCmp('fileSdpCost');
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
        var tabGrid = this.getListSdpCompanyCost();
        return tabGrid.getGridPanel();
    },
    deleteSdpCompanyCost:function(record,win){
        if(record !== null){
            var me =this;
            var grid = Ext.getCmp('sdpCompanyCostsGrid');
            Ext.BaseAjax.request({
                url:'rest/sdpCompanyCost/delete.htm',
                method: 'POST',
                params:{
                    idSdpCompanyCost: record.raw.idSdpCompanyCost
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
                url: 'rest/sdpCompanyCost/register.htm',
                method:"POST",
                success: function(form, action){
                    var response=action.response.responseText;
                    response=Ext.JSON.decode(response);
                    if(response.success){
                        window.storeRef.reload({params:{idSdp:window.idSdp}});
                        Ext.getCmp('gridSdpCompanyCost').selModel.deselectAll();
                        Ext.getCmp('gridSdpCompanyCost').getStore().reload();
//                        window.controller.getGridForEntity().getStore().reload();
                        var controller = me.getController('WellService');
                        var grid = controller.getGridForEntity();
                        grid.getStore().reload();
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
    },
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var cboSdpCompanyCost = Ext.getCmp('idSdpCompanyCost');
        var cboMoney = Ext.getCmp('cboMoney');
        cboSdpCompanyCost.getStore().load({
            scope: this,
            callback: function(records, operation, success){
                cboSdpCompanyCost.select(record.raw.sdpCompany.idSdpCompany);
            }
        });
        cboMoney.getStore().load({
            scope: this,
            callback: function(records, operation, success){
                cboMoney.select(record.raw.money.idMoney);
            }
        });
        var file = Ext.getCmp('fileSdpCost');
        console.log(record.data.valorizationFileName);
        file.emptyText = record.raw.valorizationFileName;
    }
});
    
