var template = $.templates("#theTmpl");

featureUrl = getUrlParams();

if(featureUrl){
    featureUrl = featureUrl.url;
}else{
    var featureUrl = 'https://services2.arcgis.com/lakDP2oKmBnm3KDC/ArcGIS/rest/services/Prueba_20140804_061021/FeatureServer/0';
    //var featureUrl = 'https://services.arcgis.com/0ZRg6WRC7mxSLyKX/arcgis/rest/services/harveyDamagePhotos/FeatureServer/0';
    //var featureUrl = 'https://services.arcgis.com/nzS0F0zdNLvs7nc8/arcgis/rest/services/NPSMemories/FeatureServer/0'
}

var objectIdField = null;

$.getJSON( `${featureUrl}?f=json`, function( data ) {
    objectIdField = data.objectIdField
});

$.getJSON( `${featureUrl}/queryAttachments?objectIds=&globalIds=&definitionExpression=1+%3D+1&attachmentTypes=&size=&resultOffset=&resultRecordCount=&f=pjson&token=`, function( data ) {
    var attachments = [],
    attachments_thumb = [];
    data.attachmentGroups.forEach(function(elem,i){
        elem.attachmentInfos.forEach(function(attachment,j){
            var tmp = `${featureUrl}/${elem.parentObjectId}/attachments/${attachment.id}`;
            //console.log(tmp);

            attachments.push({
                parentObjectId: elem.parentObjectId,
                GlobalID: attachment.GlobalID,
                url: tmp
            });

        });
    });

    var htmlOutput = template.render(attachments);
    $("#result").html(htmlOutput);

});


function getUrlParams() {
    var search = location.search.substring(1);
    if(search){
        var obj = decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"');
        return JSON.parse('{"' + obj  + '"}');
    }else{
        return false;
    }
}
