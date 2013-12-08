/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Battery.ListBattery', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listBattery',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
        idBatteryHeader:'Battery ID',
        batteryNameHeader:'Name',
        batteryAcronymHeader:'Acronym',
        batteryCodeHeader:'Battery Code',
        idBatteryTypeHeader:'Battery Type ID',
        batteryTypeHeader:'Battery Type',
        idZoneHeader:'Zone ID',
        zoneHeader:'Zone',
        idLotHeader:'Lot ID',
        lotHeader:'Lot'
    },
   entityName: '',
   
   title: '',
   
   listTitle: 'Battery List',
   
   gridOptions: {
        region: 'center'
    },
   
   initComponent: function(){
       var me = this;
       
//       me.gridOptions = {};
       
       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
       me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                   idBattery: {header:me.messages.idBatteryHeader,flex:1},
                    batteryName: {header:me.messages.batteryNameHeader,flex: 2},
                    batteryAcronym: {header:me.messages.batteryAcronymHeader,flex: 1},
                    batteryCode: {header:me.messages.batteryCodeHeader,flex: 2},  
                    'batteryType.idBatteryType':{header:me.messages.idBatteryTypeHeader,flex: 2,hideable:false},                
                    'batteryType.batteryTypeName':{header:me.messages.batteryTypeHeader,flex: 2},
                    'zone.lot.lotName':{header:me.messages.lotHeader,flex:2},
                    'zone.lot.idLot':{header:me.messages.idLotHeader,flex:2,hideable:false},
                    'zone.idZone':{header:me.messages.idZoneHeader,flex:2,hideable:false},
                    'zone.zoneName':{header:me.messages.zoneHeader,flex:2},
                    adjustmentFactor: {hideable: false}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});