Ext.define('sisprod.store.EmployeeTemplate', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EmployeeTempModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.EmployeeTempModel'
    ],

    pageSize: 10,

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/employee/listPagingWithPattern.htm'
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