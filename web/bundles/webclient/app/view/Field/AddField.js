

Ext.define('sisprod.view.Field.AddField', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias:'widget.addField',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        fieldNameLabel:'Name',
        lotLabel:'Lot',
        formationsLabel:'Formations'
    },
    title: 'Add Field',
    modal: true,
    width: 400,
    initComponent:function(){
        var me =this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'textfield',
                grow: true,
                name: 'fieldName',
                fieldLabel:me.messages.fieldNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 150
            },
            {
                xtype: 'combobox',
                anchor: '100%',             
                fieldLabel : me.messages.lotLabel,
                store : Ext.create('sisprod.store.LotAll').load(),
                displayField : 'lotName',
                valueField : 'idLot',
                name:'lot.idLot',
                width : 150,
                forceSelection : true,
                allowBlank : false,
                editable : false
            },
            {
                xtype: 'combofieldcontainer',
                anchor: '100%',
                comboBoxOptions: {
                    xtype: 'combobox',
                    anchor: '100%',             
                    fieldLabel : me.messages.formationsLabel,
                    store : Ext.create('sisprod.store.GeoFormationAll').load(),
                    displayField : 'geoFormationName',
                    valueField : 'idGeologicFormation',
                    name:'geoFormations',
                    id:'geoFormations',
                    width : 335,
                    forceSelection : true,
                    allowBlank : false,           
                    multiSelect: true
                }
            }
        ]
        };
        me.callParent(arguments);
    }
});