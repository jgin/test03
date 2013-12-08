/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.SdpCompanyController', {
   extend: 'sisprod.controller.Base',
   stores : ['SdpCompanyStore'],
   models : ['SdpCompanyModel'],
   entityName: 'SdpCompany',
   refs: [{ref: 'listSdpCompany', selector: 'listSdpCompany'}],
   views : ['SdpCompany.ListSdpCompany'],
  
   requires: [
       'sisprod.store.SdpCompanyStore'
   ],
   messages: {
        msgSelectWellServiceType: 'Select a Well Service Type at last!'
   },
   deleteOptions: {
       deleteKeys: ['idSdpCompany'],
       caption: 'companyName'
   },
   
   init : function(){
        this.control({
            'listSdpCompany button[action=activate]':{
               click: this.activate
           },
           'listSdpCompany button[action=add]':{
               click: this.showAdd
           },
           
           'listSdpCompany button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listSdpCompany dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listSdpCompany button[action=delete]': {
               click: this.destroy
           },
           
           'listSdpCompany button[action=print]': {
               click: this.showPrint
           },
           
           'addSdpCompany button[action=save]': {
               click: this.saveEntity
           },
           
           'updateSdpCompany button[action=save]': {
               click: this.saveEntity
           },
           
           'addSdpCompany combobox[id=idCompany]': {
               select: this.onSelectCompany
           }
       });
       this.callParent(arguments);
    },
    getGridForEntity: function(){
        var tabGrid = this.getListSdpCompany();
        return tabGrid.getGridPanel();
    },
    onSelectCompany: function(combo, selectedRecords, eOpts) { 
        var data = selectedRecords[0].raw;
        var ruc = Ext.getCmp('sdpCompanyRuc');
        var address = Ext.getCmp('sdpCompanyAddress');
        ruc.setValue(data.defEntity.entityRuc);
        address.setValue(data.defEntity.address);
        console.log(ruc);
    },
    beforeSaveEntity:function(win, form, values){
        values.enabled=true;
        var store =  Ext.getCmp('gridWellServiceTypeSelector').getStore();
        if(store.getCount() === 0){
            showAlertMessage(this.messages.msgSelectWellServiceType);
            return false;
        }
        var selectorModel = Ext.getCmp('gridWellServiceTypeSelector').selModel;
        var listWellServiceType = new Array();
        for(var i = 0; i < selectorModel.selected.getCount(); i++){
            var etRecord = selectorModel.selected.getAt(i);
            listWellServiceType.push(etRecord.data);
        }
        values.gridWellServiceTypeSelector =  JSON.stringify(listWellServiceType);
        return true;
    },
    selectItems: function(selected){
        var me = this;
        var grid = Ext.getCmp('gridWellServiceTypeSelector');
        var store =  grid.getStore();
        var selectModel = grid.getSelectionModel();
        selectModel.deselectAll();
        for(var i = 0; i < selected.length; i++){
            var index = store.find('idWellServiceType', selected[i].idWellServiceType);                    
            if(index >= 0){
                selectModel.select(index, true);
            }
        }
    },
    getSystemUserGroupMember:function(idSdpCompany){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/sdpCompanies/listSdpCompanyWellService.htm',
            method: 'POST',
            async:false,
            params: {idSdpCompany: idSdpCompany},
            success: function(response, options){
                var responseData = Ext.decode(response.responseText);
                if(responseData.success){
                    me.selectItems(responseData.data);
                }      
            }
        });
    },
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var cboCompany = varForm.query("[name=company.idCompany]")[0];
        var ruc = varForm.query("[name=defEntity.entityRuc]")[0];
        var address = varForm.query("[name=defEntity.address]")[0];
                
        var idCompany = record.raw.company.idCompany;
        ruc.setValue(record.raw.company.defEntity.entityRuc);   
        address.setValue(record.raw.company.defEntity.address);   
        if(Ext.isDefined(cboCompany)){
            cboCompany.setValue(Ext.create(sisprod.getApplication().getModelName('Company'),{
                    idCompany: record.raw.company.idCompany,
                    companyName: record.raw.company.companyName
            }));
            
//            cboCompany.getStore().load({
//                scope: this,
//                callback: function(records, operation, success){
//                    cboCompany.select(idCompany);
//                }
//            });
        }
    }
});

