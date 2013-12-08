/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.MeasureUnitType.AddMeasureUnitType',{
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addMeasureUnitType',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        measureUnitTypeNameLabel:'Measure Unit Type'
    },
    title: 'Add Measure Unit Type',
    modal: true,
    width: 400,
    
    initComponent: function(){
        var me = this;
        me.formOptions = {
        bodyPadding: 2,
        fieldDefaults: {
            labelWidth: 120
        },
        items: [
            {
                xtype: 'textfield',
                grow: true,
                name: 'measureUnitTypeName',
                fieldLabel: me.messages.measureUnitTypeNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                allowBlank: false,
                anchor: '100%',
                maxLength:100
            }
        ]
    },
    me.callParent(arguments);    
    }
});