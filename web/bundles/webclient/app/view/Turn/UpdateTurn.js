/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Turn.UpdateTurn', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateTurn',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        startTimeLabel: 'Start Time',
        endTimeLabel: 'End Time',
        turnOrderLabel: 'Turn Order',
        turnNameLabel: 'Turn',
        acronymTurnLabel: 'Acronym'
    },
    
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Turn',
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
                name: 'idTurn'
            },
            {
                xtype: 'timefield',
                format: 'H:i:s',
                name: 'startTime',
                fieldLabel: me.messages.startTimeLabel,
                allowBlank: false
            },
            {
                xtype: 'timefield',
                format: 'H:i:s',
                name: 'endTime',
                fieldLabel: me.messages.endTimeLabel,
                allowBlank: false
            },
            {
                xtype: 'numberfield',
                name: 'turnOrder',
                fieldLabel: me.messages.turnOrderLabel,
                allowBlank: false
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'turnName',
                fieldLabel: me.messages.turnNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                allowBlank: false,
                maxLength:50
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'acronymTurn',
                fieldLabel: me.messages.acronymTurnLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                allowBlank: false,
                maxLength:5  
                
            }
        ]
    },
    me.callParent(arguments);    
    }
});