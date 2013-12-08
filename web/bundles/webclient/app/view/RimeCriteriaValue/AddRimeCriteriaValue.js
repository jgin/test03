/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.RimeCriteriaValue.AddRimeCriteriaValue', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addRimeCriteriaValue',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add RIME Criteria Value',
    messages: {
        idRimeCriteriaLabel: 'RIME Criteria',
        effectiveStartDateLabel: 'Effective Start Date',
        minimumScoreLabel: 'Minimum Score',
        maximumScoreLabel: 'Maximum Score',
        maximumTimeAttentionLabel: 'Max. Attention Time'
    },
    modal: true,
    width: 320,
   
    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            bodyPadding: 2,
            defaults:{
                labelWidth: 140
            },
            items: [
                {
                    xtype: 'combobox',
                    grow: true,
                    name: 'idRimeCriteria',
                    store: Ext.create('sisprod.store.RimeCriteriaAll'),
                    fieldLabel: me.messages.idRimeCriteriaLabel,
                    displayField: 'rimeCriteriaName',
                    valueField: 'idRimeCriteria',
                    forceSelection: true,
                    anchor: '100%',
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    grow: true,
                    name: 'effectiveStartDate',
                    fieldLabel: me.messages.effectiveStartDateLabel,
                    anchor: '85%',
                    allowBlank: false,
                    value: new Date()
                },
                {
                    xtype: 'numberfield',
                    grow: true,
                    name: 'minimumScore',
                    fieldLabel: me.messages.minimumScoreLabel,
                    anchor: '70%',
                    allowBlank: false,
                    minValue: 0,
                    value: 0
                },
                {
                    xtype: 'numberfield',
                    grow: true,
                    name: 'maximumScore',
                    id: 'maximumScore',
                    fieldLabel: me.messages.maximumScoreLabel,
                    anchor: '70%',
                    allowBlank: false,
                    minValue: 0,
                    value: 0
                },
                {
                    xtype: 'numberfield',
                    grow: true,
                    name: 'maximumTimeAttention',
                    fieldLabel: me.messages.maximumTimeAttentionLabel,
                    anchor: '70%',
                    allowBlank: false,
                    minValue: 0,
                    value: 0
                }
            ]
        };
        
        me.callParent(arguments);
    }
});