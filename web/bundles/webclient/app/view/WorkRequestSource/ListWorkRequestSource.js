/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkRequestSource.ListWorkRequestSource', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listWorkRequestSource',
   
   options: {},
   
   entityName: '',
   
   messages: {
       headers: {
           idWorkRequestSource: 'ID',
           workRequestSourceName: 'Request Source Name',
           workRequestSourceAcronym: 'Acronym'
       }
   },
   
   listTitle: 'Work Request Sources',
   
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
                    idWorkRequestSource:{
                        header: me.messages.headers.idWorkRequestSource
                    },
                    workRequestSourceName: {
                        header: me.messages.headers.workRequestSourceName
                    },
                    workRequestSourceAcronym: {
                        header: me.messages.headers.workRequestSourceAcronym
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       
       me.callParent(arguments);
   }
   
});