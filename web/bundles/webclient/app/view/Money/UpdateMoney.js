/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Money.UpdateMoney', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateMoney',
     
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        isLocalMoneyLabel: 'Is Local Money',
        moneyNameLabel:'Money', 
        moneyAcronymLabel:'Acronym'
    },
    title: 'Update Money',
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
                name: 'idMoney'
            },
            {
                xtype: 'checkboxfield',
                name: 'isLocalMoney',
                fieldLabel: me.messages.isLocalMoneyLabel,
                anchor: '100%',
                allowBlank: false,
                maxLength: 50
            },
            {
                xtype: 'textfield',
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