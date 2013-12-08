/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Lot.ListLot', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listLot',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   messages: {
        idLotHeader: 'Lot ID',
        lotNameHeader: 'Lot Name',
        lotAcronymHeader: 'Acronym',
        measureUnitIdHeader: 'ID Measure Unit',
        measureUnitNameHeader: 'Measure Unit',
        surfaceHeader: 'Suscription Date',
        suscriptionDateHeader: 'Suscription Date',
        externalIdHeader: 'Id Sisman'
    },
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Lot List',
   
   gridOptions: {
        region: 'center'
    },
   
   initComponent: function(){
       var me = this;
       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
//       me.gridOptions = {};
       
       //
       me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idLot: {header:me.messages.idLotHeader},
                    externalId: {header:me.messages.externalIdHeader},
                    lotName: {header:me.messages.lotNameHeader},
                    lotAcronym: {header:me.messages.lotAcronymHeader},
                    area: {header:me.messages.surfaceHeader},
                    'measureUnit.idMeasureUnit':{header: me.messages.measureUnitIdHeader,hideable: false},
                    'measureUnit.measureUnitName':{header: me.messages.measureUnitNameHeader},
                    suscriptionDate: {header:me.messages.suscriptionDateHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
});