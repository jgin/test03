

Ext.define('sisprod.view.GeoFormation.AddGeoFormation', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias:'widget.addGeoFormation',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        geoFormationNameLabel:'Name'
    },
    title: 'Add Geo Formation',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'textfield',
                grow: true,
                name: 'geoFormationName',
                fieldLabel:me.messages.geoFormationNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 150
            }
        ]
        }
        me.callParent(arguments);
    }
});