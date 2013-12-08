/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.OcurrenceProbability.AddOcurrenceProbability', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addOcurrenceProbability',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Ocurrence Probability',
    messages: {
        labels:{
            ocurrenceProbabilityName: 'Name',
            ocurrenceProbabilityValue: 'Value',
            description: 'Description'
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
                    name: 'ocurrenceProbabilityName',
                    maxLength: 255,
                    fieldLabel: me.messages.labels.ocurrenceProbabilityName,
                    allowBlank: false,
                    fieldStyle: {textTransform: 'uppercase'}
                },
                {
                    xtype: 'numberfield',
                    grow: true,
                    name: 'ocurrenceProbabilityValue',
                    id: 'ocurrenceProbabilityValue',
                    fieldLabel: me.messages.labels.ocurrenceProbabilityValue,
                    anchor: '70%',
                    allowBlank: false,
                    minValue: 0,
                    value: 0
                },
                {
                    xtype: 'textareafield',
                    grow: true,
                    name: 'description',
                    id: 'description',
                    fieldLabel: me.messages.labels.description,
                    allowBlank: false
                }
            ]
        };
        
        me.callParent(arguments);
    }
});