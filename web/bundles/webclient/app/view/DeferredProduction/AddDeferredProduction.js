/**
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.view.DeferredProduction.AddDeferredProduction', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addDeferredProduction',
    
    messages:{
         labels:{
             productionPeriod:'Period',
             well:'Well',
             lot:'Lot',
             battery:'Battery',
             production:'Production',
             deferredProductionReason:'Reason',
             reasonType:'Type',
             minutes:'Min.',
             hours:'Hours',
             oil:'Oil',
             deferred:'Deferred',
             off:'Off',
             comment:'Comment'
         },
         validation:{
             alerTitle:'Message',
             selectLotFirst:'Select a Lot First...'
         }
    },
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Deferred Production',
    modal: true,
    width: 730,
    layout : 'anchor',
    initComponent: function(){
        var me = this;
        //
        var envProductionPeriodDateInput = Ext.getCmp('envProductionPeriodDate');
        var envProductionPeriodDate = new Date();
        //
        if(Ext.isDefined(envProductionPeriodDateInput) && envProductionPeriodDateInput !== null) {
            envProductionPeriodDate = envProductionPeriodDateInput.getRawValue();
        }
        //
        me.formOptions = {
            bodyPadding: 5,
            fieldDefaults: {
//                labelAlign:'right'
            },
            
            items: [
                {
                    xtype : 'fieldcontainer',
                    layout : 'hbox',
                    items : [
                        {
                            xtype: 'textfield',
                            grow: true,
                            name: 'productionPeriodDate',
                            id: 'productionPeriodDate',
                            fieldLabel: me.messages.labels.productionPeriod,
                            margins: '0 5 0 0',
                            value: envProductionPeriodDate,
                            readOnly: true
//                            anchor:'20%'
                        }
//                        {
//                            xtype: 'checkboxfield',
//                            id: 'offWell',
//                            name: 'offWell',
//                            fieldLabel: me.messages.labels.off,
//                            margins: '0 5 0 0',
//                            labelAlign:'right',
//                            minValue:0,
//                            flex: 1
//                        },
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout : 'hbox',
                    items : [
                        {
                            xtype: 'combobox',
                            grow: true,
                            name: 'idLot',
                            id: 'idLot',
                            store: Ext.create('sisprod.store.LotAll'),
                            fieldLabel: me.messages.labels.lot,
                            displayField: 'lotName',
                            valueField: 'idLot',
                            allowBlank: false,
                            margins: '0 5 0 0',
                            forceSelection: true,
                            editable: false,
                            flex : 1
                        },
                        {
                            xtype: 'combobox',
                            grow: true,
                            name: 'idWell',
                            id: 'idWell',
                            store: Ext.create('sisprod.store.WellOperativeByLotStore',{
                                listeners: {
                                        beforeload: function(store, operation, options){
                                            var idLot = me.down('#idLot').getValue();
                                            if(Ext.isDefined(idLot) && idLot!==null){
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
                            margins: '0 5 0 0',
                            forceSelection: true,
                            editable: false,
                            flex : 1
                        },
                        {
                            xtype: 'textfield',
                            grow: true,
                            name: 'batteryCode',
                            id: 'batteryCode',
                            fieldLabel: me.messages.labels.battery,
                            margins: '0 5 0 0',
                            readOnly: true,
                            flex : 1
                        }
                    ]
                },
                {
                    xtype:'fieldcontainer',
                    layout:'hbox',
                    items:[
                        {
                            xtype: 'combobox',
                            name: 'idDeferredProductionReason',
                            id: 'idDeferredProductionReason',
                            store: Ext.create('sisprod.store.DeferredProductionReasonAll'),
                            fieldLabel: me.messages.labels.deferredProductionReason,
                            displayField: 'deferredProductionReasonName',
                            valueField: 'idDeferredProductionReason',
                            allowBlank: false,
                            margins: '0 5 0 0',
                            forceSelection: true,
                            editable: false,
                            flex: 4
                        },
                        {
                            xtype: 'textfield',
                            name: 'reasonType',
                            id: 'reasonType',
                            fieldLabel: me.messages.labels.reasonType,
                            margins: '0 5 0 0',
                            readOnly: true,
                            flex: 2
                        }
                    ]
                },
                {
                    xtype:'fieldcontainer',
                    layout:'hbox',
                    items:[
                        {
                            xtype: 'numberfield',
                            id: 'totalHours',
                            name: 'totalHours',
//                            labelAlign:"right",
                            allowBlank: false,
                            allowDecimals:false,
                            margins: '0 5 0 0',
                            fieldLabel: me.messages.labels.hours,
                            minValue:0,
                            maxValue:24,
                            flex: 1
                        },
                        {
                            xtype: 'numberfield',
                            id: 'totalMinute',
                            name: 'totalMinute',
                            allowBlank: false,
                            allowDecimals:false,
                            fieldLabel: me.messages.labels.minutes,
                            margins: '0 5 0 0',
                            minValue:0,
                            maxValue:59,
                            flex: 1
                        },
                        {
                            xtype: 'textfield',
                            id: 'forecastOil',
                            name: 'forecastOil',
                            fieldLabel: me.messages.labels.oil,
                            margins: '0 5 0 0',
                            readOnly: true,
                            labelWidth:100,
                            flex: 1.3
                        },
                        {
                            xtype: 'numberfield',
                            id: 'deferredNumber',
                            name: 'deferredNumber',
                            allowBlank: false,
                            allowDecimals:false,
                            fieldLabel: me.messages.labels.deferred,
                            margins: '0 5 0 0',
                            minValue:0,
                            labelWidth:90,
                            flex: 1.3
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'offWell',
                            name: 'offWell',
                            fieldLabel: me.messages.labels.off,
                            margins: '0 5 0 0',
                            labelAlign:'right',
                            minValue:0,
                            flex: 0.7
                        }
                    ]
                },
                {
                    xtype:'fieldcontainer',
                    layout:'hbox',
                    items:[
                        {
                            xtype: 'textarea',
                            id: 'comment',
                            name: 'comment',
                            allowBlank:true,
                            fieldLabel: me.messages.labels.comment,
                            flex:1
                        }
                    ]
                }
            ]
        }
        
        me.callParent(arguments);
    }
    
});