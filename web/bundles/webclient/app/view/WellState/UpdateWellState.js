/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WellState.UpdateWellState', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateWellState',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Edit Well State',
    modal: true,
    width: 400,
    
    messages: {
        msgWellStateName: 'Well State',
        msgAcronym: 'Acronym'
    },
    
    initComponent: function(){
        var me = this;
        me.formOptions = {
            bodyPadding: 5, 
            fieldDefaults: {
                fieldStyle: {
                    textTransform: 'uppercase'
                }
            },
            items: [ 
                {
                     xtype: 'textfield',
                     name : 'idWellState',
                     fieldLabel: 'id',
                     hidden:true  
                },
                {
                     xtype: 'textfield',
                     grow: true,
                     name: 'wellStateName',
                     fieldLabel: me.messages.msgWellStateName,
                     anchor: '100%',
                     allowBlank: false,
                     maxLength: 100,
                     margins: '5 5 0 5'
                },
                {
                     xtype: 'textfield',
                     grow: true,
                     name: 'acronym',
                     fieldLabel: me.messages.msgAcronym,
                     anchor: '70%',
                     allowBlank: false,
                     maxLength: 20,
                     margins: '5 5 0 5'
                }
             ]
         };
         me.callParent(arguments);
    }
});