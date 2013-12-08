/**
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.view.WellTest.AddWellTest', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addWellTest',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Agregar prueba de Pozo',
    modal: true,
    width: 600,
    
    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            bodyPadding: 5,
            items: [
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'productionPeriodDate',
                    id: 'productionPeriodDate',
                    fieldLabel: me.messages.formFields.productionPeriodDate,
                    margins: '0 5 0 0',
                    readOnly: true,
                    flex : 1
                },
                {
                    xtype : 'fieldcontainer',
                    layout : 'hbox',
                    items : [
                        {
                            xtype: 'combobox',
                            grow: true,
                            name: 'wellTestWellId',
                            id: 'wellTestWellId',
                            store: Ext.create('sisprod.store.WellStore'),
                            fieldLabel: me.messages.formFields.wellTestWell,
                            displayField: 'wellCode',
                            valueField: 'idWell',
                            emptyText: 'Seleccione',
                            allowBlank: false,
                            margins: '0 5 0 0',
                            forceSelection: true,
                            editable: false,
                            flex : 1
                        },
                        {
                            xtype: 'textfield',
                            grow: true,
                            name: 'wellTestBatteryCode',
                            id: 'wellTestBatteryCode',
                            fieldLabel: me.messages.formFields.wellTestBattery,
                            margins: '0 5 0 0',
                            readOnly: true,
                            flex : 1
                        },
//                        {
//                            xtype: 'combobox',
//                            grow: true,
//                            name: 'wellTestBatteryId',
//                            id: 'wellTestBatteryId',
//                            store: Ext.create('sisprod.store.BatteryStore'),
//                            fieldLabel: me.messages.formFields.wellTestBattery,
//                            displayField: 'batteryCode',
//                            valueField: 'idBattery',
//                            emptyText: 'Seleccione',
//                            allowBlank: false,
//                            forceSelection: true,
//                            editable: false,
//                            margins: '0 5 0 0',
//                            flex : 1
//                        },
                        {
                            xtype: 'combobox',
                            grow: true,
                            name: 'wellTestTypeId',
                            id: 'wellTestTypeId',
                            store: Ext.create('sisprod.store.WellTestTypeStore'),
                            fieldLabel: me.messages.formFields.wellTestType,
                            displayField: 'wellTestTypeName',
                            valueField: 'idWellTestType',
                            emptyText: 'Seleccione',
                            allowBlank: false,
                            forceSelection: true,
                            editable: false,
                            flex : 1
                        }
                    ]
                },
                {
                    xtype : 'fieldset',
                    title : me.messages.formFields.wellParametersFieldSet,
                    layout : 'hbox',
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            layout : 'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: "box",
                                    autoEl: {cn: "<label class='x-form-item-label x-unselectable x-form-item-label-left'>"+me.messages.formFields.wellCycle+":"+"</label>"},
                                    margins: '0 5 5 0'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'onCycle',
                                    id: 'onCycle',
                                    readOnly : true,
                                    margins: '0 5 5 0',
                                    flex:1
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'offCycle',
                                    id: 'offCycle',
                                    readOnly : true,
                                    margins: '0 5 5 0',
                                    flex:1
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            readOnly : true,
                            grow: true,
                            name: 'onHours',
                            id: 'onHours',
                            fieldLabel: me.messages.formFields.onHours,
                            margins: '0 5 5 0',
                            flex : 1
                        },
                        {
                            xtype: 'textfield',
                            readOnly : true,
                            grow: true,
                            name: 'offHours',
                            id: 'offHours',
                            fieldLabel: me.messages.formFields.offHours,
                            margins: '0 5 5 0',
                            flex : 1
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout : 'hbox',
                    items : [
                        {
                            xtype: 'numberfield',
                            name: 'testHours',
                            fieldLabel: me.messages.formFields.testHours,
                            allowBlank: false
//                            margins: '0 5 0 0',
//                            flex : 1
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout : 'hbox',
                    items : [
                        {
                            xtype: 'numberfield',
                            grow: true,
                            id: 'oilQuantity',
                            name: 'oilQuantity',
                            fieldLabel: me.messages.formFields.oilQuantity,
                            allowBlank: false,
                            margins: '0 5 0 0',
                            flex : 1
                        },
                        {
                            xtype: 'numberfield',
                            grow: true,
                            id: 'waterQuantity',
                            name: 'waterQuantity',
                            fieldLabel: me.messages.formFields.waterQuantity,
                            allowBlank: false,
                            margins: '0 5 0 0',
                            flex : 1
                        },
                        {
                            xtype: 'numberfield',
                            grow: true,
                            id: 'gasQuantity',
                            name: 'gasQuantity',
                            fieldLabel: me.messages.formFields.gasQuantity,
                            allowBlank: false,
                            flex : 1
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout : 'hbox',
                    items : [
                        {
                            xtype: 'checkboxfield',
                            name : 'forProductionForecast',
                            fieldLabel : me.messages.formFields.forProductionForecast,
                            labelWidth : 100,
                            inputValue:true,
                            anchor : '100%'
                        },
                        {
                            xtype: 'textfield',
                            readOnly : true,
                            grow: true,
                            name: 'gor',
                            fieldLabel: me.messages.formFields.GOR,
                            flex : 1
                        }
                    ]
                },
                {
                    xtype : 'textareafield',
                    name : 'comments',
                    fieldLabel : me.messages.formFields.comments,
                    labelWidth : 100,
                    anchor : '100%'
                }
            ]
        };        
        me.callParent(arguments);
    }
    
});