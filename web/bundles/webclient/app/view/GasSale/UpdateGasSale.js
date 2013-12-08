Ext.define('sisprod.view.GasSale.UpdateGasSale', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addGasSale',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        saleHoursLabel: 'Sale Hours',
        quantityLabel: 'Quantity',
        auditedSaleLabel: 'Audited Sale'
    },
    title: 'Update Gas Sale',
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
                    xtype: 'hiddenfield',
                    name: 'idGasSale',
                    id: 'idGasSale'
                },
                {
                    xtype: 'numberfield',
                    minValue: 0,
                    maxValue: 24,
                    grow: true,
                    name: 'saleHours',
                    id: 'saleHours',
                    fieldLabel: me.messages.saleHoursLabel,
                    anchor: '100%',
                    allowBlank: false
                },
                {
                    xtype: 'numberfield',
                    minValue: 0,
                    grow: true,
                    name: 'quantity',
                    id: 'quantity',
                    fieldLabel: me.messages.quantityLabel,
                    anchor: '100%',
                    allowBlank: false
                },
                {
                    xtype: 'hiddenfield',
                    name: 'idMeasureUnit',
                    id: 'idMeasureUnit'
                },
                {
                    xtype: 'checkboxfield',
                    grow: true,
                    name: 'auditedSale',
                    id: 'auditedSale',
                    fieldLabel: me.messages.auditedSaleLabel,
                    anchor: '100%',
                    allowBlank: false
                }
            ]
        };
        me.callParent(arguments);
    }
});