/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkRequestStatus.ListWorkRequestStatus', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listWorkRequestStatus',
   
   options: {},
   
   entityName: '',
   
   listTitle: 'Request States List',
   messages: {
       headers: {
           idWorkRequestStatus: 'ID',
           workRequestStatusName: 'Status Name',
           hasCause: 'Has Reasons',
           workRequestStatusColor: 'Color'
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
                    idWorkRequestStatus:{
                        header: me.messages.headers.idWorkRequestStatus
                    },
                    workRequestStatusName: {
                        header: me.messages.headers.workRequestStatusName
                    },
                    hasCause: {
                        header: me.messages.headers.hasCause
                    },
                    workRequestStatusColor: {
                        header: me.messages.headers.workRequestStatusColor,
                        align: 'center',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                            metaData.style = Ext.String.format("background-color: {0};background-image: none;", value);
                            return Ext.util.Format.htmlEncode(Ext.util.Format.uppercase(value))
                        }
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName),
            baseGridOptions: {
                allowAdd: false
            }
       };
       
       me.callParent(arguments);
   }
   
});