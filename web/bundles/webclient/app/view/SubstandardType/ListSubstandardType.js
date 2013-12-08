Ext.define('sisprod.view.SubstandardType.ListSubstandardType', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    require: [
        'sisprod.view.base.TabPanelGridItem'
    ],
    alias: 'widget.listSubstandardType',
    options: {},
    entityName: '',
    title: '',
    messages: {
        idSubstandardTypeHeader: 'Substandard Type ID',
        substandardTypeNameHeader: 'Substandard Type',
        substandardTypeAcronymHeader: 'Acronym'
    },
    listTitle: 'Substandard Type List',
    initComponent: function() {
        var me = this;
        var storeName = sisprod.getApplication().getStoreName(me.entityName);
        var modelName = sisprod.getApplication().getModelName(me.entityName);
        me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions: {
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idSubstandardType: {header: me.messages.idSubstandardTypeHeader},
                    substandardTypeName: {header: me.messages.substandardTypeNameHeader},
                    substandardTypeAcronym: {header: me.messages.substandardTypeAcronymHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});