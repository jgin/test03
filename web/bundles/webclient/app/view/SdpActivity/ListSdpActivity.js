/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.SdpActivity.ListSdpActivity', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listSdpActivity',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       idSdpActivity:'ID',
       sdpActivityNameHeader:'Name'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Well Service Activity List',
   
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
                    idSdpActivity: {header:me.messages.idSdpActivity},
                    sdpActivityName: {header:me.messages.sdpActivityNameHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});