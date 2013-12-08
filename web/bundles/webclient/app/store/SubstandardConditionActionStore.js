Ext.define('sisprod.store.SubstandardConditionActionStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SubstandardConditionActionModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.SubstandardConditionActionModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/substandardConditionAction/list.htm',
            destroy: 'rest/substandardConditionAction/delete.htm',
            create: 'rest/substandardConditionAction/register.htm',
            update: 'rest/substandardConditionAction/update.htm',
            activate: 'rest/substandardConditionAction/activate.htm'
            
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idSubstandardConditionAction',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});