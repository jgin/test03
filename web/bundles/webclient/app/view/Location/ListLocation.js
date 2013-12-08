/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Location.ListLocation', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listLocation',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
        idLocationHeader:'Location ID',
        locationNameHeader:'Name',
        locationAcronymHeader:'Acronym',
        idLocationParentHeader:'Location Parent ID',
        locationParentNameHeader:'Location',
        idLocationTypeHeader:'Location Type ID',
        locationTypeHeader:'Location Type',
        lotHeader:'Lot'
    },
   entityName: '',
   
   title: '',
   
   listTitle: 'Location List',
   
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
                    idLocation: {header:me.messages.idLocationHeader},
                    locationName:{header:me.messages.locationNameHeader},
                    locationAcronym:{header:me.messages.locationAcronymHeader},
                    'locationParent.idLocation':{header:me.messages.idLocationParentHeader,hideable:false},
                    'locationParent.locationName':{header:me.messages.locationParentNameHeader},
                    'locationType.idLocationType':{header:me.messages.idLocationTypeHeader,hideable:false},
                    'locationType.locationTypeName':{header:me.messages.locationTypeHeader},
                    'lot.idLot':{hideable:false},
                    'lot.lotName':{header:me.messages.lotHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});