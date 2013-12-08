/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Battery.UpdateBattery', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateBattery',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    autoMappingOptions: {
        autoMapping: false
    },
    messages:{
        batteryNameLabel:'Name',
        batteryAcronymLabel:'Acronym',
        batteryCodeLabel:'Battery Code',
        batteryTypeLabel:'Battery Type',
        zoneLabel:'Zone',
        adjustmentFactorLabel:'Adjustment Factor'
    },
    title: 'Update Battery',
    modal: true,
    width: 400,
    initComponent:function(){
        var me =this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idBattery'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'batteryName',
                fieldLabel: me.messages.batteryNameLabel,
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
                fieldLabel: me.messages.batteryAcronymLabel,
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
                    fieldLabel: me.messages.batteryTypeLabel,
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
                fieldLabel: me.messages.adjustmentFactorLabel,
                anchor: '100%',
                labelWidth:130,
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