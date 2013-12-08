/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Tank.UpdateTank', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateTank',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        tankNameLabel:'Tank Name',
        tankAcronymLabel:'Acronym',
        tankTypeLabel:'Tank Type',
        alternativeTankTypeLabel:'Alt. Tank Type',
        locationLabel:'Location',
        locationEmptyText:'Type a location',
        startupDateLabel:'Start Up Date',
        adjustmentFactorLabel:'Adjustment Factor',
        featuresTitle:'Tank Features',
        maximumCapacityLabel:'Maximum Capacity',
        minimunCapacityLabel:'Minimun Capacity',
        heightInFeetLabel:'Height (Feet)',
        diameterInFeetLabel:'Diameter (Feet)',
        lotLabel:'Lot',
        firstSelectALot:'Select a Lot First'
    },
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Tank',
    modal: true,
    width: 470,
    initComponent:function(){
        var me=this;
        me.formOptions= {
        bodyPadding: 5,
        fieldDefaults: {
            labelWidth: 140
        },
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idTank'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'tankName',
                fieldLabel:me.messages.tankNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 150
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'tankAcronym',
                fieldLabel:me.messages.tankAcronymLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 20
            },      
            {
                xtype: 'combofieldcontainer',
                anchor: '100%',
                comboBoxOptions: {
                    anchor: '100%',             
                    fieldLabel :me.messages.tankTypeLabel,
                    store : Ext.create('sisprod.store.TankTypeAll').load(),
                    displayField : 'tankTypeName',
                    valueField : 'idTankType',
                    name:'idTankType',
                    id:'idTankType',
                    forceSelection : true,
                    allowBlank : false,
                    editable : false,
                    width:400
                }
            },
            {
                xtype: 'combofieldcontainer',
                anchor: '100%',
                comboBoxOptions: {             
                    fieldLabel : me.messages.alternativeTankTypeLabel,
                    store : Ext.create('sisprod.store.AlternativeTankTypeAll').load(),
                    displayField : 'alternativeTankTypeName',
                    valueField : 'idAlternativeTankType',
                    name:'idAlternativeTankType',
                    id:'idAlternativeTankType',
                    forceSelection : true,
                    allowBlank : true,
                    editable : false,
                    width:400
                }
            },
            {
                xtype: 'combobox',
                grow: true,
                name:'idLot',
                id: 'idLot',
                store: Ext.create('sisprod.store.LotAll'),
                fieldLabel: me.messages.lotLabel,
                displayField: 'lotName',
                valueField: 'idLot',
                allowBlank: false,
                margins: '0 5 0 0',
                forceSelection: true,
                editable: false,
                flex : 1
            },
            {
                xtype: 'sensitivecombo',
                anchor:'100%',
                name: 'idLocation',
                id: 'idLocation',
                fieldLabel: me.messages.locationLabel,
                store: Ext.create('sisprod.store.LocationByLotTemplate',{
                    listeners: {
                        beforeload: function(store, operation, options){
                            var form = me.down('form');
                            var lotInput = form.queryById('idLot');
                            var selectedLot = lotInput.getValue();
                            if(Ext.isDefined(selectedLot) && selectedLot!==null){
                                if(Ext.isDefined(operation.params) && operation.params!==null){
                                    operation.params.idLot = selectedLot;
                                }else{
                                    operation.params = {
                                            query:'',
                                            idLot: selectedLot
                                    };
                                }
                            }
                            else{
                                Ext.Msg.alert("SISPROD", me.messages.firstSelectALot);
                                return false;
                            }
                        }
                    }
                }),
                allowBlank:false,
                emptyText: me.messages.locationEmptyText,
                forceSelection : true,
                displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">','{locationName}','</tpl>'),
                valueField: 'idLocation',
                listConfig: {
                    getInnerTpl: function() {
                        return "{locationName}";
                    }
                }
            },    
            {
                xtype: 'datefield',
                grow: true,
                name: 'startupDateField',
                id: 'startupDateField',
                fieldLabel:me.messages.startupDateLabel,
                anchor: '100%',
                allowBlank: true,
                maxValue: new Date()
            },  
            {
                xtype: 'numberfield',
                grow: true,
                name: 'adjustmentFactor',
                fieldLabel: me.messages.adjustmentFactorLabel,
                anchor: '100%',
                allowBlank: true,
                allowDecimals: true,
                allowNegative: false,
                decimalSeparator:'.',
                minValue:0
            },
            {
            xtype:'fieldset',
            columnWidth: 0.5,
            title: me.messages.featuresTitle,
            defaults: {anchor: '100%'},
            layout: 'anchor',
            items: [
                {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                anchor: '100%',
                defaultType: 'numberfield',
                bodyPadding:10,
                fieldDefaults: {
                    labelAlign: 'center'
                },
                items: [
                        {
                            xtype: 'numberfield',
                            grow: true,
                            name: 'maximumCapacity',
                            fieldLabel: me.messages.maximumCapacityLabel,
                            allowBlank: true,
                            allowDecimals: true,
                            decimalSeparator:'.',
                            allowNegative: false,
                            minValue:0,
                            flex:1
                        }
                        ,
                        {
                            xtype: 'numberfield',
                            grow: true,
                            name: 'minimumCapacity',
                            fieldLabel:me.messages.minimunCapacityLabel,
                            allowBlank: true,
                            allowDecimals: true,
                            decimalSeparator:'.',
                            allowNegative: false,
                            minValue:0,
                            flex:1
                        }
                       ]
                },
                {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                anchor: '100%',
                defaultType: 'numberfield',
                bodyPadding:10,
                fieldDefaults: {
                    labelAlign: 'center'
                },
                items: [
                    {
                        xtype: 'numberfield',
                        grow: true,
                        name: 'heightInFeet',
                        fieldLabel: me.messages.heightInFeetLabel,
                        allowBlank: true,
                        allowDecimals: true,
                        decimalSeparator:'.',
                        allowNegative: false,
                        minValue:0,
                        
                        flex:1
                    },
                    {
                        xtype: 'numberfield',
                        grow: true,
                        name: 'diameterInFeet',
                        fieldLabel:me.messages.diameterInFeetLabel,
                        allowBlank: true,
                        allowDecimals: true,
                        decimalSeparator:'.',
                        allowNegative: false,
                        minValue:0,
                        
                        flex:1
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