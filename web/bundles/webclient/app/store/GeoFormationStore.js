Ext.define('sisprod.store.GeoFormationStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.GeoFormationModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.GeoFormationModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/geoFormations/list.htm',
            destroy: 'rest/geoFormations/delete.htm',
            create: 'rest/geoFormations/register.htm',
            update: 'rest/geoFormations/update.htm',
            activate: 'rest/geoFormations/activate.htm'
        },
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idGeologicFormation',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});