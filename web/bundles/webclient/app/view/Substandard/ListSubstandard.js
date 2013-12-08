Ext.define('sisprod.view.Substandard.ListSubstandard', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    require: [
        'sisprod.view.base.TabPanelGridItem'
    ],
    alias: 'widget.listSubstandard',
    options: {},
    entityName: '',
    title: '',
    messages: {
        idSubstandardHeader: 'Substandard ID',
        substandardNameHeader: 'Substandard',
        substandardAcronymHeader: 'Acronym',
        idSubstandardTypeHeader: 'Substandard Type ID',
        substandardTypeNameHeader: 'Substandard Type'
    },
    listTitle: 'Substandard List',
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
                    idSubstandard: {header: me.messages.idSubstandardHeader},
                    substandardName: {header: me.messages.substandardNameHeader},
                    substandardAcronym: {header: me.messages.substandardAcronymHeader},
                    idSubstandardType: {header: me.messages.idSubstandardTypeHeader},
                    substandardTypeName: {header: me.messages.substandardTypeNameHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});