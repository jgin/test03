/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WellState.ListWellState', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listWellState',
    options: {},
    entityName: '',
    title: '',
    listTitle: 'Well State List',
    gridOptions: {
        region: 'center'
    },
    
    requires: [
       'sisprod.view.base.TabPanelGridItem'
    ],
    
    messages: {
        msgId:'Id',
        msgWellState: 'Well State',
        msgAcronym: 'Acronym'
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
                    idWellState: {
                        header: me.messages.msgId
                    },
                    wellStateName: {
                        header: me.messages.msgWellState
                    },
                    acronym: {
                        header: me.messages.msgAcronym
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});

