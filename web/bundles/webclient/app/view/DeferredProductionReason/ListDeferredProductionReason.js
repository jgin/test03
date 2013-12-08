/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.DeferredProductionReason.ListDeferredProductionReason', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listDeferredProductionReason',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   messages: {
        idDeferredProductionReasonHeader: 'ID',
        deferredProductionReasonNameHeader: 'Reason',
        deferredProductionCodeHeader: 'Code',
        deferredProductionTypeNameHeader: 'Type'
    },
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Deferred Production Reason List',
   
   gridOptions: {
        region: 'center'
    },
   
   initComponent: function(){
       var me = this;
       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
//       me.gridOptions = {};
       
       //
       me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idDeferredProductionReason: {header:me.messages.idDeferredProductionReasonHeader},
                    deferredProductionReasonName: {header:me.messages.deferredProductionReasonNameHeader},
                    deferredProductionCode: {header:me.messages.deferredProductionCodeHeader},
                    'deferredProductionType.idDeferredProductionType':{hideable: false},
                    'deferredProductionType.deferredProductionTypeName':{header: me.messages.deferredProductionTypeNameHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
});