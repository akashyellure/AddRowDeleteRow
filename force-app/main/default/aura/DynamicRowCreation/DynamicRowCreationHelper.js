({
    addRowHelper : function(component, noOfRows) {
        for(var index = 0; index < noOfRows; index++) {
var dynamicRowsList = component.get("v.dynamicRowsList");
        dynamicRowsList.push({
            'Name': '',
            'Phone': '',
            'AccountNumber': '',
            'editMode': true,
            'rowNumber':dynamicRowsList.length + 1
        });
        component.set("v.dynamicRowsList", dynamicRowsList);
}
    },
    
    saveRecordsHelper : function(component, event, helper) {
var action = component.get('c.saveAccountRecords');
        action.setParams({
            'dynamicRowsList' : JSON.stringify(component.get('v.dynamicRowsList'))
        });
        action.setCallback(this,function(response){
         var result = response.getReturnValue();
            if(response.getState() === 'SUCCESS') {
                if(result.messageType === 'success') {
                    var dynamicRowList = [];
                    dynamicRowList.push({
                        'Name': '',
                        'Phone': '',
                        'AccountNumber': '',
                        'editMode': true,
                        'rowNumber':dynamicRowList.length + 1
                    });  
                    component.set("v.dynamicRowsList", dynamicRowList);
                    component.set('v.messageType','success');
                    component.set('v.message','Records created succesfully');
                } else {
                    component.set('v.messageType','error');
                    component.set('v.message',result.message);
                }
            } else {
                component.set('v.messageType','error');
                component.set('v.message','No response from server or client is offline.');
            }
        });
        $A.enqueueAction(action);
        setTimeout($A.getCallback(function() {
                component.set('v.message','');
        }), 5000);
},
})