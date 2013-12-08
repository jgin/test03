/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
var addWellTab = Ext.define('sisprod.view.Well.AddWellTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'wellTab',
    requires: [
        'sisprod.view.Well.GeneralData',
        'sisprod.view.Well.FeatureData'
    ],
    
    width: '100%',
    messages: {
        msgWellData: 'Well Data',
        msgFeatures: 'Features'
    },
    defaults: {
        bodyPadding: 0,
        autoScroll: true
    },
    
    initComponent: function(){
        var me = this;
        Ext.apply(this,{
            items: [{
                title: me.messages.msgWellData,
                items:[
                    {
                        xtype: 'well-general'
                    }
                ]
            }, {
                title: me.messages.msgFeatures,
                items:[
                    {
                        xtype:'panel',
                        id:'featureData',
                        layout: 'anchor',    
                        autoScroll:true,
                        title:me.messages.featuresTitle,
                        width: '100%',
                        height: 460,
                        border: true,
                        bodyPadding: 5,
                        fieldDefaults: {
                            labelWidth: 250
                        },
                        items:[
                        ]
                    }
                ]
            }]
        });
        this.callParent(arguments);
    }
});

Ext.define('sisprod.view.Well.AddWell', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addWell',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Well',
    modal: true,
    width: 460,
    showWarningBeforeCancel: true,
    messages: {
        msgWellData: 'Well Data',
        msgFeatures: 'Features'
    },
    
    initComponent: function(){
        var me = this;
        me.formOptions = {
            bodyPadding: 5,
            items: [
                addWellTab
            ],
            fieldDefaults: {
                labelWidth: 100,
                margins: '0 0 0 5',
                anchor: '100%'
            }  
        };
        me.callParent(arguments);
    }
});