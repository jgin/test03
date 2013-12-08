Ext.define('sisprod.view.WellTest.ListWellTest', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listWellTest',
    options: {},
    entityName: '',
    
    title: '',
    listTitle: 'Listado de Pruebas de pozos',
    
    baseView: 'BaseList',
    
    usedInDailyReport: true,
    
    gridOptions: {
        region: 'center'
    },
    
    requires: [
       'sisprod.view.base.TabPanelGridItem'
    ],
    
    initComponent: function(){
        var me = this;
        
        var storeName = sisprod.getApplication().getStoreName(me.entityName);
        var modelName = sisprod.getApplication().getModelName(me.entityName);
        
        me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idWellTest : { header: me.messages.columnHeaders.idWellTest },
                    'well.idWell' : { header: me.messages.columnHeaders.idWell },
                    'productionPeriod.productionPeriodDate' : { header: me.messages.columnHeaders.productionPeriodDate },
                    'well.wellCode' : { header: me.messages.columnHeaders.wellCode },
                    'battery.idBattery': { header: me.messages.columnHeaders.idBattery },
                    'battery.batteryCode' : { header: me.messages.columnHeaders.batteryCode },
                    testHours : { header: me.messages.columnHeaders.testHours,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false
                        }
                    },
                    'wellTestType.idWellTestType' : { header: me.messages.columnHeaders.idWellTestType },
                    'wellTestType.wellTestTypeName' : { header: me.messages.columnHeaders.wellTestTypeName,
                        editor: {
                            xtype: 'combobox',
                            store: Ext.create('sisprod.store.WellTestTypeStore'),
                            displayField: 'wellTestTypeName',
                            valueField: 'wellTestTypeName',
                            editable: false,
                            allowBlank: false,
                            listeners: {
                                'select': function(combobox, record, eventOptions){
                                    me.controller.onSelectWellType.apply(me.controller, [combobox, record, eventOptions]);
                                }
                            }
                        }
                    },
                    oilQuantity : { header: me.messages.columnHeaders.oilQuantity,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false
                        }
                    },
                    waterQuantity : { header: me.messages.columnHeaders.waterQuantity,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false
                        }
                    },
                    gasQuantity : { header: me.messages.columnHeaders.gasQuantity,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false
                        }
                    },
                    gor : { header: me.messages.columnHeaders.gor },
                    forProductionForecast : { header: me.messages.columnHeaders.forProductionForecast,
                        editor: {
                            xtype: 'checkboxfield',
                            allowBlank: false
                        }
                    },
                    comments : { header: me.messages.columnHeaders.comments,
                        editor: {
                            xtype: 'textfield'
                        }
                    },
                    updateWellParamsAndFeaturesButton: {
                        header: me.messages.columnHeaders.updateWellParamsAndFeaturesButton,
                        hideable: false,
                        align: 'center',
                        xtype: 'actioncolumn',
                        excludeForExport: true,
                        sortable: false,
                        filter: null,
                        items: [
                            {
                                icon: sisprod.getApplication().getImagePath('view_detail.png'),
//                                tooltip: 'Print',
                                scope: me.controller,
                                handler: me.controller.updateWellParamsAndFeaturesButton_click
                            }
                        ]
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
//                    'validateedit': function(editor, context, eventOptions){
//                        
//                    }
                }
            }
//            defaultFilters: [
//                {
//                    dataIndex: 'productionPeriod.productionPeriodDate',
//                    data: {
//                        type: 'date',
//                        comparison: 'eq',
//                        value: Ext.getCmp('envProductionPeriodDate').getRawValue()
//                    }
//                }
//            ],
//            hiddenFilters: ['productionPeriod.productionPeriodDate']
        };
        
        me.callParent(arguments);
    }
});
