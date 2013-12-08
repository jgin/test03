Ext.define('sisprod.view.ApprovedSwab.ListApprovedSwab', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    require: [
        'sisprod.view.base.TabPanelGridItem'
    ],
    alias: 'widget.listApprovedSwab',
    options: {},
    usedInDailyReport: true,
    entityName: '',
    listTitle: 'Approved Swab List',
    messages: {
        headers: {
            idSwab: 'ID Swab',
            idProductionPeriod: 'ID Production Period',
            registerEmployeeName:'Register Employee',
            approvedEmployeeName: 'Approved Employee',
            idWell: 'ID Well',
            well: 'Well',
            oil: 'Oil',
            oilMeasureUnitName: 'Oil Measure Unit',
            oilIdMeasureUnit: 'Oil Measure Unit ID',
            battery: 'Battery',
            water: 'Water',
            waterMeasureUnit: 'Water Measure Unit',
            waterIdMeasureUnit: 'Water Measure Unit ID',
            idBattery: 'Battery ID',
            batteryName: 'Battery Name',
            runNumber: 'Run Number',
            pistonDepth: 'Piston Depth',
            stayTime: 'Stay Time',
            initialLevel: 'Initial Level',
            finalLevel: 'Final Level',
            entityName: 'Entity Name',
            entityIdEntity: 'Entity ID',
            isApproved: 'Approved'
        },
        buttons: {
            approve: 'Approve'
        }
    },
    gridOptions: {
        region: 'center'
    },
    initComponent: function() {
        var me = this;
        var storeName = sisprod.getApplication().getStoreName(me.entityName);
        var modelName = sisprod.getApplication().getModelName(me.entityName);
        me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions: {
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idSwab: {header: me.messages.headers.idSwab},
                    'productionPeriod.idProductionPeriod': {header:me.messages.headers.idProductionPeriod},
                    'registerEmployee.idEmployee': {header:me.messages.headers.registerEmployeeName},
                    'registerEmployee.person.personFullName': {header:me.messages.headers.registerEmployeeName, flex:2},
                    'approvedEmployee.idApprovedEmployee': {header:me.messages.headers.approvedEmployeeName},
                    'approvedEmployee.person.personFullName': {header:me.messages.headers.approvedEmployeeName, flex:2},
                    approved: {header:me.messages.headers.isApproved, flex:0.5},
                    'well.idWell': {header:me.messages.headers.idWell},
                    'well.wellName': {header: me.messages.headers.well},
                    'entity.idEntity': {header:me.messages.headers.idEntity},
                    'entity.entityName': {header:me.messages.headers.entityName, flex:2},
                    oil: {header:me.messages.headers.oil, flex:0.5,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            minValue:0
                        }
                    },
                    'oilMeasureUnit.idMeasureUnit': {header:me.messages.headers.oilIdMeasureUnit},
                    'oilMeasureUnit.measureUnitName': {header:me.messages.headers.oilMeasureUnitName, flex:0.5},
                    water: {header:me.messages.headers.water, flex:0.5,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            minValue:0
                        }},
                    'waterMeasureUnit.idMeasureUnit': {header:me.messages.headers.waterIdMeasureUnit},
                    'waterMeasureUnit.measureUnitName': {header:me.messages.headers.waterMeasureUnit, flex:0.5},
                    'battery.idBattery': {header:me.messages.headers.idBattery},
                    'battery.batteryName': {header:me.messages.headers.batteryName},
                    runNumber: {header:me.messages.headers.runNumber, flex:0.5,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            allowDecimals:false,
                            minValue:0
                        }
                    },
                    pistonDepth: {header:me.messages.headers.pistonDepth, flex:0.5,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            minValue:0
                        }
                    },
                    stayTime: {header:me.messages.headers.stayTime, flex:0.5,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            minValue:0
                        }
                    },
                    initialLevel: {header:me.messages.headers.initialLevel, flex:0.5,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            minValue:0
                        }
                    },
                    finalLevel: {header:me.messages.headers.finalLevel, flex:0.5,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            minValue:0
                        }
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName),
            editorOptions: {
                listeners: {
                    'beforeedit': function(editor, context, eventOptions){
                        me.controller.beforeEdit.apply(me.controller, [editor, context, eventOptions]);
                    },
                    'afteredit': function(editor, context, eventOptions){
                        me.controller.afterEdit.apply(me.controller, [editor, context, eventOptions]);
                    },
                    'canceledit': function(editor, context, eventOptions){
                        me.controller.cancelEdit.apply(me.controller, [editor, context, eventOptions]);
                    }
                }
            },
            topBarButtons: [
                {
                    xtype: 'button',
                    text: me.messages.buttons.approve,
                    iconCls: 'approve',
                    action: 'approve'
                }
            ]
        };
        me.callParent(arguments);
    }
});