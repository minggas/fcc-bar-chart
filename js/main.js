"use strict";var container=document.querySelector(".container");console.dir(container);var w=container.clientWidth-100,h=container.clientHeight-110,overlay=d3.select(".container").append("div").attr("class","overlay").style("opacity",0),tooltip=d3.select(".container").append("div").attr("id","tooltip").style("opacity",0),svgContainer=d3.select(".container").append("svg").attr("class","chart").attr("width","100%").attr("height","100%");d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(function(t){var a=t.name.split(",")[0],e=t.data.map(function(t){return t[0]}),n=t.data.map(function(t){return t[1]}),r=t.data.length,i=new Date(d3.min(e)),o=new Date(d3.max(e)),l=d3.min(n),s=d3.max(n),c=w/r;svgContainer.append("text").attr("class","y-label").attr("transform","rotate(-90)").attr("x",function(t,a){return h/5-h}).attr("y",80).text(a),svgContainer.append("text").attr("class","x-label").attr("x",w).attr("y",h+60).text(t.description.split("\n")[2].split("-")[0]);svgContainer.append("a").attr("href",t.description.split("\n")[2].split("-")[1].replace("(","").replace(")","")).attr("target","_blank").attr("class","link").append("text").attr("class","x-label").attr("x",w).attr("y",h+80).text(t.description.split("\n")[2].split("-")[1]);var d=d3.scaleTime().domain([i,o]).range([0,w]),p=d3.axisBottom().scale(d),u=(svgContainer.append("g").call(p).attr("id","x-axis").attr("transform","translate(60,"+h+")"),d3.scaleLinear().domain([l,s]).range([l/s*h,h])),y=n.map(function(t){return u(t)}),m=d3.scaleLinear().domain([l,s]).range([h,l/s*h]),x=d3.axisLeft(m);svgContainer.append("g").call(x).attr("id","y-axis").attr("transform","translate(60, 0)");d3.select("svg").selectAll("rect").data(y).enter().append("rect").attr("data-date",function(t,a){return e[a]}).attr("data-gdp",function(t,a){return n[a]}).attr("class","bar").attr("x",function(t,a){return a*c}).attr("y",function(t){return h-t}).attr("width",c).attr("height",function(t){return t}).style("fill","hsla(105, 30%, 50%, 0.5)").attr("transform","translate(60, 0)").on("mouseover",function(t,a){overlay.transition().duration(0).style("background-color","hsla(105, 30%, 50%, 0.9)").style("height",t+"px").style("width",c+"px").style("opacity",.9).style("left",a*c+15+"px").style("top",h-t+13+"px").style("transform","translateX(60px)"),tooltip.transition().duration(200).style("opacity",.9),tooltip.html(new Date(e[a]).toLocaleDateString("en",{year:"numeric",month:"long"})+"<br>$"+n[a].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g,"$1,")+" Billion").attr("data-date",e[a]).style("left",a*c-40+"px").style("top",h-t-55+"px").style("transform","translateX(60px)")}).on("mouseout",function(t){overlay.transition().duration(200).style("opacity",0),tooltip.transition().duration(200).style("opacity",0)})}).catch(function(t){alert(t)});
