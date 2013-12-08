
/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.DependencyController', {
   extend: 'sisprod.controller.Base',
   stores : ['DependencyStore'],
   models : ['DependencyModel'],
   entityName: 'Dependency',
   refs: [{ref: 'listDependency', selector: 'listDependency'}],
   views : [
       'Dependency.ListDependency',
       'Dependency.AddDependency',
       'Dependency.UpdateDependency'
   ],
   /*messages:{
        dependencyLevelNoavailableError:"This Dependency Level Can not Be Registered since this module"
   },*/
   requires: [
       'sisprod.store.DependencyStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idDependency'],
       caption: 'dependencyName'
   },
   
   init : function(){
        this.control({
           'listDependency button[action=activate]':{
               click: this.activate
           },
           'listDependency button[action=add]':{
               click: this.showAdd
           },
           
           'listDependency button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listDependency dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listDependency button[action=delete]': {
               click: this.destroy
           },
           
           'listDependency button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addDependency button[action=save]': {
               click: this.saveEntity
           },
           
           'updateDependency button[action=save]': {
               click: this.saveEntity
           },           
           'addDependency button[id=idDependencyLevelAddButton],updateDependency button[id=idDependencyLevelAddButton]':{
               click: this.onDependencyLevelAddButton
           }, 
           
           'listDependency button[action=importDependency]': {
               click: this.importDependency
           }
       });
       this.callParent(arguments);
    },            
    mensaje: function(){
    },
    onDependencyLevelAddButton:function(){
        this.showSingleAdditonWindow('DependencyLevel');
    },            
    renderUpdate: function(){
        var idDependency = Ext.getCmp("idDependency");
        //var cboDependencyLevel = Ext.getCmp("idDependencyLevel");
        var cboDependencyParent = Ext.getCmp("cboDependency");
        var idDependencyParent = cboDependencyParent.getValue();
        //cboDependencyParent.clearValue();
        cboDependencyParent.store.load({params:{idDependencyLevel:Ext.getCmp("idDependencyLevel").getValue(), idDependency:idDependency.getValue()}});
        if(idDependencyParent!=0){
            cboDependencyParent.setValue(idDependencyParent);
        }else
            cboDependencyParent.clearValue(); 
        
         
    },    
    getGridForEntity: function(){
        var tabGrid = this.getListDependency();
        return tabGrid.getGridPanel();
        
    },
    afterSaveEntity: function(win, form, response, options){
        response=Ext.JSON.decode(response.responseText);
        if(Ext.isDefined(response.messageParent)){
            Ext.Msg.alert(this.controllerMessages.alertMessage, response.messageParent);
        }
        if(Ext.isDefined(response.success)){
            if(response.success==false)
                Ext.Msg.alert(this.controllerMessages.alertMessage, response.message);
            else
                win.close();
        } else
            win.close();
    },
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var cboDependencyLevel = Ext.getCmp('idDependencyLevel');
        var cboDependency = Ext.getCmp('cboDependency');
        varForm.loadRecord(record);        
        if(Ext.isDefined(cboDependencyLevel)){
            cboDependencyLevel.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cboDependencyLevel.select(record.raw.dependencyLevel.idDependencyLevel);
                }
            });
        }
            
        if(record.raw.dependencyParent!=null){
            cboDependency.setValue(new Ext.create(sisprod.getApplication().getModelName('Dependency'),{
                idDependency: record.raw.dependencyParent.idDependency,
                dependencyName: record.raw.dependencyParent.dependencyName
            }));
        }
    }, 
    importDependency : function(button){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/dependency/importExternalDependency.htm',
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