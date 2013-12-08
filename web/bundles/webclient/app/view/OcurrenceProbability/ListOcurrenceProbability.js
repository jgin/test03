/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.OcurrenceProbability.ListOcurrenceProbability', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listOcurrenceProbability',
   
   options: {},
   
   entityName: '',
   
   messages: {
       headers: {
           idOcurrenceProbability: 'ID',
           ocurrenceProbabilityName: 'Name',
           ocurrenceProbabilityValue: 'Value',
           description: 'Description'
       }
   },
   
   listTitle: 'Risk Levels',
   
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
                    idOcurrenceProbability: {
                        header: me.messages.headers.idOcurrenceProbability
                    },
                    ocurrenceProbabilityName: {
                        header: me.messages.headers.ocurrenceProbabilityName
                    },
                    ocurrenceProbabilityValue: {
                        header: me.messages.headers.ocurrenceProbabilityValue,
                        flex: .5
                    },
                    description: {
                        header: me.messages.headers.description,
                        flex: 3
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       
       me.callParent(arguments);
   }
   
});