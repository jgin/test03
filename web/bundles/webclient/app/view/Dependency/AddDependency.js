

Ext.define('sisprod.view.Dependency.AddDependency', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addDependency',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        labels:{
            externalId: 'External Id',
            dependencyName:'Name',
            dependencyAcronym:'Acronym',
            dependencyLevel:'Dependency Level',
            dependencyParent:'Dependency'            
        },
        alerts: {
            firstSelectADependencyLevel:'First select a Dependency Level'
        },
        emptyText : {
            dependencyLevelEmptyText:'Level a Dependency ...',
            dependencyEmptyText:'Enter a Dependency ...'
        }
    },
    title: 'Add Dependency',
    modal: true,
    width: 400,
    
    initComponent:function(){
        var me=this;
        me.formOptions= {
        bodyPadding: 2,
        fieldDefaults: {
            labelWidth: 110
        },
        items: [
            {
                xtype: 'textfield',
                grow: true,
                name: 'dependencyName',
                id: 'dependencyName',
                fieldLabel:me.messages.labels.dependencyName,
                fieldStyle: {
                    textTransform: 'uppercase'
                },                
                anchor: '100%',
                allowBlank: false,
                maxLength: 200
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'dependencyAcronym',
                id: 'dependencyAcronym',
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                fieldLabel:me.messages.labels.dependencyAcronym,
                anchor: '100%',
                allowBlank: false,
                maxLength: 20
            }
            ,
            {
                xtype: 'combofieldcontainer',
                anchor: '100%',                
                comboBoxOptions: {                             
                    fieldLabel : me.messages.labels.dependencyLevel,
                    maxLength: 150,
                    emptyText: me.messages.emptyText.dependencyLevelEmptyText,
                    store : Ext.create('sisprod.store.DependencyLevelAll').load(),
                    displayField : 'dependencyLevelName',
                    valueField : 'idDependencyLevel',
                    name:'idDependencyLevel',
                    id:'idDependencyLevel',
                    width : 335,
                    forceSelection : true,
                    allowBlank : false,
                    editable : false
                }
            },
            {
                xtype: 'sensitivecombo',
                labelWidth:110,                                
                name:'cboDependency',
                id: 'cboDependency',
                fieldLabel: me.messages.labels.dependencyParent,
                store: Ext.create('sisprod.store.DependencyByDiffLevelAllTemplate',{
                listeners: {
                    beforeload: function(store, operation, options){
                        var form = me.down('form');
                        var dependencyLevelInput = form.queryById('idDependencyLevel');
                        var selectedDependencyLevel = dependencyLevelInput.getValue();
                        if(Ext.isDefined(selectedDependencyLevel) && selectedDependencyLevel!==null){
                            operation.params.idDependencyLevel = selectedDependencyLevel;
                            operation.params.idDependency = -1;
                        }
                        else{
                            Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.alerts.firstSelectADependencyLevel);
                            return false;
                        }
                    }
                }
                }),
                emptyText:me.messages.emptyText.dependencyEmptyText,
                forceSelection : true,
                displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">','{dependencyName}','</tpl>'),
                valueField: 'idDependency',
                width : 360,
                listConfig: {
                    getInnerTpl: function() {
                        return "{dependencyName}";
                    }
                }
            }
        ]
        }
        me.callParent(arguments);
    }
});