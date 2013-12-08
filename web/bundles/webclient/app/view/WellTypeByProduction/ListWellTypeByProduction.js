/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WellTypeByProduction.ListWellTypeByProduction', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listWellTypeByProduction',
    options: {},
    entityName: '',
    title: '',
    listTitle: 'Well Type by Production List',
    gridOptions: {
        region: 'center'
    },
    
    requires: [
       'sisprod.view.base.TabPanelGridItem'
    ],
    
    messages: {
        msgId: 'Id',
        msgWellTypeByProduction: 'Tipo de Pozo por Producción',
        msgAcronym: 'Acronym',
        msgMinPercentage: 'Porcentage Mínimo',
        msgMaxPercentage: 'Porcentage Máximo'
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
                    idWellTypeByProduction: {
                        header: me.messages.msgId
                    },
                    wellTypeByProductionName: {
                        header: me.messages.msgWellTypeByProduction
                    },
                    acronym: {
                        header: me.messages.msgAcronym
                    },
                    minPercentage: {
                        header: me.messages.msgMinPercentage
                    },
                    maxPercentage: {
                        header: me.messages.msgMaxPercentage
                    }        
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});

