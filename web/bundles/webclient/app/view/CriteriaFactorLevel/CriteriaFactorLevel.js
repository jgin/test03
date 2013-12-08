/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.CriteriaFactorLevel.CriteriaFactorLevel', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.criteriaFactorLevel',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Factor Descriptions',
    
    messages: {
        labels: {
            criteriaFactor: 'Factor'
        }
    },
    modal: true,
    width: 600,
    layout: 'fit',
    idCriteriaGroup: null,
    
    initComponent: function(){
        var me = this;
        
        var formItems = [
            {
                xtype: 'hiddenfield',
                name: 'idCriteriaGroup',
                id: 'idCriteriaGroup',
                value: (Ext.isDefined(me.idCriteriaGroup) && me.idCriteriaGroup!==null)?me.idCriteriaGroup:''
            },
            {
                xtype: 'combobox',
                grow: true,
                name: 'idCriteriaFactor',
                id: 'idCriteriaFactor',
                store: Ext.create('sisprod.store.CriteriaFactorByGroupStore',{
                    listeners: {
                        beforeload: function(store, operation, options){
                            var form = me.down('form');
                            var idCriteriaGroupInput = form.queryById('idCriteriaGroup');
                            var idCriteriaGroup = idCriteriaGroupInput.getValue();
                            if(Ext.isDefined(idCriteriaGroup) && idCriteriaGroup!==null)
                                operation.params.idCriteriaGroup = idCriteriaGroup;
                        }
                    }
                }),
                fieldLabel: me.messages.labels.criteriaFactor,
                displayField: 'criteriaFactorName',
                editable: false,
                valueField: 'idCriteriaFactor',
                forceSelection: true,
                anchor: '70%',
                allowBlank: false
            }
        ];
        formItems.push(Ext.create('sisprod.view.CriteriaFactorLevel.DescriptionGrid', {id:'cflDescriptionGrid'}));
        
        me.formOptions = {
            bodyPadding: 2,
            items: formItems
        };
        
        me.callParent(arguments);
    }
});