(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{126:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),l=n(3),i=n.n(l),c=n(37),s=n(38),r=n(42),u=n(39),d=n(43),m=n(13),g=n.n(m),h=n(14),p=(n(69),n(40)),f=n.n(p),v=n(41),b=n.n(v),w="https://image-directory.appspot.com/images",E=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(r.a)(this,Object(u.a)(t).call(this,e))).onChangeHandler=function(e){var t=e.target.files[0];n.setState({selectedFile:t,loaded:0})},n.onClickHandler=function(){if(n.state.selectedFile){console.log(n.state);var e=new FormData;e.append("photo",n.state.selectedFile),g.a.post(w,e).then(function(e){console.log(e),h.a.success("Uploaded successfully"),n.getImages()}).catch(function(e){h.a.error("upload fail",e)})}},n.state={selectedFile:null,loading:!1,images:[]},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.setState({}),this.getImages()}},{key:"getImages",value:function(){var e=this;this.setState({loading:!0}),g.a.get(w).then(function(t){return e.setState({images:t.data,loading:!1})})}},{key:"render",value:function(){return o.a.createElement("div",{className:"container"},o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("center",null,o.a.createElement(b.a,{size:18,color:"rgb(54, 215, 183)",loading:this.state.loading}),!this.state.loading&&o.a.createElement("div",null,o.a.createElement("input",{type:"file",onChange:this.onChangeHandler}),o.a.createElement("button",{type:"button",onClick:this.onClickHandler},"Upload"))),o.a.createElement("br",null),o.a.createElement(f.a,{images:this.state.images}))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},44:function(e,t,n){e.exports=n(126)}},[[44,1,2]]]);
//# sourceMappingURL=main.2ddab24e.chunk.js.map