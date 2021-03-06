Ext.define('sisprod.view.ChemicalProduct.AddChemicalProduct', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addChemicalProduct',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        chemicalProductAcronymLabel: 'Acronym',
        chemicalProductNameLabel: 'Name',
        chemicalProductMeasureUnitLabel: 'Measure Unit'
    },
    title: 'Add Chemical Product',
    modale: true,
    width: 400,
    initComponent: function() {
        var me = this;
        me.formOptions = {
            bodyPadding: 2,
            fieldDefaults: {
                labelWidth: 120
            },
            items: [
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'chemicalProductName',
                    fieldLabel: me.messages.chemicalProductNameLabel,
                    fieldStyle: {
                        textTransform: 'uppercase'
                    },
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 150
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'chemicalProductAcronym',
                    fieldLabel: me.messages.chemicalProductAcronymLabel,
                    fieldStyle: {
                        textTransform: 'uppercase'
                    },
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 20
                },
                {
                    xtype: 'combofieldcontainer',
                    anchor: '100%',
                    name: 'idMeasureUnit',
                    comboBoxOptions: {
                        xtype: 'combobox',
                        anchor: '100%',
                        fieldLabel: me.messages.chemicalProductMeasureUnitLabel,
                        labelWidth: 120,
                        store: Ext.create('sisprod.store.MeasureUnitAll').load(),
                        displayField: 'measureUnitName',
                        valueField: 'idMeasureUnit',
                        name: 'idMeasureUnit',
                        id: 'idMeasureUnit',
                        forceSelection: true,
                        allowBlank: false,
                        editable: false,
                        width: 335
                    }
                }
            ]
        };
        me.callParent(arguments);
    }
});