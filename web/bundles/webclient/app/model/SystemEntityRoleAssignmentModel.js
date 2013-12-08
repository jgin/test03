Ext.define('sisprod.model.SystemEntityRoleAssignmentModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'entityName', type: 'string', mapping: 'title'},
//        {name: 'listRoleId', type: 'int'},
//        {name: 'listRoleGranted', type: 'boolean'},
//        {name: 'createRoleId', type: 'int'},
//        {name: 'createRoleGranted', type: 'boolean'},
//        {name: 'updateRoleId', type: 'int'},
//        {name: 'updateRoleGranted', type: 'boolean'},
//        {name: 'deleteRoleId', type: 'int'},
//        {name: 'deleteRoleGranted', type: 'boolean'},
//        {name: 'exportRoleId', type: 'int'},
//        {name: 'exportRoleGranted', type: 'boolean'},
        {name: 'listRoleId', type: 'int', mapping: 'list.roleId'},
        {name: 'listRoleGranted', type: 'boolean', mapping: 'list.checked'},
        {name: 'createRoleId', type: 'int', mapping: 'create.roleId'},
        {name: 'createRoleGranted', type: 'boolean', mapping: 'create.checked'},
        {name: 'updateRoleId', type: 'int', mapping: 'update.roleId'},
        {name: 'updateRoleGranted', type: 'boolean', mapping: 'update.checked'},
        {name: 'deleteRoleId', type: 'int', mapping: 'delete.roleId'},
        {name: 'deleteRoleGranted', type: 'boolean', mapping: 'delete.checked'},
        {name: 'exportRoleId', type: 'int', mapping: 'export.roleId'},
        {name: 'exportRoleGranted', type: 'boolean', mapping: 'export.checked'}
    ]
});