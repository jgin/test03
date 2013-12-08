/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.GeoFormation.UpdateGeoFormation', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateGeoFormation',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        geoFormationNameLabel:'Name'
    },
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Geo Formation',
    modal: true,
    width: 400,
    initComponent:function(){
        var me = this;
        me.formOptions={
        bodyPadding: 2,
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idGeologicFormation'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'geoFormationName',
                fieldLabel: me.messages.geoFormationNameLabel,
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