/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkOrderReason.ListWorkOrderReason', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listWorkOrderReason',
   
   options: {},
   
   entityName: '',
   
   messages: {
       headers: {
           idWorkOrderReason: 'ID',
           workOrderReasonName: 'Reason'
       }
   },
   
   listTitle: 'Work Order Reasons',
   
   gridOptions: {
        region: 'center'
    },
   
   initComponent: function(){
       var me = this;
       
       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
       me.gridOptions = {
           title: me.listTitle,
           entityName: me.entityName,
           autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idWorkOrderReason:{
                        header: me.messages.headers.idWorkOrderReason
                    },
                    workOrderReasonName: {
                        header: me.messages.headers.workOrderReasonName
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       
       me.callParent(arguments);
   }
   
});