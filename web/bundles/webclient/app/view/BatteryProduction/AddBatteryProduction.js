

Ext.define('sisprod.view.BatteryProduction.AddBatteryProduction', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addBatteryProduction',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        batteryLabel:'Name Battery',
        msgOil:'Oil',
        msgWater:'Water',
        msgGas:'Gas',
        wellNumber: 'Well Number',
        lotLabel: 'Lot',
        adjustmentFactor: 'Adjustment Factor',
        netProduction: 'Net Production',
        oilTransfer: 'Oil Transfer',
        oilPrevious: 'Oil Previous',
        oilProduction: 'Oil Production',
        oilForecast: 'Oil Forecast',
        messageText: 'Message',
        validations: {
            selectLot: 'Select Lot first...'
        }
    },
    title: 'Add Battery Production',
    modal: true,
    width: 400,
    initComponent:function(){
        var me= this;
        me.formOptions= {
        bodyPadding: 10,
        fieldDefaults: {
            labelWidth: 120
        },
        items: [
                {
                    xtype: 'combobox',         
                    fieldLabel : me.messages.lotLabel,
                    store : Ext.create('sisprod.store.LotAll').load(),
                    displayField : 'lotName',
                    valueField : 'idLot',
                    id: 'idLotBatteryProduction',
                    name:'lot.idLot',
                    forceSelection : true,
                    allowBlank : false,
                    editable : false
                },
                {
                    xtype: 'combobox',         
                    fieldLabel : me.messages.batteryLabel,
                    store: Ext.create('sisprod.store.BatteryByLotStore',{
                        listeners: {
                            beforeload: function(store, operation, options){
                                var form = me.down('form');
                                var LotInput = form.queryById('idLotBatteryProduction');
                                var selectedLot = LotInput.getValue();
                                if(Ext.isDefined(selectedLot) && selectedLot!==null){
                                    if(Ext.isDefined(operation.params) && operation.params!==null)
                                        operation.params.idLot = selectedLot;
                                    else operation.params = {query: '', idLot: selectedLot};
                                }
                                else{
                                    Ext.Msg.alert(me.messages.messageText, me.messages.validations.selectLot);
                                    return false;
                                }
                            }
                        }
                    }),
                    displayField : 'batteryName',
                    valueField : 'idBattery',
                    id: 'cboBatteryByLot',
                    name:'idBattery',
                    forceSelection : true,
                    allowBlank : false,
                    editable : false
                },
//                {
//                    xtype: 'sensitivecombo',
//                    flex:5,
//                    name: 'idBattery',
//                    fieldLabel: me.messages.batteryLabel,
//                    hideTrigger: false,
//                    store: Ext.create('sisprod.store.BatteryByLotStore',{
//                        listeners: {
//                            beforeload: function(store, operation, options){
//                                var form = me.down('form');
//                                var LotInput = form.queryById('idLotBatteryProduction');
//                                var selectedLot = LotInput.getValue();
//                                if(Ext.isDefined(selectedLot) && selectedLot!==null){
//                                    if(Ext.isDefined(operation.params) && operation.params!==null)
//                                        operation.params.idLot = selectedLot;
//                                    else operation.params = {query: '', idLot: selectedLot};
//                                }
//                                else{
//                                    Ext.Msg.alert(me.messages.messageText, me.messages.validations.selectLot);
//                                    return false;
//                                }
//                            }
//                        }
//                    }),
//                    emptyText: me.messages.activityOtEmptyText,
//                    id: 'cboBatteryByLot',
//                    allowBlank: false,
//                    displayTpl: Ext.create('Ext.XTemplate',
//                        '<tpl for=".">','{batteryName}','</tpl>'),
//                    valueField: 'idBattery',
//                    listConfig: {
//                        getInnerTpl: function() {
//                            return "{batteryName}";
//                        }
//                    }
//                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'numberfield',
                    items: [
                        {
                            flex: 1,
                            name: 'oil',
                            id: 'oilBatteryProduction',
                            labelWidth: 40,
                            minValue: 0,
                            fieldLabel: me.messages.msgOil
                        },
                        {
                            flex: 1,
                            labelWidth: 30,
                            name: 'water',
                            id:'waterBatteryProduction',
                            minValue: 0,
                            fieldLabel: me.messages.msgWater
                        },
                        {
                            name: 'gas',
                            id: 'gasBatteryProduction',
                            labelWidth: 30,
                            minValue: 0,
                            fieldLabel: me.messages.msgGas,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'wellNumber',
                    id: 'idWellNumber',
                    fieldLabel:me.messages.wellNumber,
                    fieldStyle: {
                        textTransform: 'uppercase'
                    },
                    readOnly:true,
                    anchor: '100%',
                    allowBlank: true,
                    maxLength: 100
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'adjustmentFactor',
                    id: 'adjustmentFactor',
                    fieldLabel:me.messages.adjustmentFactor,
                    fieldStyle: {
                        textTransform: 'uppercase'
                    },
                    readOnly:true,
                    anchor: '100%',
                    allowBlank: true,
                    maxLength: 100
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'netProduction',
                    hidden: true,
                    fieldLabel:me.messages.netProduction,
                    fieldStyle: {
                        textTransform: 'uppercase'
                    },
                    readOnly:true,
                    anchor: '100%',
                    allowBlank: true,
                    maxLength: 100
                },
                {
                    xtype: 'numberfield',
                    grow: true,
                    name: 'oilTransfer',
                    fieldLabel: me.messages.oilTransfer,
                    anchor: '100%',
                    allowBlank: true,
                    allowDecimals: true,
                    allowNegative: false,
                    decimalSeparator:'.',
                    minValue:0
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'oilPrevios',
                    id: 'oilPrevios',
                    fieldLabel:me.messages.oilPrevious,
                    readOnly:true,
                    anchor: '100%',
                    allowBlank: true,
                    maxLength: 100
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'oilProduction',
                    hidden: true,
                    fieldLabel:me.messages.oilProduction,
                    readOnly:true,
                    anchor: '100%',
                    allowBlank: true,
                    maxLength: 100
                },
                {
                    xtype: 'numberfield',
                    grow: true,
                    name: 'oilForecast',
                    fieldLabel: me.messages.oilForecast,
                    anchor: '100%',
                    allowBlank: false,
                    allowDecimals: true,
                    allowNegative: false,
                    decimalSeparator:'.',
                    minValue:0
                }
            ]
        };
        me.callParent(arguments);
    }
});