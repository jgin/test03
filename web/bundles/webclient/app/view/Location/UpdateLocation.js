/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Location.UpdateLocation', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateLocation',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    autoMappingOptions: {
        autoMapping: false
    },
     messages:{
        locationNameLabel:'Name',
        locationAcronymLabel:'Acronym',
        locationTypeLabel:'Location Type',
        locationParentLabel:'Location',
        locationEmptyText:'Type a Location ...',
        firstSelectALocatonType:'First select a Location Type',
        lot:'Lot'
        
    },
    title: 'Update Location',
    modal: true,
    width: 400,
    initComponent:function(){
        var me = this;
        me.formOptions= {
        bodyPadding: 2,
        fieldDefaults: {
            labelWidth: 110
        },
        items: [
            {
                xtype: 'hiddenfield',
                id:'idLocation',
                name: 'idLocation'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'locationName',
                id: 'locationName',
                fieldLabel: me.messages.locationNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                maxLength: 150,
                anchor: '100%',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'locationAcronym',
                id: 'locationAcronym',
                fieldLabel:me.messages.locationAcronymLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 20
            }
            ,
            {
                xtype: 'combofieldcontainer',
                anchor: '100%',
                comboBoxOptions: {
                    //xtype: 'combobox',                                 
                    fieldLabel : me.messages.locationTypeLabel,
                    maxLength: 150,
                    store : Ext.create('sisprod.store.LocationTypeAll').load(),
                    displayField : 'locationTypeName',
                    valueField : 'idLocationType',
                    name:'locationType.idLocationType',
                    id:'idLocationType',
                    width : 335,
                    forceSelection : true,
                    allowBlank : false,
                    editable : false
                }
            },
//            {
//                id:'cboLocation',
//                xtype: 'combobox',
//                anchor: '100%',             
//                fieldLabel :me.messages.locationParentLabel,
//                maxLength: 150,
//                store : Ext.create('sisprod.store.LocationByDiffTypeAll').load(),
//                displayField : 'locationName',
//                valueField : 'idLocation',
//                name:'locationParent.idLocation',
//                width : 150,
//                forceSelection : false,
//                allowBlank : true,
//                //editable : false,   
//                queryMode: 'local',
//                typeAhead: true
//                //disabled:true
//            },
            {
                xtype: 'combobox',
                grow: true,
                name:'lot.idLot',
                id: 'cboLot',
                store: Ext.create('sisprod.store.LotAll'),
                fieldLabel: me.messages.lot,
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
                labelWidth:110,                                
                name:'locationParent.idLocation',
                id: 'cboLocation',
                fieldLabel: me.messages.locationParentLabel,
                store: Ext.create('sisprod.store.LocationByDiffTypeAllTemplate',{
                listeners: {
                        beforeload: function(store, operation, options){
                        var form = me.down('form');
                        var locationTypeInput = form.queryById('idLocationType');
                        var lotInput = form.queryById('cboLot');
                        var selectedLocationType = locationTypeInput.getValue();
                        var selectedLot = lotInput.getValue();
                        var locationInput = form.queryById('idLocation');
                        var selectedLocation = locationInput.getValue();
                        if(selectedLot==null){
                            selectedLot=-1;                            
                        }
                        if(Ext.isDefined(selectedLocationType) && selectedLocationType!==null){
                            if(Ext.isDefined(operation.params) && operation.params!==null){
                                operation.params.idLocationType = selectedLocationType;
                                operation.params.idLocation = selectedLocation;
                                operation.params.idLot = selectedLot;
                            }else{
                                operation.params = {
                                        query:'',
                                        idLocationType: selectedLocationType,
                                        idLocation:selectedLocation,
                                        idLot: selectedLot
                                };
                            }
                        }
                        else{
                            Ext.Msg.alert("SISPROD", me.messages.firstSelectALocatonType);
                            return false;
                        }
                    }
                }
                }),
                emptyText:me.messages.locationEmptyText,
                forceSelection : true,
                displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">','{locationName}','</tpl>'),
                valueField: 'idLocation',
                width : 360,
                listConfig: {
                    getInnerTpl: function() {
                        return "{locationName}";
                    }
                }
            }
        ]
        }
        me.callParent(arguments);
    }
});