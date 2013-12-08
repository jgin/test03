Ext.define('sisprod.view.ChemicalTreatment.ListChemicalTreatment', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    require: [
        'sisprod.view.base.TabPanelGridItem'
    ],
    alias: 'widget.listChemicalTreatment',
    options: {},
    entityName: '',
    listTitle: 'Chemicalt Treatment\'s List',
    messages: {
        headers: {
            idChemicalTreatment: 'ID',
            chemicalTreatmentDate: 'Date',
            well: 'Well'
        },
        buttons: {
            detailButton: 'Detail'
        }
    },
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
                    idChemicalTreatment: {header: me.messages.headers.idChemicalTreatment},
                    chemicalTreatmentDate: {header: me.messages.headers.chemicalTreatmentDate, flex: 1},
                    'well.idWell': {hideable:false},
                    'well.wellName': {header: me.messages.headers.well},
                    'battery.idBattery': {hideable:false},
                    'battery.batteryName': {hideable:false}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName),
            topBarButtons: [
                
            ]
        };
        me.callParent(arguments);
    }
});