/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.SectorController', {
   extend: 'sisprod.controller.Base',
   stores : ['SectorStore'],
   models : ['SectorModel'],
   entityName: 'Sector',
   refs: [{ref: 'listSector', selector: 'listSector'}],
   views : ['Sector.ListSector'],
   
   requires: [
       'sisprod.store.SectorStore'
   ],
   
   messages: {
       addDetailAlert: 'Add an employee at least!'
   },
   
   deleteOptions: {
       deleteKeys: ['idSector'],
       caption: 'sectorName'
   },
   
   init : function(){
        Ext.create('Ext.data.Store',{
            storeId: 'taskSchedulerStore',
            model: 'sisprod.model.TaskSchedulerModel',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        });
       
        this.control({
           'listSector button[action=activate]':{
               click: this.activate
           }, 
           
           'listSector button[action=add]':{
               click: this.showAdd
           },
           
           'listSector button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listSector dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listSector button[action=delete]': {
               click: this.destroy
           },
           
           'listSector button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addSector button[action=save]': {
               click: this.saveEntity
           },
           
           'updateSector button[action=save]': {
               click: this.saveEntity
           },
           
           'addSector, updateSector': {
               close: this.onCloseWindow
           }
       });
       this.callParent(arguments);
    },
 
    getGridForEntity: function(){
        var tabGrid = this.getListSector();
        return tabGrid.getGridPanel();
    },
            
    onCloseWindow: function(){
        var store = Ext.StoreManager.lookup('taskSchedulerStore');
        if(Ext.isDefined(store) && store!==null){
            store.removeAll();
        }
    },
    
    beforeSaveEntity: function(window, form, values, jsonData){
        var me = this;
        var grid;
        grid = form.down('#taskSchedulerGrid');
        var store = grid.store;
        if(store.getCount()===0){
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.addDetailAlert);
            return false;
        }
        else{
            var taskSchedulerList = new Array();
            for(var i=0;i<store.getCount();i++){
                taskSchedulerList.push(store.getAt(i).data);
            }
            values.taskSchedulerList = Ext.encode(taskSchedulerList);
            return true;
        }
    },
            
    autoMappingFunction: function(grid, window, record){
        var me = this;
        Ext.BaseAjax.request({
            url:'rest/sector/getCompleteById.htm',
            params:{
                idSector: record.raw.idSector
            },
            success: function(response, options){
                var data = Ext.JSON.decode(response.responseText);
                me.setFormData(window, data);
            }
        });
    },
    
    setFormData: function(window, data){
        var me = this;
        var sector = data.sector;
        var formPanel = window.down('form');
        if(formPanel!==null){
            me.setDataInForm(formPanel, sector);
            var grid = formPanel.queryById('taskSchedulerGrid');
            if(grid!==null){
                var store = grid.getStore();
                var rows = new Array();
                Ext.Array.each(data.taskSchedulerList, function(value, index, itself) {
                    if(value){
                        var row = Ext.create('sisprod.model.TaskSchedulerModel',
                        {
                            idTaskScheduler: value['idTaskScheduler'],
                            idEmployee: value['employee']['idEmployee'],
                            personFullName: value['employee']['person']['personFullName'],
                            fullDocumentNumber: value['employee']['person']['fullDocumentNumber']
                        });
                        rows.push(row);
                    }
                });
                store.loadData(rows, false);
            }
        }
    }
});

