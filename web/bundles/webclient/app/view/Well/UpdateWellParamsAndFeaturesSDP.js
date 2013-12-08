
Ext.define('sisprod.view.Well.UpdateWellParamsAndFeaturesSDP', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateWellParamsAndFeaturesSDP',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    autoScroll: true,
    modal: true,
    width: 600,
    maxHeight: 500,
    
    showWarningBeforeCancel: true,
    
    /**
     * Pozo a actualizar sus parámetros
     */
    well: null,
    
    /**
     * Tipo de edición de parámetros
     * Es uno de los valroes definidos en WellController
     */
    featureEditionType: null,

    initComponent: function(){
        var me = this;
        var wellEquipment = me.wellEquipment;
        var idWellEquipment, engine, engineEquipment, pumpingUnit, pumpingUnitEquipment;
        console.log(wellEquipment);
        if(Ext.isDefined(wellEquipment) && wellEquipment !== null) {
            idWellEquipment = wellEquipment['idWellEquipment'];
            //
            engine = wellEquipment['engineEquipment'];
            engineEquipment = Ext.create('sisprod.model.EquipmentTempModel', {
                idEquipment: engine['idEquipment'],
                equipmentName: engine['equipmentName'],
                equipmentCode: engine['equipmentCode'],
                locationName: engine['location']['locationName']
            });
            //
            pumpingUnit = wellEquipment['pumpingUnitEquipment'];
            pumpingUnitEquipment = Ext.create('sisprod.model.EquipmentTempModel', {
                idEquipment: pumpingUnit['idEquipment'],
                equipmentName: pumpingUnit['equipmentName'],
                equipmentCode: pumpingUnit['equipmentCode'],
                locationName: pumpingUnit['location']['locationName']
            });
        }
        //
        
        me.formOptions = {
            bodyPadding: 5,
            items: [
                {
                    xtype : 'fieldcontainer',
                    layout : 'hbox',
                    items : [
                        {
                            xtype: 'textfield',
                            grow: true,
                            name: 'productionPeriodDate',
                            fieldLabel: me.messages.formFields.productionPeriodDate,
                            margins: '0 5 0 0',
                            readOnly: true,
                            flex : 1
                        },
                        {
                            xtype: 'textfield',
                            grow: true,
                            name: 'wellCode',
                            fieldLabel: me.messages.formFields.well,
                            margins: '0 5 0 0',
                            readOnly: true,
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
                                    margins: '0 5 5 0',
                                    flex:1
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'offCycle',
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
                            fieldLabel: me.messages.formFields.onHours,
                            margins: '0 5 5 0',
                            flex : 1
                        },
                        {
                            xtype: 'textfield',
                            readOnly : true,
                            grow: true,
                            name: 'offHours',
                            fieldLabel: me.messages.formFields.offHours,
                            margins: '0 5 5 0',
                            flex : 1
                        }
                    ]
                },
                {
                    xtype : 'fieldset',
                    title : me.messages.formFields.assingEquipmentsFieldSet,
                    bodyPadding: 2,
                    layout: 'anchor',
                    fieldDefaults: {
                        labelWidth: 120
                    },
                    items : [
                        {
                            xtype: 'hiddenfield',
                            name: 'idWellEquipment',
                            value: idWellEquipment
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'idWell',
                            value: me.well.idWell
                        },
                        {
                            xtype: 'sensitivecombo',
                            anchor: '100%',
                            name: 'engineIdEquipment',
                            id: 'engineIdEquipment',
                            fieldLabel: me.messages.labels.engineEquipment,
                            labelWidth: 120,
                            hideTrigger: false,
//                            padding: '0 0 0 12',
                            store: Ext.create('sisprod.store.EngineEquipmentStore'),
                            emptyText: me.messages.equipmentEmptyText,
                            forceSelection : true,
                            allowBlank: false,
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">','{equipmentName} - {equipmentCode} ({locationName})','</tpl>'),
                            valueField: 'idEquipment',
                            listConfig: {
                                getInnerTpl: function() {
                                    return "{equipmentName} - {equipmentCode} ({locationName})";
                                }
                            },
                            value: engineEquipment
                        },
                        {
                            xtype: 'sensitivecombo',
                            anchor: '100%',
                            name: 'unitIdEquipment',
                            id: 'unitIdEquipment',
                            fieldLabel: me.messages.labels.pumpingUnitEquipment,
                            labelWidth: 120,
                            hideTrigger: false,
                            store: Ext.create('sisprod.store.PumpingUnitEquipmentStore'),
                            emptyText: me.messages.equipmentEmptyText,
                            forceSelection : true,
                            allowBlank: false,
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">','{equipmentName} - {equipmentCode} ({locationName})','</tpl>'),
                            valueField: 'idEquipment',
                            listConfig: {
                                getInnerTpl: function() {
                                    return "{equipmentName} - {equipmentCode} ({locationName})";
                                }
                            },
                            value: pumpingUnitEquipment
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    name: 'featuresPanel',
                    layout: 'vbox',
                    fieldDefaults: {
                        labelWidth: 120
                    }
                }
            ]
        };        
        me.callParent(arguments);
    }
    
});