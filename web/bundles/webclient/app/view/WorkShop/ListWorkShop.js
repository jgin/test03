/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkShop.ListWorkShop', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listWorkShop',
   
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Workshops List',
   messages: {
       headers: {
           idWorkShop: 'ID',
           'sector.sectorName': 'Sector',
           workShopName: 'Workshop Name',
           workShopAcronym: 'Acronym'
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
                    idWorkShop:{header: me.messages.headers.idWorkShop},
                    idSector: {hideable: false},
                    'sector.sectorName':{header: me.messages.headers['sector.sectorName']},
                    workShopName: {header: me.messages.headers.workShopName},
                    workShopAcronym: {header: me.messages.headers.workShopAcronym}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       
       me.callParent(arguments);
   }
   
});