Ext.define('sisprod.store.SectorAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SectorModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.SectorModel'
    ],
    
//    autoLoad: true,

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/sector/listAll.htm'
        },
//        url:'rest/workCategories/list.htm',

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idSector',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});