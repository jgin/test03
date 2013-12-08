

Ext.define('sisprod.view.Battery.AddBattery', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias:'widget.addBattery',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        batteryNameLabel:'Name',
        batteryAcronymLabel:'Acronym',
        batteryCodeLabel:'Battery Code',
        batteryTypeLabel:'Battery Type',
        zoneLabel:'Zone',
        adjustmentFactorLabel:'Adjustment Factor'
    },
    title: 'Add Battery',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'textfield',
                grow: true,
                name: 'batteryName',
                fieldLabel:me.messages.batteryNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                labelWidth:130,
                anchor: '100%',
                allowBlank: false,
                maxLength: 150
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'batteryAcronym',
                fieldLabel:me.messages.batteryAcronymLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                labelWidth:130,
                anchor: '100%',
                allowBlank: false,
                maxLength: 20
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'batteryCode',
                fieldLabel: me.messages.batteryCodeLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                labelWidth:130,
                anchor: '100%',
                allowBlank: false,
                maxLength: 10
            },            
            {
                xtype: 'combofieldcontainer',
                anchor: '100%',
                comboBoxOptions: {
                    xtype: 'combobox',
                    anchor: '100%',             
                    fieldLabel :me.messages.batteryTypeLabel,
                    labelWidth:130,
                    store : Ext.create('sisprod.store.BatteryTypeAll').load(),
                    displayField : 'batteryTypeName',
                    valueField : 'idBatteryType',
                    name:'idBatteryType',
                    id:'idBatteryType',
                    forceSelection : true,
                    allowBlank : false,
                    editable : false,
                    width:335
                }
            },
            {
                xtype: 'combofieldcontainer',
                anchor: '100%',
                comboBoxOptions: {
                    xtype: 'combobox',
                    id:'idZone',
                    anchor: '100%',             
                    fieldLabel :me.messages.zoneLabel,
                    labelWidth:130,
                    store : Ext.create('sisprod.store.ZoneAll').load(),
                    //displayField : 'name',
                    displayField: 'zoneLotName',     
                    valueField : 'idZone',
                    name:'idZone',
                    emptyText: 'Seleccione',
                    forceSelection : true,
                    allowBlank : false,
                    editable : false,
                    width:335
                }
            },
            {
                xtype: 'numberfield',
                grow: true,
                name: 'adjustmentFactor',
                labelWidth:130,
                fieldLabel: me.messages.adjustmentFactorLabel,
                anchor: '100%',
                allowBlank: true,
                allowDecimals: true,
                allowNegative: false,
                decimalSeparator:'.',
                minValue:0
            }
            ]
        }
       me.callParent(arguments);
    }
});