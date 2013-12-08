/* 
 * To change this template, choose Users | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WellServiceType.UpdateWellServiceType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateWellServiceType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        wellServiceTypeNameLabel:'Name',
        wellServiceTypeAcronymLabel:'Acronym'
    },
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Well Service Type',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idWellServiceType'
            },
            {
            xtype: 'textfield',
            grow: true,
            name: 'wellServiceTypeName',
            fieldLabel:me.messages.wellServiceTypeNameLabel,
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
            name: 'wellServiceTypeAcronym',
            fieldLabel:me.messages.wellServiceTypeAcronymLabel,
            fieldStyle: {
                textTransform: 'uppercase'
            },
            anchor: '100%',
            allowBlank: false,
            maxLength: 20
            }
        ]
        };
        me.callParent(arguments);
    }
});