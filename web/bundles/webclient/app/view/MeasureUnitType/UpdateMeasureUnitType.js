/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.MeasureUnitType.UpdateMeasureUnitType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateMeasureUnitType',
    
    title: 'Update MeasureUnit Type',
    modal: true,
    width: 400,
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        measureUnitTypeNameLabel:'Measure Unit Type'
    },
    
    autoMappingOptions: {
        autoMapping: false
    },
    
    initComponent: function(){
        var me = this;
        me.formOptions = {
        bodyPadding: 2,
        fieldDefaults: {
            labelWidth: 120
        },
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idMeasureUnitType'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'measureUnitTypeName',
                fieldLabel: me.messages.measureUnitTypeNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 100
            }
        ]
    },
    me.callParent(arguments);    
    }
    
});