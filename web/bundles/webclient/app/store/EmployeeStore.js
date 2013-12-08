Ext.define('sisprod.store.EmployeeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EmployeeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.EmployeeModel'
    ],
    remoteSort : true,
    proxy:{
        type: 'ajax',
        actionMethods: {
            create   : 'POST',
            update   : 'POST',
            read: 'GET'
        },
        
        api: {
            read:'rest/employee/list.htm',
            destroy:'rest/employee/delete.htm',
            create:'rest/employee/register.htm',
            update:'rest/employee/update.htm',
            activate:'rest/employee/activate.htm'
        },
       reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idEmployee',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});