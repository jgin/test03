

Ext.define('sisprod.view.Tool.AddTool', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addTool',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        toolNameLabel: 'Name',
        toolCodeLabel: 'Code',
        stockLabel: 'Stock',
        toolTypeLabel: 'Tool Type',
        measureUnitLabel: 'Measure Unit'
    },
    title: 'Add Tool',
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
                name: 'toolName',
                fieldLabel: me.messages.toolNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                labelWidth:150,
                anchor: '100%',
                allowBlank: false,
                maxLength: 200
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'toolCode',
                fieldLabel: me.messages.toolCodeLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                labelWidth:150,
                anchor: '100%',
                allowBlank: false,
                maxLength: 20
            },
            {
                xtype: 'numberfield',
                grow: true,
                name: 'stock',
                fieldLabel: me.messages.stockLabel,
                labelWidth:150,
                anchor: '100%',
                allowBlank: false,
                allowDecimals: true,
                allowNegative: false, 
                minValue:0
            },
            {
                xtype: 'combobox',
                anchor: '100%',             
                fieldLabel : me.messages.measureUnitLabel,
                labelWidth:150,
                store : Ext.create('sisprod.store.MeasureUnitAll').load(),
                displayField : 'measureUnitName',
                valueField : 'idMeasureUnit',
                name:'measureUnit.idMeasureUnit',
                forceSelection : true,
                allowBlank : false,
                editable : false
            },
            {
                xtype: 'combobox',
                anchor: '100%',             
                fieldLabel : me.messages.toolTypeLabel,
                labelWidth:150,
                store : Ext.create('sisprod.store.ToolTypeAll').load(),
                displayField : 'toolTypeName',
                valueField : 'idToolType',
                name:'toolType.idToolType',
                forceSelection : true,
                allowBlank : false,
                editable : false
            }
        ]
    }
    me.callParent(arguments);
    }
});