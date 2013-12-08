/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.CompanyController', {
   extend: 'sisprod.controller.Base',
   stores : ['CompanyStore'],
   models : ['CompanyModel'],
   entityName: 'Company',
   refs: [{ref: 'listCompany', selector: 'listCompany'}],
   views : ['Company.ListCompany'],
   
   requires: [
       'sisprod.store.CompanyStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idCompany'],
       caption: 'companyName'
   },
   
   init : function(){
        this.control({
           'listCompany button[action=add]':{
               click: this.showAdd
           },
           'listCompany button[action=activate]':{
               click: this.activate
           },
           'listCompany button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listCompany dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listCompany button[action=delete]': {
               click: this.destroy
           },
           
           'listCompany button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addCompany button[action=save]': {
               click: this.saveEntity
           },
           
           'updateCompany button[action=save]': {
               click: this.saveEntity
           },
           'listCompany button[action=importCompany]': {
               click: this.importCompany
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListCompany();
        return tabGrid.getGridPanel();
    },
    
    autoMappingFunction: function(grid, form, record){
        var me = this;
        var formPanel = form.down('form');
        formPanel.loadRecord(record);
        var cmbCompanyType = formPanel.query("[name=idCompanyType]")[0];
        if(Ext.isDefined(cmbCompanyType)){
            if(Ext.isDefined(record.raw.companyType) && Ext.isDefined(record.raw.companyType.idCompanyType))
                cmbCompanyType.select(record.raw.companyType.idCompanyType);
        }
    }, 
    importCompany : function(button){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/companies/importExternalCompany.htm',
            method: 'GET',
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);                
                if(objResponse.success == true){
                    showAlertMessage(objResponse.message);
                    var grid =me.getGridForEntity();
                    var store = grid.getStore();
                    store.reload();
                } else {                    
                    showAlertMessage(objResponse.message);    
                }
            }
        });
    }
    
});

