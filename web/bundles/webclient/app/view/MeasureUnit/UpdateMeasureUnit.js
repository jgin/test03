/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.MeasureUnit.UpdateMeasureUnit', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateMeasureUnit',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        measureUnitTypeNameLabel:'Measure Unit Type',
        isBaseUnitLabel: 'Is Base Unit',
        measureUnitNameLabel: 'Measure Unit',
        measureUnitAcronymLabel: 'Acronym',
        baseConversionLabel:'Base Conversion'
    },
    
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Measure Unit',
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
                xtype: 'hiddenfield',
                name: 'idMeasureUnit'
            },
            {
                xtype: 'combobox',
                anchor: '100%',
                fieldLabel: me.messages.measureUnitTypeNameLabel,
                store:Ext.create('sisprod.store.MeasureUnitTypeAllStore').load(),
                displayField:'measureUnitTypeName',
                valueField: 'idMeasureUnitType',
                name:'measureUnitType.idMeasureUnitType',
                allowBlank: false,
                editable:false
            },
            {
                xtype: 'checkboxfield',
                name: 'isBaseUnit',
                fieldLabel: me.messages.isBaseUnitLabel,
                inputValue:true,
                anchor: '100%'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'measureUnitName',
                fieldLabel: me.messages.measureUnitNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 100
            },
            {
                xtype: 'textfield',
                name: 'measureUnitAcronym',
                fieldLabel: me.messages.measureUnitAcronymLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: true,
                maxLength: 10
            },
            {
                xtype: 'numberfield',
                name: 'baseConversion',
                fieldLabel: me.messages.baseConversionLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                minValue:0,
                decimalSeparator:'.',
                allowBlank: false
            }
        ]
    },
    me.callParent(arguments);    
    }    

});