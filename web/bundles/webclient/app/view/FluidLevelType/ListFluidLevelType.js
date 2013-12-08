/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.FluidLevelType.ListFluidLevelType', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listFluidLevelType',
   
   options: {},
   
   entityName: '',
   
   listTitle: 'Fluid Level Type List',
   messages: {
       headers: {
           idFluidLevelType: 'ID',
           fluidLevelTypeName: 'Name',
           fluidLevelTypeAcronym: 'Acronym'
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
                    idFluidLevelType: {
                        header: me.messages.headers.idFluidLevelType
                    },
                    fluidLevelTypeName: {
                        header: me.messages.headers.fluidLevelTypeName
                    },
                    fluidLevelTypeAcronym: {
                        header: me.messages.headers.fluidLevelTypeAcronym
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
   }
   
});