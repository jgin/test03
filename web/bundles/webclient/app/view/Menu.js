Ext.define('sisprod.view.Menu', {
    extend: 'Ext.tree.Panel',
    requires:[
        'Ext.tree.Panel'
    ],
    
    xtype: 'app-menu',

    id: 'app-menu',

    border: false,
    autoScroll: true,

    /*layout: {
        type: 'border'
    }*/

    rootVisible: false
});