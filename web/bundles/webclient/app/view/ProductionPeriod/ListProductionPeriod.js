/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.ProductionPeriod.ListProductionPeriod', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listProductionPeriod',
    options: {},
    entityName: '',
    
    title: '',
    listTitle: 'Listado de Fechas',
//    
//    messages : {
//        columnHeaders : {
//            
//        }
//    },
    baseView: 'BaseList',
    gridOptions: {
        region: 'center'
    },
    
    requires: [
       'sisprod.view.base.TabPanelGridItem'
    ],
    
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
                    idProductionPeriod : { header: me.messages.columnHeaders.idProductionPeriod , align: 'right'},
                    productionPeriodDate : { header: me.messages.columnHeaders.productionPeriodDate },
                    'productionPeriodStatus.productionPeriodStatusName' : {header: me.messages.columnHeaders.productionPeriodStatus },
                    productionPeriodComment : { header: me.messages.columnHeaders.productionPeriodComment }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});
