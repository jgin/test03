Ext.define('sisprod.model.SupplierModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'        
    ],

    fields:[
        {name: 'idSupplier', type: 'int', visible: false},
        {name: 'entity.entityId', type: 'int', visible: false,mapping: 'entity.entityId'},
        {name: 'entity.activityType.idActivityType', type: 'int', visible: false,mapping: 'entity.activityType.idActivityType'},
        {name: 'entity.activityType.activityTypeName', type: 'string', visible: true,mapping: 'entity.activityType.activityTypeName'},
        {name: 'entity.entityRuc', type: 'string', visible: true,mapping: 'entity.entityRuc'},
        {name: 'entity.isCompany', type: 'boolean', visible: true,mapping: 'entity.isCompany'},
        {name: 'entity.entityName', type: 'string', visible: true,mapping: 'entity.entityName'},
        {name: 'entityName', type: 'string', visible: true,mapping: 'entity.entityName'},
        {name: 'entity.address', type: 'string', visible: true,mapping: 'entity.address'},
        {name: 'entity.email', type: 'string', visible: false,mapping: 'entity.email'},
        {name: 'entity.image', type: 'string', visible: false,mapping: 'entity.image'},
        {name: 'entity.phone', type: 'string', visible: true,mapping: 'entity.phone'},
        {name: 'isAuthorized', type: 'boolean', visible: true}
    ],

    idProperty: 'idSupplier'
});