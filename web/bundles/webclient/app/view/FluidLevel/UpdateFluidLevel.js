/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.FluidLevel.UpdateFluidLevel', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateFluidLevel',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Update Fluid Level',
    messages: {
        labels: {
            productionPeriod: 'Report Date',
            lot: 'Lot',
            well: 'Well',
            wellData: 'Well Data',
            battery: 'Battery',
            fluidLevelData: 'Fluid Level',
            fluidLevelType: 'Type',
            company: 'Company',
            level: 'Liquid Level',
            submergence: 'Submergence',
            freeGas: 'Free Gas',
            pressionTubing: 'Pression Tubing',
            pressionCasing: 'Pression Casing',
            fluidLevelTime: 'Hour',
            gearboxRating: 'Gearbox Rating',
            gearboxPeakBalanced: 'Gearbox Peak Balanced',
            gearboxPeakExisting: 'Gearbox Peak Existing',
            carrera: 'Carrera',
            spm: 'SPM',
            comment: 'Comments',
            recommendation: 'Recommendation'
        }
    },
    modal: true,
    width: 650,
    
    initComponent: function(){
        var me = this;
        //
        var data = me['fluidLevel'];
        var fluidLevelMeasure = data['fluidLevelMeasure'];
        var manometricTest = data['manometricTest'];
        //
//        var formItems = [
//            
//        ];
        var tabItems = new Array();
        tabItems.push(me.getWellDataTab());
        tabItems.push(me.getFluidLevelDataTab());
        var tab = Ext.create('Ext.tab.Panel', {
            items: tabItems
        });
        
        me.formOptions = {
            bodyPadding: 2,
            items: [tab]
        };
        me.callParent(arguments);
    },
    
    getWellDataTab: function(){
        var me = this;
        var data = me["fluidLevel"];  
        //
        var tabItem = {
            xtype: 'panel',
            layout: 'anchor',
            title: me.messages.labels.wellData,
            padding: '10 10 10 10',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idFluidLevel',
                    value: data['idFluidLevel']
                },
                {
                    xtype: 'hiddenfield',
                    name: 'idProductionPeriod',
                    value: data['productionPeriod']['idProductionPeriod']
                },
                {
                    xtype: 'datefield',
                    name: 'productionPeriod',
                    fieldLabel: me.messages.labels.productionPeriod,
                    anchor: '35%',
                    labelWidth: 90,
                    allowBlank: false,
                    readOnly: true,
                    value: data['productionPeriod']['productionPeriodDate'],
                    padding : '0 0 0 10'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'table',
                        columns: 2
                    },
                    defaults : {
                        padding : '0 0 0 10'
                    },
                    anchor: '100%',
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'idLot',
                            value: data['well']['lot']['idLot']
                        },
                        {
                            xtype: 'textfield',
                            name: 'lotName',
                            flex: 2.5,
                            fieldLabel: me.messages.labels.lot,
                            labelWidth: 90,
                            allowBlank: false,
                            readOnly: true,
                            value: data['well']['lot']['lotName']
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'idWell',
                            value: data['well']['idWell']
                        },
                        {
                            xtype: 'textfield',
                            name: 'wellName',
                            labelWidth: 90,
                            fieldLabel: me.messages.labels.well,
                            allowBlank: false,
                            margins: '0 0 0 10',
                            readOnly: true,
                            flex : 2,
                            value: data['well']['wellName']
                        },
                        {
                            xtype: 'textfield',
                            name: 'fluidLevelBatteryCode',
                            id: 'fluidLevelBatteryCode',
                            flex: 2,
                            readOnly: true,
                            labelWidth: 90,
                            fieldLabel: me.messages.labels.battery,
                            margins: '0 0 0 10',
                            value: data['well']['battery']['batteryCode']
                        },
                        {
                            xtype: 'numberfield',
                            name: 'carrera',
                            id: 'fluidLevelCarrera',
                            labelWidth: 90,
                            fieldLabel: me.messages.labels.carrera,
                            value: data['well']['carrera']
                        },
                        {
                            xtype: 'numberfield',
                            name: 'spm',
                            id: 'fluidLevelSpm',
                            labelWidth: 90,
                            fieldLabel: me.messages.labels.spm,
                            margins: '0 0 0 10',
                            value: data['well']['spm']
                        }
                    ]
                },
                Ext.create('sisprod.view.FluidLevel.EquipmentGrid', {
                    store: Ext.create('sisprod.store.AllocatedEquipmentStore').load({
                        params: {idWell: data['well']['idWell']}
                    })
                })
            ]
        };
        return tabItem;
    },
    
    getFluidLevelDataTab: function() {
        var me = this;
        var data = me['fluidLevel'];
        var fluidLevelConfigParam = me['fluidLevelConfigParam'];
        var fluidLevelMeasure = data['fluidLevelMeasure'];
        var manometricTest = data['manometricTest'];
        //
        var fluidLevelTabItem = {
            xtype: 'panel',
            title: me.messages.labels.fluidLevelData,
            layout: 'anchor',
            padding: '10 10 10 10',
            items: [
//                {
//                    xtype: 'fieldset',
//                    anchor: '100%',
//                    title: me.messages.labels.fluidLevelData,
//                    items: [
                        {
                            xtype: 'sensitivecombo',
                            name: 'idCompany',
                            id: 'idCompany',
                            anchor: '100%',
                            labelWidth: 100,
                            hideTrigger: false,
                            fieldLabel: me.messages.labels.company,
                            store: Ext.create('sisprod.store.CompanyByNameStore'),
                            emptyText: me.messages.msgCompany,
                            fieldStyle: {
                                textTransform: 'uppercase'
                            },
                            forceSelection : true,
                            allowBlank: false,
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">','{companyName}','</tpl>'),
                            valueField: 'idCompany',
                            listConfig: {
                                getInnerTpl: function() {
                                     return "{companyName}";
                                }
                            },
                            padding : '0 0 0 10',
                            value: Ext.create(sisprod.getApplication().getModelName('Company'), {
                                idCompany: data['company']['idCompany'],
                                companyName: data['company']['companyName']
                            })
                        },
                        {
                            xtype: 'combobox',
                            name: 'idFluidLevelType',
                            id: 'idFluidLevelType',
                            labelWidth: 100,
                            anchor: '65%',
                            fieldLabel: me.messages.labels.fluidLevelType,
                            store: Ext.create('sisprod.store.FluidLevelTypeAllStore').load(),
                            editable: false,
                            allowBlank: false,
                            displayField: 'fluidLevelTypeName',
                            valueField: 'idFluidLevelType',
                            padding : '0 0 0 10',
                            value: data['fluidLevelType']['idFluidLevelType']
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'table',
                                columns: 2
                            },
                            defaults : {
                                padding : '0 0 0 10'
                            },
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    name: 'idFluidLevelMeasure',
                                    value: fluidLevelMeasure['idFluidLevelMeasure']
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'level',
                                    id: 'level',
                                    labelWidth: 100,
                                    allowBlank: false,
                                    fieldLabel: me.messages.labels.level,
                                    value: fluidLevelMeasure['level']
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'submergence',
                                    id: 'submergence',
                                    labelWidth: 100,
                                    allowBlank: false,
                                    fieldLabel: me.messages.labels.submergence,
                                    value: fluidLevelMeasure['submergence']
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'freeGas',
                                    id: 'freeGas',
                                    labelWidth: 100,
                                    allowBlank: false,
                                    fieldLabel: me.messages.labels.freeGas,
                                    value: fluidLevelMeasure['freeGas']
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'pressionTubing',
                                    id: 'pressionTubing',
                                    labelWidth: 100,
                                    allowBlank: false,
                                    fieldLabel: me.messages.labels.pressionTubing,
                                    value: fluidLevelMeasure['pressionTubing']
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'pressionCasing',
                                    id: 'pressionCasing',
                                    labelWidth: 100,
                                    allowBlank: false,
                                    fieldLabel: me.messages.labels.pressionCasing,
                                    value: fluidLevelMeasure['pressionCasing']
                                },
                                {
                                    xtype: 'timefield',
                                    name: 'fluidLevelTime',
                                    id: 'fluidLevelTime',
                                    labelWidth: 100,
                                    format: 'H:i:s',
                                    fieldLabel: me.messages.labels.fluidLevelTime,
                                    value: data['fluidLevelTime']
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            anchor: '100%',
                            layout: {
                                type: 'table',
                                columns: 2
                            },
                            defaults : {
                                padding : '0 0 0 10'
                            },
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    name: 'idFluidLevelConfigParam',
                                    value: fluidLevelConfigParam['idFluidLevelConfigParam']
                                },
                                {
                                    xtype: 'numberfield',
                                    flex: 1,
                                    name: 'gearboxRating',
                                    labelWidth: 100,
                                    readOnly: true,
                                    allowBlank: false,
                                    fieldLabel: me.messages.labels.gearboxRating,
                                    value: fluidLevelConfigParam['gearboxRating']
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'gearboxPeakBalanced',
                                    flex: 1,
                                    labelWidth: 100,
                                    readOnly: true,
                                    allowBlank: false,
                                    fieldLabel: me.messages.labels.gearboxPeakBalanced,
                                    value: fluidLevelConfigParam['gearboxBalanced']
                                },
                                {
                                    xtype: 'numberfield',
                                    flex: 1,
                                    name: 'gearboxPeakExisting',
                                    labelWidth: 100,
                                    minValue: 0,
                                    allowBlank: false,
                                    fieldLabel: me.messages.labels.gearboxPeakExisting,
                                    value: fluidLevelMeasure['gearboxExisting']
                                }
                            ]
                        },
                        {
                            xtype: 'textarea',
                            name: 'fluidLevelComment',
                            id: 'fluidLevelComment',
                            labelWidth: 100,
                            padding : '0 0 0 10',
                            anchor: '100%',
                            height: 35,
                            fieldLabel: me.messages.labels.comment,
                            value: data['comment']
                        },
                        {
                            xtype: 'textarea',
                            name: 'recommendation',
                            id: 'recommendation',
                            labelWidth: 100,
                            padding : '0 0 0 10',
                            anchor: '100%',
                            height: 35,
                            fieldLabel: me.messages.labels.recommendation,
                            value: data['recommendation']
                        }
//                    ]
//                }
            ]
        };
        //
        var tabItems = new Array();
        tabItems.push(fluidLevelTabItem);
        tabItems.push(Ext.create('sisprod.view.ManometricTest.ManometricTestData', {data: manometricTest}));
        var tab = Ext.create('Ext.tab.Panel', {
            title: me.messages.labels.fluidLevelData,
            items: tabItems
        });
        //
        return tab;
    }
});