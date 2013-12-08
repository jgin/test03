Ext.define('sisprod.view.ChemicalProduct.ListChemicalProduct', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listChemicalProduct',
    require: [
        'sisprod.view.base.TabPanelGridItem'
    ],
    options: {},
    messages: {
        idChemicalProduct: 'Chemical Product ID',
        chemicalProductAcronym: 'Acronym',
        chemicalProductName: 'Name',
        chemicalProductMeasureUnitId: 'Measure Unit ID',
        chemicalProductMeasureUnitName: 'Measure Unit'
    },
    entityName: '',
    title: '',
    listTitle: 'Chemical Product List',
    gridOptions: {
        region: 'center'
    },
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
                    idChemicalProduct: {header: me.messages.idChemicalProduct},
                    chemicalProductName: {header: me.messages.chemicalProductName},
                    chemicalProductAcronym: {header: me.messages.chemicalProductAcronym},
                    'measureUnit.idMeasureUnit':{header:me.messages.chemicalProductMeasureUnitId,hideable:false},
                    'measureUnit.measureUnitName':{header:me.messages.chemicalProductMeasureUnitName}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});