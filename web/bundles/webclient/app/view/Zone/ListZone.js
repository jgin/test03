/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Zone.ListZone', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listZone',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Zones List',
   messages: {
        idZoneHeader: 'Zone ID',
        zoneNameHeader: 'Zone',
        idLotHeader: 'Lot ID',
        lotNameHeader: 'Lot'
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
                    idZone: {header:me.messages.idZoneHeader},
                    zoneName: {header:me.messages.zoneNameHeader},
                    'lot.idLot':{header:me.messages.idLotHeader,hideable: false},
                    'lot.lotName':{header:me.messages.lotNameHeader},
                    zoneLotName:{hideable: false}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});