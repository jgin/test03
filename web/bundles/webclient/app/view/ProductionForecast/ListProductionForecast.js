/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.ProductionForecast.ListProductionForecast', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listProductionForecast',
    options: {},
    entityName: '',
    title: '',
    listTitle: 'Listado de Pronósticos de Producción',
    gridOptions: {
        region: 'center'
    },
    
    requires: [
       'sisprod.view.base.TabPanelGridItem'
    ],
    
    messages: {
        msgId: 'Id',
        msgForectas: 'Forecast',
        msgIdLot: 'Id Lot',
        msgEffectiveStartDate: 'Start Date',
        msgEffectiveEndDate: 'End Date'
    },
    
    showCheckInactive: false,
    
    initComponent: function(){
        var me = this;
        var storeName = sisprod.getApplication().getStoreName(this.entityName);
        var modelName = sisprod.getApplication().getModelName(this.entityName);
        me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idProductionForecast: {
                        header: me.messages.msgId
                    },
                    productionForecastName: {
                        header: me.messages.msgForectas
                    },
                    idLot: {
                        header: me.messages.msgIdLot
                    },
                    lotName: {
                        header: me.messages.msgLot
                    },
                    effectiveStartDate: {
                        header: me.messages.msgEffectiveStartDate
                    },
                    effectiveEndDate: {
                        header: me.messages.msgEffectiveEndDate
                    }        
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});

