/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Sector.ListSector', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listSector',
   
   options: {},
   
   entityName: '',
   
   listTitle: 'Sector List',
   messages: {
       headers: {
           idSector: 'ID',
           sectorName:'Sector Name',
           sectorAcronym:'Sector Acronym'
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
                    idSector:{
                        header: me.messages.headers.idSector
                    },
                    sectorName: {
                        header: me.messages.headers.sectorName
                    },
                    sectorAcronym: {
                        header: me.messages.headers.sectorAcronym
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       
       me.callParent(arguments);
   }
   
});