var map, view;

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/geometry/Point",
    "esri/Graphic",
    "dojo/dom",
    "dojo/on",
    "dojo/domReady!"
], function(Map, MapView, Point, Graphic, dom, on) {

    map = new Map({
        basemap: "hybrid"
    });

    view = new MapView({
        map: map,
        container: "viewDiv",
        center: [-3.674, 40.439],
        zoom: 17
    });

    window.showImage = function(el, id){
        var feature = `${featureUrl}/query?where=${objectIdField}+%3D+${id}&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=3857&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`;
        // console.log(feature)

        $("ul .selected").removeClass("selected");
        $(el).addClass("selected")

        $.getJSON( feature, function( data ) {

            point = new Point({
                "x": data.features[0].geometry.x,
                "y": data.features[0].geometry.y,
                spatialReference: 3857
            })

            var pointGraphic = new Graphic({
                geometry: point,
                symbol: {
                    type: "simple-marker",
                    color: [226, 119, 40],
                    outline: {
                        color: [255, 255, 255],
                        width: 2
                    }
                }
            });

            view.graphics.add(pointGraphic)

            view.goTo(point);
        });
    };

    view.then(function(){
        $($("#result > li")[0]).find("div").click();
    });


});
