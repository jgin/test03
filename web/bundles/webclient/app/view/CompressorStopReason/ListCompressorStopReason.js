/* 
 * To change this tealias: 'widget.listCompressorStopReason',mplate, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.CompressorStopReason.ListCompressorStopReason', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listCompressorStopReason',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
        idCompressorStopReasonHeader:"ID",
        compressorStopReasonNameHeader:"Compressor Stop Reason",
        compressorStopReasonAcronymHeader:"Acronym",
        discountedHeader:"Is Discounted"
    },
   entityName: '',
   
   title: '',
   
   listTitle: 'Compressor Stop Reason List',
   
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
                    idCompressorStopReason:{header:me.messages.idCompressorStopReasonHeader},
                    compressorStopReasonName:{header:me.messages.compressorStopReasonNameHeader},
                    compressorStopReasonAcronym:{header:me.messages.compressorStopReasonAcronymHeader},
                    discounted:{header:me.messages.discountedHeader}
                }
            },                    
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});