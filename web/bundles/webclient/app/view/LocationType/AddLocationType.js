

Ext.define('sisprod.view.LocationType.AddLocationType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addLocationType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        locationTypeNameLabel:'Name',
        locationTypeAcronymLabel:'Acronym'
    },
    title: 'Add Location Type',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'textfield',
                grow: true,
                name: 'locationTypeName',
                fieldLabel:me.messages.locationTypeNameLabel,
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
                name: 'locationTypeAcronym',
                fieldLabel:me.messages.locationTypeAcronymLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 5
            }
        ]
        }
        me.callParent(arguments);
    }
});