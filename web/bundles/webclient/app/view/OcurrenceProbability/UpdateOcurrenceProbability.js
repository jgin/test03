/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.OcurrenceProbability.UpdateOcurrenceProbability', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateOcurrenceProbability',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Edit Ocurrence Probability',
    messages: {
        labels:{
            ocurrenceProbabilityName: 'Name',
            ocurrenceProbabilityValue: 'Value',
            description: 'Description'
        }
    },
    modal: true,
    width: 400,
    
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
                    xtype: 'hiddenfield',
                    name: 'idOcurrenceProbability'
                },
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