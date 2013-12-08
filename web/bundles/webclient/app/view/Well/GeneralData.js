Ext.define('sisprod.view.Well.GeneralData', {
    extend: 'Ext.panel.Panel',
    xtype: 'well-general',
    
    width: '100%',
    height: 460,
    layout: 'anchor',
    border: true,
    autoScroll: true,
    bodyPadding: 5,
    messages: {
        msgId: 'Id',
        msgCode: 'Code',
        msgWell: 'Well',
        msgWellState: 'Well State',
        msgWellTypeByState: 'Well Type by State',
        msgWellTypeByProduction: 'Well Type by Production',
        msgExtractionType: 'Extraction Type',
        msgWellGroup: 'Well Group',
        msgField: 'Field',
        msgBattery: 'Battery',
        msgCarrera: 'Carrera',
        msgSpm: 'SPM',
        msgWorkingTime: 'Working Time',
        msgBreakTime: 'Break Time',
        msgStartHour: 'Start Hour',
        msgEndHour: 'End Hour',
        msgOil: 'Oil',
        msgWater: 'Water',
        msgGas: 'Gas',
        msgFieldSetHours: 'Production Scheduler',
        msgFielProductionMeasures: 'Production average Measures',
        msgOnHour: 'Hours On',
        msgOffHour: 'Hours Off',
        msgLot: 'Lot'
    },
    
    initComponent: function(){
        var me = this;
        Ext.apply(this, {
            items:[
                {
                    xtype: 'textfield',
                    id: 'idWell',
                    fieldLabel: me.messages.msgId,
                    hidden:true  
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'wellCode',
                    fieldLabel: me.messages.msgCode,
                    allowBlank: false,
                    maxLength: 20,
                    anchor: '50%',
                    margins: '5 5 0 5'
                },
                {
                    xtype: 'textfield',
                    name: 'wellName',
                    fieldLabel: me.messages.msgWell,
                    allowBlank: false,
                    maxLength: 100,
                    margins: '0 0 0 5'
                },
                {
                    xtype: 'combobox',
                    name: 'idWellState',
                    id: 'idWellState',
                    store: Ext.create('sisprod.store.WellStateAllStore').load(),
                    fieldLabel: me.messages.msgWellState,
                    displayField: 'wellStateName',
                    valueField: 'idWellState',
                    emptyText: 'Seleccione',
                    forceSelection: true,
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    name: 'idWellTypeByState',
                    id: 'idWellTypeByState',
                    store: 'WellTypeByStateByWellStateStore',
                    fieldLabel: me.messages.msgWellTypeByState,
                    displayField: 'wellTypeByStateName',
                    valueField: 'idWellTypeByState',
                    emptyText: 'Seleccione',
                    forceSelection: true
                },
                {
                    xtype: 'combobox',
                    name: 'idWellTypeByProduction',
                    id: 'idWellTypeByProduction',
                    store: Ext.create('sisprod.store.WellTypeByProductionAllStore').load(),
                    fieldLabel: me.messages.msgWellTypeByProduction,
                    displayField: 'wellTypeByProductionName',
                    valueField: 'idWellTypeByProduction',
                    emptyText: 'Seleccione',
                    forceSelection: true
                },
                {
                    xtype: 'combobox',
                    name: 'idExtractionType',
                    id: 'idExtractionType',
                    store: 'ExtractionTypeByWellTypeByStateStore',
                    fieldLabel: me.messages.msgExtractionType,
                    displayField: 'extractionTypeName',
                    valueField: 'idExtractionType',
                    emptyText: 'Seleccione',
                    forceSelection: true
                },
                {
                    xtype: 'combobox',
                    name: 'idWellGroup',
                    id: 'idWellGroup',
                    store: Ext.create('sisprod.store.WellGroupAllStore').load(),
                    fieldLabel: me.messages.msgWellGroup,
                    displayField: 'wellGroupName',
                    valueField: 'idWellGroup',
                    emptyText: 'Seleccione',
                    forceSelection: true,
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    id: 'idLot',
                    name: 'idLot',
                    store: Ext.create('sisprod.store.LotAll').load(),
                    fieldLabel: me.messages.msgLot,
                    displayField: 'lotName',
                    valueField: 'idLot',
                    emptyText: 'Seleccione',
                    forceSelection: true,
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    name: 'idField',
                    id: 'idField',
                    store: 'FieldByLotStore',
                    fieldLabel: me.messages.msgField,
                    displayField: 'fieldName',
                    valueField: 'idField',
                    emptyText: 'Seleccione',
                    forceSelection: true
                },
                {
                    xtype: 'combobox',
                    name: 'idBattery',
                    id: 'idBattery',
                    store: 'BatteryByLotStore',
                    fieldLabel: me.messages.msgBattery,
                    displayField: 'batteryName',
                    valueField: 'idBattery',
                    emptyText: 'Seleccione',
                    forceSelection: true,
                    allowBlank: false
                },
                {
                    xtype: 'numberfield',
                    anchor: '50%',
                    name: 'carrera',
                    id: 'carrera',
                    fieldLabel: me.messages.msgCarrera
                },
                {
                    xtype: 'numberfield',
                    name: 'spm',
                    anchor: '50%',
                    fieldLabel: me.messages.msgSpm
                },
                {
                    xtype: 'fieldset',
                    title: me.messages.msgFieldSetHours,
                    items:[
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    grow: true,
                                    labelWidth: 70,
                                    name: 'workingTime',
                                    id: 'workingTime',
                                    fieldLabel: me.messages.msgWorkingTime,
                                    minValue: 0,
                                    maxValue: 24,
                                    flex: 1,
                                    allowDecimals: false
                                },
                                {

                                    labelWidth: 70,
                                    flex: 1,
                                    xtype: 'numberfield',
                                    grow: true,
                                    name: 'breakTime',
                                    id: 'breakTime',
                                    fieldLabel: me.messages.msgBreakTime,
                                    minValue: 0,
                                    maxValue: 24,
                                    allowDecimals: false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    grow: true,
                                    labelWidth: 70,
                                    name: 'onHours',
                                    id:'onHours', 
                                    fieldLabel: me.messages.msgOnHour,
                                    minValue: 0,
                                    flex: 1,
                                    allowDecimals: false,
                                    readOnly: true
                                },
                                {
                                    labelWidth: 70,
                                    flex: 1,
                                    xtype: 'numberfield',
                                    grow: true,
                                    name: 'offHours',
                                    id: 'offHours',
                                    fieldLabel: me.messages.msgOffHour,
                                    minValue: 0,
                                    allowDecimals: false,
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'timefield',
                                    fieldLabel: me.messages.msgStartHour,
                                    name: 'startupHour',
                                    format: 'H:i:s',
                                    flex: 1,
                                    labelWidth: 70,
                                    minValue: '0:00',
                                    maxValue: '24:00'
                                },
                                {
                                    labelWidth: 70,
                                    flex: 1,
                                    margins: '5 0 0 5',
                                    xtype: 'timefield',
                                    fieldLabel: me.messages.msgEndHour,
                                    name: 'endHour',
                                    format: 'H:i:s',
                                    minValue: '0:00',
                                    maxValue: '24:00'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: me.messages.msgFielProductionMeasures,
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaultType: 'numberfield',
                            items: [
                                {
                                    flex: 1,
                                    name: 'oil',
                                    id: 'oil',
                                    labelWidth: 20,
                                    minValue: 0,
                                    fieldLabel: me.messages.msgOil
                                },
                                {
                                    flex: 1,
                                    labelWidth: 30,
                                    name: 'water',
                                    id:'water',
                                    minValue: 0,
                                    fieldLabel: me.messages.msgWater
                                },
                                {
                                    name: 'gas',
                                    id: 'gas',
                                    labelWidth: 20,
                                    minValue: 0,
                                    fieldLabel: me.messages.msgGas,
                                    flex: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
});


