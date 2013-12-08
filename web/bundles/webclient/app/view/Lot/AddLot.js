

Ext.define('sisprod.view.Lot.AddLot', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addLot',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        lotLabel: 'Lot',
        lorAcronymLabel: 'Acronym',
        surfaceLabel: 'Surface',
        measureUnitLabel: 'Measure Unit',
        suscriptionDateLabel: 'Suscription Date',
        externalIdLabel: 'Id External Sisman'
    },
    title: 'Add Lot',
    modal: true,
    width: 400,
    initComponent: function(){
        var me = this;
        me.formOptions = {
        bodyPadding: 2,
        items: [
            {
                xtype: 'textfield',
                grow: true,
                name: 'lotName',
                fieldLabel: me.messages.lotLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                labelWidth:150,
                anchor: '100%',
                allowBlank: false,
                maxLength: 150
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'lotAcronym',
                fieldLabel: me.messages.lorAcronymLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                labelWidth:150,
                anchor: '100%',
                allowBlank: false,
                maxLength: 10
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'externalId',
                fieldLabel: me.messages.externalIdLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                labelWidth:150,
                anchor: '100%',
                allowBlank: true,
                maxLength: 20
            },
            {
                xtype: 'numberfield',
                grow: true,
                name: 'area',
                fieldLabel: me.messages.surfaceLabel,
                labelWidth:150,
                anchor: '100%',
                allowBlank: false,
                allowDecimals: true,
                decimalSeparator:'.',
                allowNegative: false, 
                minValue:0
            },
            {
                xtype: 'combobox',
                anchor: '100%',             
                fieldLabel : me.messages.measureUnitLabel,
                labelWidth:150,
                store : Ext.create('sisprod.store.MeasureUnitForLot').load(),
                displayField : 'measureUnitName',
                valueField : 'idMeasureUnit',
                name:'measureUnit.idMeasureUnit',
                emptyText: me.messages.measureUnitLabel.measureUnitEmptyText,
                forceSelection : true,
                allowBlank : false,
                editable : false
            },
            {
                xtype: 'datefield',
                grow: true,
                name: 'suscDate',
                id: 'suscDate',
                fieldLabel: me.messages.suscriptionDateLabel,
                labelWidth:150,
                anchor: '100%',
                allowBlank: false,
                maxValue: new Date()
            }
        ]
    };
    me.callParent(arguments);
    }
});