/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.SdpReason.ListSdpReason', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listSdpReason',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       idSdpReason:'ID',
       sdpReasonNameHeader:'Name',
       sdpReasonAcronymHeader:'Acronym'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Revice Reason List',
   
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
                    idSdpReason: {header:me.messages.idSdpReason},
                    sdpReasonName: {header:me.messages.sdpReasonNameHeader},
                    sdpReasonAcronym: {header:me.messages.sdpReasonAcronymHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});