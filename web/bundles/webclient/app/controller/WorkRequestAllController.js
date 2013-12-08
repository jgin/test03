/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WorkRequestAllController', {
   extend: 'sisprod.controller.Base',
   stores : ['WorkRequestAllStore'],
   models : ['WorkRequestAllModel'],
   entityName: 'WorkRequestAll',
   checkOutPermissions: false,
   refs: [{ref: 'listWorkRequestAll', selector: 'listWorkRequestAll'},
          {ref: 'consultWorkRequest', selector: 'consultWorkRequest'}],
   views : ['WorkRequestAll.ListWorkRequestAll'],
   
   requires: [
       'sisprod.store.WorkRequestAllStore'
   ],
   
   messages: {
       confirmText: 'Are you sure to nullify {0}?'
   },
   
   init : function(){
        this.control({
           'listWorkRequestAll dataview': {
               itemdblclick: this.onClickDataGrid
           },
           'consultWorkRequest gridpanel[id=gridWorkOrder]':{
               itemdblclick: this.onDblClick
           }
       });
       this.callParent(arguments);
    },
    
    onDblClick: function(grid, record, item, index){
        var me =this;
        var record = grid.getSelectionModel().getSelection()[0]; 
        var idWorkOrder = record.data.idWorkOrder;
        var listStore = me.getGridForEntity().getStore();
        var controller  = me.application.getController('sisprod.controller.WorkOrderClosableController');
        controller.listStore = listStore;
        var executeForm = Ext.create('sisprod.view.WorkOrderClosable.WorkOrderConsult', {record: record, controller:controller});
        executeForm.show();
    },
    getGridForEntity: function(){
        var tabGrid = this.getListWorkRequestAll();
        return tabGrid.getGridPanel();
    },
    
    onClickDataGrid: function(grid, record){
        var me = this;
        var record = grid.getSelectionModel().getSelection()[0];
        var grid = me.getGridForEntity();
        if(grid === undefined || grid === null) return;
        if(Ext.isDefined(record)){
            var listStore = me.getGridForEntity().getStore();
            var controller  = me.application.getController('sisprod.controller.WorkRequestAllController');
            controller.listStore = listStore;
            var executeForm = Ext.create('sisprod.view.WorkRequestAll.ConsultWorkRequest', {record: record, controller:controller});
            me.autoMappingFunction(grid,executeForm,record);
            executeForm.show();
        }else{
            Ext.Msg.alert(me.controllerMessages.alertMessage,me.messages.selectWorkOrder);
        }
    },
    loadWorkOrderGrid:function(){
        var store=Ext.getCmp('gridWorkOrder').getStore();
        store.load({params:{idWorkRequest:Ext.getCmp('idWorkRequest').getValue()}});
    },
    autoMappingFunction: function(grid, window, record){
        var me = this;
        var varForm = window.down('form');
        varForm.loadRecord(record);
        Ext.BaseAjax.request({
            url:'rest/workRequest/getCompleteById.htm',
            params:{
                idWorkRequest: record.raw.idWorkRequest
            },
            success: function(response){
                var data = Ext.JSON.decode(response.responseText);
            }
        });
        this.loadWorkOrderGrid();
    }
});

