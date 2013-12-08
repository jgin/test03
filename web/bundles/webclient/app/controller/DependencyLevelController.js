/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.DependencyLevelController', {
   extend: 'sisprod.controller.Base',
   stores : ['DependencyLevelStore'],
   models : ['DependencyLevelModel'],
   entityName: 'DependencyLevel',
   refs: [{ref: 'listDependencyLevel', selector: 'listDependencyLevel'}],
   views : ['DependencyLevel.ListDependencyLevel'],
   
   requires: [
       'sisprod.store.DependencyLevelStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idDependencyLevel'],
       caption: 'dependencyLevelName'
   },
   
   init : function(){
        this.control({
           'listDependencyLevel button[action=activate]':{
               click: this.activate
           },
            
           'listDependencyLevel button[action=add]':{
               click: this.showAdd
           },
           
           'listDependencyLevel button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listDependencyLevel dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listDependencyLevel button[action=delete]': {
               click: this.destroy
           },
           
           'listDependencyLevel button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addDependencyLevel button[action=save]': {
               click: this.saveEntity
           },           
           'updateDependencyLevel button[action=save]': {
               click: this.saveEntity
           },
           
           'listDependencyLevel button[action=importDependencyLevel]': {
               click: this.importDependencyLevel
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListDependencyLevel();
        return tabGrid.getGridPanel();
    },
            
    importDependencyLevel : function(button){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/dependencyLevel/importExternalDependencyLevel.htm',
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

