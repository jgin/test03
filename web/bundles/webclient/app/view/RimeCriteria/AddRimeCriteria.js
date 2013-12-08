/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.RimeCriteria.AddRimeCriteria', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addRimeCriteria',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add RIME Criteria',
    messages: {
        rimeCriteriaNameLabel: 'Name',
        rimeCriteriaLevelLabel: 'Level'
    },
    modal: true,
    width: 400,
    
    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            bodyPadding: 2,
            items: [
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'rimeCriteriaName',
                    fieldLabel: me.messages.rimeCriteriaNameLabel,
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 100,
                    fieldStyle: {textTransform: 'uppercase'}
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'rimeCriteriaLevel',
                    fieldLabel: me.messages.rimeCriteriaLevelLabel,
                    anchor: '30%',
                    allowBlank: false,
                    maxLength: 1,
                    fieldStyle: {textTransform: 'uppercase'}
                }
            ]
        };
                
        me.callParent(arguments);
    }
});