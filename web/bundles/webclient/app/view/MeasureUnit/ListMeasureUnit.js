/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.MeasureUnit.ListMeasureUnit', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   alias: 'widget.listMeasureUnit',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   messages: {
        idMeasureUnitHeader: 'Measure Unit ID',
        idMeasureUnitTypeHeader:'Measure Unit Type ID',
        measureUnitTypeNameHeader:'Measure Unit Type',
        isBaseUnitHeader: 'Is Base Unit',
        measureUnitNameHeader: 'Measure Unit',
        measureUnitAcronymHeader: 'Acronym',
        baseConversionHeader:'Base Conversion'
    },
   
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Measure Units List',
   
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
                    idMeasureUnit: {header:me.messages.idMeasureUnitHeader},
                    'measureUnitType.idMeasureUnitType': {header:me.messages.idMeasureUnitTypeHeader},
                    'measureUnitType.measureUnitTypeName': {header:me.messages.measureUnitTypeNameHeader},
                    isBaseUnit: {header:me.messages.isBaseUnitHeader},
                    measureUnitName: {header:me.messages.measureUnitNameHeader},
                    measureUnitAcronym: {header:me.messages.measureUnitAcronymHeader},
                    baseConversion: {header:me.messages.baseConversionHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       
       me.callParent(arguments);
        
   }
   
});