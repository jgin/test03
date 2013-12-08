/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.DependencyLevel.AddDependencyLevel', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addDependencyLevel',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        labels:{
            dependencyLevelName: 'Dependency Level'
        }
    },
    
    title: 'Add Dependency Level',
    modal: true,
    width: 400,
//    height: 150,
    initComponent: function(){
        var me = this;
        me.formOptions = {
        bodyPadding: 2,
        fieldDefaults: {
            labelWidth: 120
        },
        items: [
            {
                xtype: 'textfield',
                grow: true,
                name: 'dependencyLevelName',
                fieldLabel: me.messages.labels.dependencyLevelName,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 100
            }
        ]
    },
    me.callParent(arguments);    
    }
});