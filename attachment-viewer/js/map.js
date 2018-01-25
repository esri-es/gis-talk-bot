var map, view;

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/geometry/Point",
    "esri/Graphic",
    "esri/layers/FeatureLayer",
    "dojo/domReady!"
], function(Map, MapView, Point, Graphic, FeatureLayer) {

    map = new Map({
        basemap: basemap
    });

    view = new MapView({
        map: map,
        container: "viewDiv",
        center: [-3.674, 40.439],
        zoom: 17
    });

    window.fl = new FeatureLayer({
        url: featureUrl,
        outFields: ["*"],
        renderer: {
          type: "simple",  // autocasts as new SimpleRenderer()
          symbol: {
              type: "simple-marker",
              color: [226, 119, 40],
              outline: {
                  color: [255, 255, 255],
                  width: 2
              }
          }
      }
    });
    map.add(fl);



    view.on("click", function(event){
      // event is the event handle returned after the event fires.
      view.hitTest(event).then(function(g){

          var id = g.results[0].graphic.attributes[fl.objectIdField];
          console.log("id=",id);
      });
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
            view.graphics.removeAll()
            var pointGraphic = new Graphic({
                geometry: point,
                symbol: {
                    type: "simple-marker",
                    color: [255, 255, 115],
                    outline: {
                        color: [255, 255, 255],
                        width: 2
                    }
                },
                attributes:{
                    hola: "que tal",
                    a:23
                }
            });

            // view.graphics.add(pointGraphic)

            view.goTo(point);
        });
    };

    view.then(function(){
        $($("#result > li")[0]).find("div").click();
    });


});
