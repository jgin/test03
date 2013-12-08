/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WellGroup.ListWellGroup', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listWellGroup',
    options: {},
    entityName: '',
    title: '',
    listTitle: 'Well Group List',
    gridOptions: {
        region: 'center'
    },
    
    requires: [
       'sisprod.view.base.TabPanelGridItem'
    ],
    
    messages: {
        msgId: 'Id',
        msgWellGroup: 'Well Group'
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
                    idWellGroup: {
                        header: me.messages.msgId
                    },
                    wellGroupName: {
                        header: me.messages.msgWellGroup
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});

