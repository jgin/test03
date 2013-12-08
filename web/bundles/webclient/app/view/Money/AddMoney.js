/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Money.AddMoney', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addMoney',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        isLocalMoneyLabel: 'Is Local Money',
        moneyNameLabel:'Money', 
        moneyAcronymLabel:'Acronym'
    },
    
    title: 'Add Money',
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
                xtype: 'checkboxfield',
                name: 'isLocalMoney',
                fieldLabel: me.messages.isLocalMoneyLabel,
                inputValue:true,
                anchor: '100%'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'moneyName',
                fieldLabel: me.messages.moneyNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 50
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'moneyAcronym',
                fieldLabel: me.messages.moneyAcronymLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 5
            }
        ]
    },
    me.callParent(arguments);    
    }
});