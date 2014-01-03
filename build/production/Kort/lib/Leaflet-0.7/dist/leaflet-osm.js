/*d9ab50208bec2be25a66e7b3f42605c6b8b7d9de*/L.OSM={};L.OSM.TileLayer=L.TileLayer.extend({options:{url:"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'© <a target="_parent" href="http://www.openstreetmap.org">OpenStreetMap</a> and contributors, under an <a target="_parent" href="http://www.openstreetmap.org/copyright">open license</a>'},initialize:function(a){a=L.Util.setOptions(this,a);L.TileLayer.prototype.initialize.call(this,a.url)}});L.OSM.Mapnik=L.OSM.TileLayer.extend({options:{url:"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",maxZoom:19}});L.OSM.CycleMap=L.OSM.TileLayer.extend({options:{url:"http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png"}});L.OSM.TransportMap=L.OSM.TileLayer.extend({options:{url:"http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png"}});L.OSM.MapQuestOpen=L.OSM.TileLayer.extend({options:{url:"http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png",subdomains:"1234",attribution:"Tiles courtesy of <a href='http://www.mapquest.com/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png'>"}});L.OSM.DataLayer=L.FeatureGroup.extend({options:{areaTags:["area","building","leisure","tourism","ruins","historic","landuse","military","natural","sport"],uninterestingTags:["source","source_ref","source:ref","history","attribution","created_by","tiger:county","tiger:tlid","tiger:upload_uuid"],styles:{}},initialize:function(b,a){L.Util.setOptions(this,a);L.FeatureGroup.prototype.initialize.call(this);if(b){this.addData(b)}},addData:function(e){if(!(e instanceof Array)){e=this.buildFeatures(e)}for(var d=0;d<e.length;d++){var c=e[d],b;if(c.type==="node"){b=L.marker(c.latLng,this.options.styles.node)}else{var f=new Array(c.nodes.length);for(var a=0;a<c.nodes.length;a++){f[a]=c.nodes[a].latLng}if(this.isWayArea(c)){f.pop();b=L.polygon(f,this.options.styles.area)}else{b=L.polyline(f,this.options.styles.way)}}b.addTo(this);b.feature=c}},buildFeatures:function(f){var b=[],a=L.OSM.getNodes(f),j=L.OSM.getWays(f,a),g=L.OSM.getRelations(f,a,j);for(var d in a){var c=a[d];if(this.interestingNode(c)){b.push(c)}}for(var e=0;e<j.length;e++){var h=j[e];b.push(h)}return b},isWayArea:function(a){if(a.nodes[0]!=a.nodes[a.nodes.length-1]){return false}for(var b in a.tags){if(~this.options.areaTags.indexOf(b)){return true}}return false},interestingNode:function(b){for(var a in b.tags){if(this.options.uninterestingTags.indexOf(a)<0){return true}}return false}});L.Util.extend(L.OSM,{getNodes:function(c){var a={};var b=c.getElementsByTagName("node");for(var d=0;d<b.length;d++){var e=b[d],f=e.getAttribute("id");a[f]={id:f,type:"node",latLng:L.latLng(e.getAttribute("lat"),e.getAttribute("lon"),true),tags:this.getTags(e)}}return a},getWays:function(f,b){var k=[];var h=f.getElementsByTagName("way");for(var e=0;e<h.length;e++){var g=h[e],c=g.getElementsByTagName("nd");var a={id:g.getAttribute("id"),type:"way",nodes:new Array(c.length),tags:this.getTags(g)};for(var d=0;d<c.length;d++){a.nodes[d]=b[c[d].getAttribute("ref")]}k.push(a)}return k},getRelations:function(e,a,h){var l=[];var f=e.getElementsByTagName("relation");for(var d=0;d<f.length;d++){var k=f[d],c=k.getElementsByTagName("member");var g={id:k.getAttribute("id"),type:"relation",members:new Array(c.length),tags:this.getTags(k)};for(var b=0;b<c.length;b++){if(c[b].getAttribute("type")==="node"){g.members[b]=a[c[b].getAttribute("ref")]}else{g.members[b]=null}}l.push(g)}return l},getTags:function(d){var a={};var c=d.getElementsByTagName("tag");for(var b=0;b<c.length;b++){a[c[b].getAttribute("k")]=c[b].getAttribute("v")}return a}});