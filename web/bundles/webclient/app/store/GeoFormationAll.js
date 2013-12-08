Ext.define('sisprod.store.GeoFormationAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.GeoFormationModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.GeoFormationModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/geoFormations/listAll.htm'
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