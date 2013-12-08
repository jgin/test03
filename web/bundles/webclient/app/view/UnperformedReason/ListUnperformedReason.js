/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.UnperformedReason.ListUnperformedReason', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listUnperformedReason',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       idUnperformedReasonHeader:'Unperformed Reason ID',
       UnperformedReasonNameHeader:'Name',
       UnperformedReasonCodeHeader:'Code'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Unperformed Reason List',
   
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
                    idUnperformedReason: {header:me.messages.idUnperformedReasonHeader},
                    unperformedReasonCode: {header:me.messages.UnperformedReasonCodeHeader},
                    unperformedReasonName: {header:me.messages.UnperformedReasonNameHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});