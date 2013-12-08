Ext.define('sisprod.store.TurnStore',{
    extend: 'Ext.data.Store',
    model: 'sisprod.model.TurnModel',
    
    require: [
        'Ext.data.Store',
        'sisprod.model.TurnModel'
    ],
    
    proxy:{
        type: 'ajax',
        api:{
            read:'rest/turns/list.htm',
            destroy:'rest/turns/delete.htm',
            create: 'rest/turns/register.htm',
            update: 'rest/turns/update.htm',
            activate: 'rest/turns/activate.htm'
        },      
        reader:{
            type:'json',
            useSimpleAccessors:true,
            root: 'data',
            idProperty: 'idTurn',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});