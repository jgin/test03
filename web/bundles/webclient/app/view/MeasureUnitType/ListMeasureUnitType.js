/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.MeasureUnitType.ListMeasureUnitType',{
    extend: 'sisprod.view.base.TabPanelGridItem',
    
    alias: 'widget.listMeasureUnitType',
    
    require: [
        'sisprod.view.base.TabPanelGridItem'
    ],
    messages: {
        idMeasureUnitTypeHeader:'Measure Unit Type ID',
        measureUnitTypeNameHeader:'Measure Unit Type'
    },
    options: {},
    
    entity: '',
    
    title: '',
    
    listTitle: 'Measure Units Types List',
    
    gridOptions: {
        region: 'center' 
    },
    
    initComponent: function(){
        var me = this;
        var storeName = sisprod.getApplication().getStoreName(me.entityName);
        var modelName = sisprod.getApplication().getModelName(me.entityName);
        me.gridOptions = {
           title: me.listTitle,
           entityName:me.entityName, 
           autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idMeasureUnitType: {header:me.messages.idMeasureUnitTypeHeader},
                    measureUnitTypeName: {header:me.messages.measureUnitTypeNameHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
              
        me.callParent(arguments);
    }    
});