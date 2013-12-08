/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.LocationType.ListLocationType', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listLocationType',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       idLocationTypeHeader:'Location Type ID',
       locationTypeNameHeader:'Location Type',
       locationTypeAcronymHeader:'Acronym'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Location Type List',
   
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
                    idLocationType: {header:me.messages.idLocationTypeHeader},
                    locationTypeName: {header:me.messages.locationTypeNameHeader},
                    locationTypeAcronym: {header:me.messages.locationTypeAcronymHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});