/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.FluidLevel.AddFluidLevel', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addFluidLevel',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Fluid Level',
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
        //
        var productionPeriodInput = Ext.getCmp('envProductionPeriodDate');
        var productionPeriodValue = Ext.util.Format.date(new Date(), 'd-m-Y');
        if(Ext.isDefined(productionPeriodInput) && productionPeriodInput !== null)
            productionPeriodValue = Ext.util.Format.date(productionPeriodInput.getValue(), 'd-m-Y');
        //
        var envLotId = Ext.util.Cookies.get('envLotId'),
            idLot = 0;
        if(Ext.isDefined(envLotId) && envLotId !== null) idLot = parseInt(envLotId);       
        //
        var tabItem = {
            xtype: 'panel',
            layout: 'anchor',
            title: me.messages.labels.wellData,
            padding: '10 10 10 10',
            items: [
                {
                    xtype: 'textfield',
                    name: 'productionPeriod',
                    fieldLabel: me.messages.labels.productionPeriod,
                    anchor: '35%',
                    labelWidth: 90,
                    allowBlank: false,
                    readOnly: true,
                    value: productionPeriodValue,
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
                            xtype: 'combobox',
                            name: 'idLot',
                            id: 'idFluidLevelLot',
                            flex: 2.5,
                            store: Ext.create('sisprod.store.LotAll').load(),
                            fieldLabel: me.messages.labels.lot,
                            displayField: 'lotName',
                            valueField: 'idLot',
                            labelWidth: 90,
                            editable: false,
                            forceSelection: true,
                            allowBlank: false,
                            value: idLot
                        },
                        {
                            xtype: 'combobox',
                            name: 'idWell',
                            id: 'idFluidLevelWell',
                            labelWidth: 90,
                            store: Ext.create('sisprod.store.WellOperativeByLotStore', {
                                listeners: {
                                    beforeload: function(store, operation, options) {
                                        var idLot = me.down('#idFluidLevelLot').getValue();
                                        if(Ext.isDefined(idLot) && idLot!==null) {
                                            if(Ext.isDefined(operation.params) && operation.params!==null)
                                                operation.params.idLot = idLot;
                                        }
                                        else{
                                            Ext.Msg.alert(me.messages.validation.alertTitle, me.messages.validation.selectLotFirst);
                                            return false;
                                        }
                                    }
                                }
                            }),
                            fieldLabel: me.messages.labels.well,
                            displayField: 'wellCode',
                            valueField: 'idWell',
                            allowBlank: false,
                            margins: '0 0 0 10',
                            forceSelection: true,
                            editable: false,
                            flex : 2
                        },
                        {
                            xtype: 'textfield',
                            name: 'fluidLevelBatteryCode',
                            id: 'fluidLevelBatteryCode',
                            flex: 2,
                            readOnly: true,
                            labelWidth: 90,
                            fieldLabel: me.messages.labels.battery,
                            margins: '0 0 0 10'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'carrera',
                            id: 'fluidLevelCarrera',
                            labelWidth: 90,
                            fieldLabel: me.messages.labels.carrera
                        },
                        {
                            xtype: 'numberfield',
                            name: 'spm',
                            id: 'fluidLevelSpm',
                            labelWidth: 90,
                            fieldLabel: me.messages.labels.spm,
                            margins: '0 0 0 10'
                        }
                    ]
                },
                Ext.create('sisprod.view.FluidLevel.EquipmentGrid')
            ]
        };
        return tabItem;
    },
    
    getFluidLevelDataTab: function() {
        var me = this;
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
                            padding : '0 0 0 10'
                        },
                        {
                            xtype: 'combobox',
                            name: 'idFluidLevelType',
                            id: 'idFluidLevelType',
                            labelWidth: 100,
                            anchor: '65%',
                            fieldLabel: me.messages.labels.fluidLevelType,
                            store: Ext.create('sisprod.store.FluidLevelTypeAllStore'),
                            editable: false,
                            allowBlank: false,
                            displayField: 'fluidLevelTypeName',
                            valueField: 'idFluidLevelType',
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
                            items: [
                                {
                                    xtype: 'numberfield',
                                    name: 'level',
                                    id: 'level',
                                    labelWidth: 100,
                                    allowBlank: false,
                                    fieldLabel: me.messages.labels.level
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'submergence',
                                    id: 'submergence',
                                    labelWidth: 100,
                                    allowBlank: false,
                                    fieldLabel: me.messages.labels.submergence
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'freeGas',
                                    id: 'freeGas',
                                    labelWidth: 100,
                                    allowBlank: false,
                                    fieldLabel: me.messages.labels.freeGas
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'pressionTubing',
                                    id: 'pressionTubing',
                                    labelWidth: 100,
                                    allowBlank: false,
                                    fieldLabel: me.messages.labels.pressionTubing
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'pressionCasing',
                                    id: 'pressionCasing',
                                    labelWidth: 100,
                                    allowBlank: false,
                                    fieldLabel: me.messages.labels.pressionCasing
                                },
                                {
                                    xtype: 'timefield',
                                    name: 'fluidLevelTime',
                                    id: 'fluidLevelTime',
                                    labelWidth: 100,
                                    format: 'H:i:s',
                                    fieldLabel: me.messages.labels.fluidLevelTime
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
                                    name: 'idFluidLevelConfigParam'
                                },
                                {
                                    xtype: 'numberfield',
                                    flex: 1,
                                    name: 'gearboxRating',
                                    labelWidth: 100,
                                    readOnly: true,
                                    allowBlank: false,
                                    fieldLabel: me.messages.labels.gearboxRating
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'gearboxPeakBalanced',
                                    flex: 1,
                                    labelWidth: 100,
                                    readOnly: true,
                                    allowBlank: false,
                                    fieldLabel: me.messages.labels.gearboxPeakBalanced
                                },
                                {
                                    xtype: 'numberfield',
                                    flex: 1,
                                    name: 'gearboxPeakExisting',
                                    labelWidth: 100,
                                    minValue: 0,
                                    allowBlank: false,
                                    fieldLabel: me.messages.labels.gearboxPeakExisting
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
                            fieldLabel: me.messages.labels.comment
                        },
                        {
                            xtype: 'textarea',
                            name: 'recommendation',
                            id: 'recommendation',
                            labelWidth: 100,
                            padding : '0 0 0 10',
                            anchor: '100%',
                            height: 35,
                            fieldLabel: me.messages.labels.recommendation
                        }
//                    ]
//                }
            ]
        };
        //
        var tabItems = new Array();
        tabItems.push(fluidLevelTabItem);
        tabItems.push(Ext.create('sisprod.view.ManometricTest.ManometricTestData'));
        var tab = Ext.create('Ext.tab.Panel', {
            title: me.messages.labels.fluidLevelData,
            items: tabItems
        });
        //
        return tab;
    }
});