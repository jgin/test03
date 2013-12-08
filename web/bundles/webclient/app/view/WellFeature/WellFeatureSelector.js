/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.view.WellFeature.WellFeatureSelector', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.wellFeatureSelector',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Select Well Features',
    modal: true,
    width: 500,
    height: 250,
    layout: 'fit',
    
    store: null,
    record: null,
    
    messages: {
        msgFeatureName : 'Well Feature',
        msgFeatureType : 'Feature Type',
        msgMeasureUnit : 'Measure Unit',
        msgTitle: 'Well Features'
    },
    
    initComponent: function(){
        var me = this;
        me.formOptions = {
            bodyPadding: 5,
            fieldDefaults: {
                labelWidth: 105
            },  
            items: [
                {
                    title: me.messages.msgTitle,
                    xtype: 'gridpanel',
                    layout: 'fit',
                    height: 180,
                    id: 'gridWellFeatureSelector',
                    store: Ext.create('sisprod.store.WellFeatureAllStore').load({
                        callback: function(record, options, success){
                            if(Ext.isDefined(me.controller) && me.controller !== null){
                                me.controller.mappingSelectWellFeatures();
                            }
                        }
                    }),
                    collapsible: true,
                    frame: true,
                    autoScroll: true,
                    selModel: Ext.create('Ext.selection.CheckboxModel', {mode: 'MULTI'}),
                    columns: [
                        {
                            text: 'Id',
                            dataIndex: 'idWellFeature',
                            flex: 1,
                            hidden:true
                        },
                        {
                            text: me.messages.msgFeatureName,
                            dataIndex: 'wellFeatureName',
                            flex: 2
                        },
                        {
                            text: me.messages.msgFeatureType,
                            dataIndex: 'featureTypeName',
                            flex: 1
                        },
                        {
                            text: me.messages.msgMeasureUnit,
                            dataIndex: 'measureUnitName',
                            flex: 0.8
                        }
                    ]
                }
            ]
        };
        me.callParent(arguments);
    },
            
    getRecord: function(){
        return this.record;
    }    
});