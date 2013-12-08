Ext.define('sisprod.model.TurnModel',{
    extend:'Ext.data.Model',
    
    require: [
        'Ext.data.Model'
    ],
    
    fields:[
        {name:'idTurn', type: 'int', visible: false},
        {name:'startTime', type:'string', visible: true},
        {name:'endTime', type:'string', visible: true},
        {name:'turnOrder', type: 'int', visible: true},
        {name:'turnName', type:'string', visible: true},
        {name:'acronymTurn', type:'string', visible: true}
    ],
    
    idProperty:'idTurn'
});


