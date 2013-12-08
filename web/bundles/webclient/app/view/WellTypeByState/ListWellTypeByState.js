/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WellTypeByState.ListWellTypeByState', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listWellTypeByState',
    options: {},
    entityName: '',
    title: '',
    listTitle: 'Well Type By State List',
    gridOptions: {
        region: 'center'
    },
    
    requires: [
       'sisprod.view.base.TabPanelGridItem'
    ],
    
    messages: {
        msgId: 'Id',
        msgIdWellState: 'Id Well State',
        msgWellTypeByStateName: 'Well Type By State',
        msgAcronym: 'Acronym',
        msgWellState: 'Well State'
    },
    
    initComponent: function(){
        var me = this;
        var storeName = sisprod.getApplication().getStoreName(me.entityName);
        var modelName = sisprod.getApplication().getModelName(me.entityName);
        me.gridOptions = {
            title: me.listTitle, 
            autoGenerationOptions:{
                model: modelName,
                entityName: me.entityName,
                autoGenerateColumns: true,
                columnOptions: {
                    idWellTypeByState: {
                        header: me.messages.msgId
                    },
                    idWellState : {
                        header: me.messages.msgIdWellState
                    },
                    wellTypeByStateName: {
                        header: me.messages.msgWellTypeByStateName
                    },
                    wellTypeByStateAcronym: {
                        header: me.messages.msgAcronym
                    },
                    wellStateName: {
                        header: me.messages.msgWellState
                    }        
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});

