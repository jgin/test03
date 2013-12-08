/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.RimeCriteriaValue.UpdateRimeCriteriaValue', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateRimeCriteriaValue',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    autoMappingOptions: {
        autoMapping: false
    },
    
    title: 'Edit RIME Criteria Value',
    messages: {
        idRimeCriteriaLabel: 'RIME Criteria',
        effectiveStartDateLabel: 'Effective Start Date',
        minimumScoreLabel: 'Minimum Score',
        maximumScoreLabel: 'Maximum Score',
        maximumTimeAttentionLabel: 'Max. Attention Time'
    },
    modal: true,
    width: 400,
//    height: 150,

    initComponent: function(){
        var me = this;
        me.formOptions = {
            bodyPadding: 2,
            defaults:{
                labelWidth: 140
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idRimeCriteriaValue'
                },
                {
                    xtype: 'combobox',
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
                    name: 'effectiveStartDate',
                    fieldLabel: me.messages.effectiveStartDateLabel,
                    anchor: '85%',
                    allowBlank: false
                },
                {
                    xtype: 'numberfield',
                    grow: true,
                    name: 'minimumScore',
                    fieldLabel: me.messages.minimumScoreLabel,
                    anchor: '70%',
                    allowBlank: false,
                    minValue: 0
                },
                {
                    xtype: 'numberfield',
                    name: 'maximumScore',
                    id: 'maximumScore',
                    fieldLabel: me.messages.maximumScoreLabel,
                    anchor: '70%',
                    allowBlank: false,
                    minValue: 0
                },
                {
                    xtype: 'numberfield',
                    name: 'maximumTimeAttention',
                    fieldLabel: me.messages.maximumTimeAttentionLabel,
                    anchor: '70%',
                    allowBlank: false,
                    minValue: 0
                }
            ]
        };
        me.callParent(arguments);
    }

      
});