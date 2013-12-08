Ext.define('sisprod.store.SpecialMeasureStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SpecialMeasureModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.SpecialMeasureModel'
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/specialMeasure/list.htm',
            destroy: 'rest/specialMeasure/delete.htm',
            create: 'rest/specialMeasure/register.htm',
            update: 'rest/specialMeasure/update.htm',
            activate: 'rest/specialMeasure/activate.htm'
        },
        url: 'rest/specialMeasure/list.htm',
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idSpecialMeasure',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});