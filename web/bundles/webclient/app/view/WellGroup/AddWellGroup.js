/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.view.WellGroup.AddWellGroup', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addWellGroup',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Well Group',
    modal: true,
    width: 400,
    
    messages: {
        msgWellGroupName: 'Well Group',
        msgId: 'Id'
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
                    name: 'wellGroupName',
                    fieldLabel: me.messages.msgWellGroupName,
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 100,
                    margins: '5 5 0 5'
                }
            ]
        };
        me.callParent(arguments);
    }
});