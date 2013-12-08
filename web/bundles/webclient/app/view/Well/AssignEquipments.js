/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.Well.AssignEquipments',{
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.assignEquipments',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        equipmentEmptyText: 'Type an equipment name...',
        labels: {
            engineEquipment: 'Engine',
            pumpingUnitEquipment: 'Pumping Unit',
            gearboxRating: 'Gearbox Rating',
            gearboxPeakBalanced: 'Gearbox Peak Balanced'
        }
    },
    
    title: 'Assign Equipments',
    modal: true,
    width: 600,
    
    initComponent: function(){
        var me = this;
        //
        var wellEquipment = me.wellEquipment;
        var idWellEquipment, engine, engineEquipment, pumpingUnit, pumpingUnitEquipment;
        console.log(wellEquipment);
        if(Ext.isDefined(wellEquipment) && wellEquipment !== null) {
            idWellEquipment = wellEquipment['idWellEquipment'];
            //
            engine = wellEquipment['engineEquipment'];
            var engineLocation = '';
            if(Ext.isDefined(engine['location']) && engine['location'] !== null) engineLocation = engine['location']['locationName'];
            //
            engineEquipment = Ext.create('sisprod.model.EquipmentTempModel', {
                idEquipment: engine['idEquipment'],
                equipmentName: engine['equipmentName'],
                equipmentCode: engine['equipmentCode'],
                locationName: engineLocation
            });
            //
            pumpingUnit = wellEquipment['pumpingUnitEquipment'];
            var pumpingUnitLocation = '';
            if(Ext.isDefined(pumpingUnit['location']) && pumpingUnit['location'] !== null) pumpingUnitLocation = pumpingUnit['location']['locationName'];
            pumpingUnitEquipment = Ext.create('sisprod.model.EquipmentTempModel', {
                idEquipment: pumpingUnit['idEquipment'],
                equipmentName: pumpingUnit['equipmentName'],
                equipmentCode: pumpingUnit['equipmentCode'],
                locationName: pumpingUnitLocation
            });
        }
        //
        var fluidLevelConfigParam = me.fluidLevelConfigParam;
        var gearboxRating = 0, gearboxPeakBalanced = 0;
        if(Ext.isDefined(fluidLevelConfigParam) && fluidLevelConfigParam !== null) {
            gearboxRating = fluidLevelConfigParam['gearboxRating'];
            gearboxPeakBalanced = fluidLevelConfigParam['gearboxBalanced'];
        }
        //
        me.formOptions = {
            bodyPadding: 2,
            layout: 'anchor',
            fieldDefaults: {
                labelWidth: 120
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idWellEquipment',
                    value: idWellEquipment
                },
                {
                    xtype: 'hiddenfield',
                    name: 'idWell',
                    value: me.record['idWell']
                },
                {
                    xtype: 'sensitivecombo',
                    anchor: '100%',
                    name: 'engineIdEquipment',
                    id: 'engineIdEquipment',
                    fieldLabel: me.messages.labels.engineEquipment,
                    labelWidth: 120,
                    hideTrigger: false,
                    padding: '0 0 0 12',
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
                    xtype: 'fieldset',
                    layout: 'anchor',
                    title: me.messages.labels.pumpingUnitEquipment,
                    items: [
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
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            anchor: '100%',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    name: 'gearboxRating',
                                    labelWidth: 120,
                                    flex: 1,
                                    allowBlank: false,
                                    fieldLabel: me.messages.labels.gearboxRating,
                                    value: gearboxRating
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'gearboxBalanced',
                                    margin: '0 0 0 10',
                                    labelWidth: 160,
                                    flex: 1,
                                    allowBlank: false,
                                    fieldLabel: me.messages.labels.gearboxPeakBalanced,
                                    value: gearboxPeakBalanced
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        
        me.callParent(arguments);
    }
});