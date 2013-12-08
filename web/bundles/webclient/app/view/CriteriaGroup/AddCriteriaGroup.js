/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.CriteriaGroup.AddCriteriaGroup', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addCriteriaGroup',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Criteria Group',
    
    messages: {
        labels: {
            criteriaGroupName: 'Name',
            criteriaGroupOrder: 'Order'
        }
    },
    modal: true,
    width: 450,
    layout: 'fit',
    
    initComponent: function(){
        var me = this;
        
        var formItems = [
            {
                xtype: 'textfield',
                name: 'criteriaGroupName',
                fieldLabel: me.messages.labels.criteriaGroupName,
                anchor: '100%',
                allowBlank: false,
                maxLength: 255,
                fieldStyle: {textTransform: 'uppercase'}
            },
            {
                xtype: 'numberfield',
                grow: true,
                name: 'criteriaGroupOrder',
                fieldLabel: me.messages.labels.criteriaGroupOrder,
                anchor: '35%',
                allowBlank: false,
                minValue: 1,
                value: 1
            }
        ];
        var tabItems = new Array();
        tabItems.push(Ext.create('sisprod.view.CriteriaGroup.CriteriaFactorsGrid', {id:'addCriteriaFactorsGrid'}));
        tabItems.push(Ext.create('sisprod.view.CriteriaGroup.CriteriaLevelsGrid', {id:'addCriteriaLevelsGrid'}));
        var tab = Ext.create('Ext.tab.Panel', {
            items: tabItems
        });
        formItems.push(tab);
        
        me.formOptions = {
            bodyPadding: 2,
            items: formItems
        };
        
        me.callParent(arguments);
    }
});