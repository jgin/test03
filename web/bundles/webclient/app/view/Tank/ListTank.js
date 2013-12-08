/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Tank.ListTank', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listTank',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   messages:{
       idTankHeader:'Tank ID',
       tankNameHeader: 'Tank Name',
       tankAcronymHeader:'Tank Acronym',
       maximumCapacityHeader:'Maximum Capacity',
       minimumCapacityHeader:'Minimum Capacity',           
       heightInFeetHeader:'Height',
       diameterInFeetHeader:'Diameter',
       adjustmentFactorHeader:'Adjustment Factor',
       startupDateHeader:'Start Up',
       idTankTypeHeader:'Tank Type ID',
       tankTypeNameHeader:'Tank Type',
       idAlternativeTankTypeHeader:'Alternative Tank Type ID',
       alternativeTankTypeNameHeader:'Alt. Tank Type',
       idLocationHeader:'Location ID',
       locationNameHeader:'Location',
       lotHeader:'Lot'
   },
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Tank List',
   
   gridOptions: {
        region: 'center'
    },
   
   initComponent: function(){
       var me = this;
       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
       me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idTank: {header:me.messages.idTankHeader,flex:1},
                    tankName:{header:me.messages.tankNameHeader,flex:2},
                    tankAcronym:{header:me.messages.tankAcronymHeader,flex:1},
                    maximumCapacity:{header:me.messages.maximumCapacityHeader,flex:1},
                    minimumCapacity:{header:me.messages.minimumCapacityHeader,flex:1},
                    heightInFeet:{header:me.messages.heightInFeetHeader,flex:1},
                    diameterInFeet:{header:me.messages.diameterInFeetHeader,flex:1},
                    adjustmentFactor:{header:me.messages.adjustmentFactorHeader,flex:1},
                    startupDate:{header:me.messages.startupDateHeader,flex:1},
                    'tankType.idTankType':{header:me.messages.idTankTypeHeader,flex:1,hideable:false},
                    'tankType.tankTypeName':{header:me.messages.tankTypeNameHeader,flex:2},
                    'alternativeTankType.idAlternativeTankType':{header:me.messages.idAlternativeTankTypeHeader,flex:1,hideable:false},
                    'alternativeTankType.alternativeTankTypeName':{header:me.messages.alternativeTankTypeNameHeader,flex:2},
                    'lot.idLot':{hideable:false},
                    'lot.lotName':{header:me.messages.lotHeader,flex:1},
                    'location.idLocation':{header:me.messages.idLocationHeader,flex:1,hideable:false},
                    'location.locationName':{header:me.messages.locationNameHeader,flex:2}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});