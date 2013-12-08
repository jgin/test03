/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.RimeCriteria.UpdateRimeCriteria', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateRimeCriteria',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    autoMappingOptions: {
        autoMapping: false
    },
    
    title: 'Edit RIME Criteria',
    messages: {
        rimeCriteriaNameLabel: 'Name',
        rimeCriteriaLevelLabel: 'Level'
    },
    modal: true,
    width: 400,
//    height: 150,

    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            bodyPadding: 2,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idRimeCriteria'
                },
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