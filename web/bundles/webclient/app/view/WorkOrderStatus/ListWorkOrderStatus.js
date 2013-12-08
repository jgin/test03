/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkOrderStatus.ListWorkOrderStatus', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listWorkOrderStatus',
   
   options: {},
   
   entityName: '',
   
   listTitle: 'Order States List',
   messages: {
       headers: {
           idWorkOrderStatus: 'ID',
           workOrderStatusName: 'Status Name',
           hasCause: 'Has Reasons',
           workOrderStatusColor: 'Color'
       }
   },
   
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
                    idWorkOrderStatus:{
                        header: me.messages.headers.idWorkOrderStatus
                    },
                    workOrderStatusName: {
                        header: me.messages.headers.workOrderStatusName
                    },
                    hasCause: {
                        header: me.messages.headers.hasCause
                    },
                    workOrderStatusColor: {
                        header: me.messages.headers.workOrderStatusColor,
                        align: 'center',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                            metaData.style = Ext.String.format("background-color: {0};background-image: none;", value);
                            return Ext.util.Format.htmlEncode(Ext.util.Format.uppercase(value));
                        }
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName),
            baseGridOptions: {
                allowAdd: false,
                allowUpdate: true,
                allowDelete: true,
                allowPrint: true
            }
       };
       
       me.callParent(arguments);
   }
   
});