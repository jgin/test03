/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.GeoFormation.ListGeoFormation', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listGeoFormation',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       idGeologicFormationHeader:'Geo Formation ID',
       geoFormationNameHeader:'Geo Formation'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Geo Formation List',
   
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
                    idGeologicFormation: {header:me.messages.idGeologicFormationHeader},
                    geoFormationName: {header:me.messages.geoFormationNameHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});