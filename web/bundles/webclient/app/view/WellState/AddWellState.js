/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.view.WellState.AddWellState', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addWellState',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Well State',
    modal: true,
    width: 400,
    showWarningBeforeCancel: true,
    
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