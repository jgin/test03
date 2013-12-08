/**
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.view.CompressorStop.AddCompressorStop', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addCompressorStop',
    
    messages:{
         labels:{
             productionPeriod:'Report Date',
             compressor:'Compressor',
             lot:'Lot',
             production:'Production',
             compressorStopReason:'Reason',
             volumen:'Volumen',
             pressure:'Pressure',
             stopHour:'Stop Hours',
             start:'Start',
             finish:'Finish',
             comment:'Comment',
             compressorEmptyText:'Type a Compressor Name',
             reasonEmptyText:'Type a Reason'
         },
         validation:{
             alerTitle:'Message',
             selectLotFirst:'Select a Lot First...'
         }
    },
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Compressor Stop',
    modal: true,
    width: 650,
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
                    xtype: 'textfield',
//                            grow: true,
                    name: 'productionPeriodDate',
                    id: 'productionPeriodDate',
                    fieldLabel: me.messages.labels.productionPeriod,
//                            margins: '0 5 0 0',
                    value: envProductionPeriodDate,
                    readOnly: true,
                    anchor:'25%'
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
                            flex : 1.5
                        },
                        {
                            xtype: 'sensitivecombobox',
                            grow: true,
                            name: 'idEquipment',
                            id: 'idEquipment',
                            store: Ext.create('sisprod.store.CompressorTemplate',{
                                listeners: {
                                        beforeload: function(store, operation, options){
                                            var idLot = me.down('#idLot').getValue();
                                            if(Ext.isDefined(idLot) && idLot!==null){
                                                if(Ext.isDefined(operation.params) && operation.params!==null){
                                                    operation.params.idLot = idLot;
                                                }
                                                else operation.params = {
                                                        query: '',
                                                        idLot: idLot
                                                    };
                                            }
                                            else{
                                                Ext.Msg.alert(me.messages.validation.alertTitle, me.messages.validation.selectLotFirst);
                                                return false;
                                            }
                                        }
                                    }
                            }),
                            fieldLabel: me.messages.labels.compressor,
                            emptyText: me.messages.labels.compressorEmptyText,
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">','{equipmentName} ({supplierName})','</tpl>'),
//                            displayField: 'equipmentName',
                            listConfig: {
                                getInnerTpl: function() {
                                    return "{equipmentName} ({supplierName})";
                                }
                            },
                            valueField: 'idEquipment',
                            allowBlank: false,
                            margins: '0 5 0 0',
                            forceSelection: true,
                            flex : 4
                        }
                    ]
                },
                {
                    xtype:'fieldcontainer',
                    layout:'hbox',
                    items:[
                        {
                            xtype: 'sensitivecombo',
//                            labelWidth:110,                                
                            name:'idCompressorStopReason',
                            id: 'idCompressorStopReason',
                            fieldLabel: me.messages.labels.compressorStopReason,
                            store: Ext.create('sisprod.store.CompressorStopReasonTemplate'),
                            emptyText:me.messages.labels.reasonEmptyText,
                            forceSelection : true,
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">','{compressorStopReasonName}','</tpl>'),
                            valueField: 'idCompressorStopReason',
                            flex:4,
                            listConfig: {
                                getInnerTpl: function() {
                                    return "{compressorStopReasonName}";
                                }
                            },
                            margins: '0 5 0 0',
                            allowBlank:false
                        }
                        
                    ]
                },
                {
                    xtype:'fieldcontainer',
                    layout:'hbox',
                    anchor:'100%',
                    items:[
//                        {
//                            xtype: 'timefield',
//                            fieldLabel: me.messages.labels.start,
//                            id: 'start',
//                            name: 'start',
//                            format: 'H:i:s',
//                            flex: 1,
//                            labelWidth: 70,
//                            minValue: '0:00',
//                            maxValue: '24:00',
//                            vtype: 'timerange',
//                            allowBlank: false,
//                            endTimeField: 'finish',
//                            margins: '0 5 0 0'
//                        },
//                        {
//                            xtype: 'timefield',
//                            fieldLabel: me.messages.labels.finish,
//                            id: 'finish',
//                            name: 'finish',
//                            format: 'H:i:s',
//                            flex: 1,
//                            labelWidth: 70,
//                            minValue: '0:00',
//                            maxValue: '24:00',
//                            allowBlank: false,
//                            vtype: 'timerange',
//                            startField: 'start',
//                            margins: '0 5 0 0'
//                        },
                        {
                            xtype: 'numberfield',
                            id: 'volume',
                            name: 'volume',
                            labelWidth:100,
//                            allowBlank: false,
                            allowDecimals:true,
                            fieldLabel: me.messages.labels.volumen,
                            margins: '0 5 0 0',
                            minValue:0,
                            flex: 1
                        },
                        {
                            xtype: 'numberfield',
                            id: 'pressure',
                            name: 'pressure',
                            labelWidth:100,
//                            allowBlank: false,
                            allowDecimals:true,
                            fieldLabel: me.messages.labels.pressure,
                            margins: '0 5 0 0',
                            minValue:0,
                            flex: 1
                        },
                        {
                            xtype: 'numberfield',
                            id: 'stopHours',
                            name: 'stopHours',
                            labelWidth:100,
//                            editable:false,
//                            readOnly:true,
//                            labelAlign:"right",
                            allowBlank: false,
//                            allowDecimals:false,
                            minValue:0,
                            margins: '0 5 0 0',
                            fieldLabel: me.messages.labels.stopHour,
                            flex: 1
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
                            length:5000,
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