Ext.define('sisprod.view.WellTestType.ListWellTestType', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listWellTestType',
    options: {},
    entityName: '',
    
    title: '',
    
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
                    idWellTestType : { header: me.messages.columnHeaders.idWellTestType },
                    wellTestTypeCode : { header: me.messages.columnHeaders.wellTestTypeCode },
                    wellTestTypeName : { header: me.messages.columnHeaders.wellTestTypeName }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});
