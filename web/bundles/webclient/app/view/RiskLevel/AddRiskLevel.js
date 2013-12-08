/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.RiskLevel.AddRiskLevel', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addRiskLevel',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Risk Level',
    messages: {
        labels:{
            riskLevelName: 'Name',
            riskLevelAcronym: 'Acronym',
            minimumValue: 'Min.Value',
            maximumValue: 'Max.Value'
        }
    },
    
    modal: true,
    width: 400,
    singleAddition: false,
//    height: 150,
    
    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            bodyPadding: 2,
            defaults:{
                labelWidth: 100,
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'riskLevelName',
                    maxLength: 50,
                    fieldLabel: me.messages.labels.riskLevelName,
                    allowBlank: false,
                    fieldStyle: {textTransform: 'uppercase'}
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'riskLevelAcronym',
                    fieldLabel: me.messages.labels.riskLevelAcronym,
                    anchor: '70%',
                    maxLength: 3,
                    allowBlank: false,
                    fieldStyle: {textTransform: 'uppercase'}
                },
                {
                    xtype: 'numberfield',
                    grow: true,
                    name: 'minimumValue',
                    id: 'minimumValue',
                    fieldLabel: me.messages.labels.minimumValue,
                    anchor: '70%',
                    allowBlank: false,
                    minValue: 0,
                    value: 0
                },
                {
                    xtype: 'numberfield',
                    grow: true,
                    name: 'maximumValue',
                    fieldLabel: me.messages.labels.maximumValue,
                    anchor: '70%',
                    allowBlank: false,
                    minValue: 0,
                    value: 0
                }
            ]
        };
        
        me.callParent(arguments);
    }
});