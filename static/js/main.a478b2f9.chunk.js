(this["webpackJsonpttt-deluxe"]=this["webpackJsonpttt-deluxe"]||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var i=n(0),r=n.n(i),s=n(7),a=n.n(s),o=(n(13),n(1)),u=n(2),l=n(4),h=n(3),c=n(5),p=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(u.a)(t,[{key:"onTTTResize",value:function(e){this.props.onTTTResize(e.target.value)}},{key:"onTTTRestart",value:function(){window.confirm("Are you sure you wish to restart this game?")&&this.props.onTTTRestart()}},{key:"render",value:function(){var e=[3,4,5,6].map((function(e,t){return r.a.createElement("option",{key:t,value:e},e)}));return r.a.createElement("menu",{id:"TTTMenu"},r.a.createElement("menu-item",{class:"resize"},r.a.createElement("select",{onChange:this.onTTTResize.bind(this)},e),"squares per row"),r.a.createElement("menu-item",{class:"restart"},r.a.createElement("a",{href:"#",onClick:this.onTTTRestart.bind(this)},"Start New Game")))}}]),t}(i.Component),f=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(u.a)(t,[{key:"onClickSquare",value:function(){this.props.onClickSquare(this.props.index)}},{key:"getClassNames",value:function(){return this.props.inWinningRow?"highlight frozen":this.props.symbol?"frozen":null}},{key:"render",value:function(){return r.a.createElement("li",{className:this.getClassNames(),onClick:this.onClickSquare.bind(this)},this.props.symbol)}}]),t}(i.Component),v=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(u.a)(t,[{key:"inWinningRow",value:function(e){return!!this.props.winningRow&&-1!==this.props.winningRow.indexOf(e)}},{key:"isGameOver",value:function(){for(var e=!0,t=0;t<this.props.squares.length;t++)if(null===this.props.squares[t]){e=!1;break}return this.props.winningRow||e}},{key:"getClassNames",value:function(){var e=["TTTGrid-size-"+this.props.rowSize];return this.isGameOver()?e.push("TTTGrid-game-over frozen"):this.props.waitingMode&&e.push("frozen"),e.join(" ")}},{key:"render",value:function(){var e=this,t=this.props.squares.map((function(t,n){return r.a.createElement(f,{symbol:t,key:n,index:n,inWinningRow:e.inWinningRow(n),onClickSquare:e.props.onClickSquare})}));return r.a.createElement("ul",{id:"TTTGrid",className:this.getClassNames()},t)}}]),t}(i.Component),w=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{id:"TTTLabels"},r.a.createElement("div",null,r.a.createElement("b",null,"Player:")," ",this.props.user),r.a.createElement("div",null,r.a.createElement("b",null,"Opponent:")," ",this.props.helper))}}]),t}(i.Component),m=function(e){function t(e){var n;Object(o.a)(this,t),(n=Object(l.a)(this,Object(h.a)(t).call(this,e))).initialRowSize=3,n.state=n.getStateByRowSize(n.initialRowSize);var i=n.props.helperSymbol,r=n.props.userSymbol;return n.props.helper.setPlayerSymbols(i,r),n}return Object(c.a)(t,e),Object(u.a)(t,[{key:"userMoves",value:function(e){var t=this;this.setState({waitingMode:!0}),this.fillSquare(this.props.userSymbol,e),setTimeout((function(){t.findWinningRow(),t.state.winningRow||t.helperMoves()}),500)}},{key:"helperMoves",value:function(){var e=this.state.squares,t=this.props.helper.getSquare(e);this.fillSquare(this.props.helperSymbol,t),this.findWinningRow(),this.setState({waitingMode:!1})}},{key:"getStateByRowSize",value:function(e){return this.props.helper.setRowSize(e),{rowSize:e,squares:Array(Math.pow(e,2)).fill(null),waitingMode:!1,winningRow:null}}},{key:"fillSquare",value:function(e,t){var n=this.state.squares.slice();n[t]=e,this.setState({squares:n})}},{key:"findWinningRow",value:function(){for(var e=this,t=this.props.helper.allRows,n=0;n<t.length;n++){var i=t[n],r=i.map((function(t){return e.state.squares[t]}));if(this.isWinningRow(r)){this.setState({winningRow:i});break}}}},{key:"isWinningRow",value:function(e){if(e[0]){for(var t=1;t<e.length;t++)if(e[t]!==e[0])return!1;return!0}return!1}},{key:"restartGame",value:function(){var e=this.getStateByRowSize(this.state.rowSize);this.setState(e)}},{key:"resizeGame",value:function(e){var t=this.getStateByRowSize(e);this.setState(t)}},{key:"render",value:function(){return r.a.createElement("div",{id:"TTT"},r.a.createElement(p,{onTTTResize:this.resizeGame.bind(this),onTTTRestart:this.restartGame.bind(this)}),r.a.createElement(v,{rowSize:this.state.rowSize,squares:this.state.squares,winningRow:this.state.winningRow,waitingMode:this.state.waitingMode,onClickSquare:this.userMoves.bind(this)}),r.a.createElement(w,{user:this.props.userSymbol,helper:this.props.helperSymbol}))}}]),t}(i.Component),g=function(){function e(){Object(o.a)(this,e),this.helper="O",this.user="X"}return Object(u.a)(e,[{key:"getSquare",value:function(e){if(this.squares=e,0===this.getMoveCount())return this.centerPosition&&!e[this.centerPosition]?this.centerPosition:this.getAvailableCorner();if(1!==this.getMoveCount()){var t=this.getAttackOrDefenseSquare();return null!==t?t:this.getRandomSquare()}var n=this.getAttackOrDefenseSquare();if(null!==n)return n;if(3!==this.rowSize)return this.getAvailableCorner();switch(this.getDiagonalRowPattern()){case"XOX":return[1,3,5,7][Math.floor(4*Math.random())];case"XXO":return this.getAvailableCorner();case"XO_":for(var i,r=this.cornerPositions,s=0;s<r.length;s++)if(this.squares[r[s]]===this.user){i=s;break}return r.reverse()[i];default:return this.getRandomSquare()}}},{key:"getAttackOrDefenseSquare",value:function(){var e=this,t=null;for(var n in this.allRows){for(var i=0,r=0,s=null,a=this.allRows[n],o=a.map((function(t){return e.squares[t]})),u=0;u<o.length;u++)o[u]===this.helper&&i++,o[u]===this.user&&r++,null===o[u]&&(s=a[u]);if(i===a.length-1&&0===r)return s;0===i&&r===a.length-1&&(t=t||s)}return t}},{key:"getAvailableCorner",value:function(){var e=this,t=this.cornerPositions.filter((function(t){return null===e.squares[t]}));return t[Math.floor(Math.random()*t.length)]}},{key:"getDiagonalRowPattern",value:function(){for(var e=this,t=this.user,n=this.helper,i=this.diagonalRows,r=0;r<i.length;r++){var s=i[r].map((function(t){return e.squares[t]}));if(s[0]===t&&s[1]===n&&s[2]===t)return"XOX";if(s[0]===t&&s[1]===t&&s[2]===n||s[0]===n&&s[1]===t&&s[2]===t)return"XXO";if(null===s[0]&&s[1]===n&&s[2]===t||s[0]===t&&s[1]===n&&null===s[2])return"XO_"}return null}},{key:"getMoveCount",value:function(){var e=0;for(var t in this.squares)this.squares[t]===this.helper&&e++;return e}},{key:"getRandomSquare",value:function(){for(var e=[],t=0;t<this.squares.length;t++)null===this.squares[t]&&e.push(t);return e[Math.floor(Math.random()*e.length)]}},{key:"setPlayerSymbols",value:function(e,t){this.helper=e,this.user=t}},{key:"setRowSize",value:function(e){this.rowSize=e,this.setRowCombinations(),this.setCenterPosition(),this.setCornerPositions()}},{key:"setRowCombinations",value:function(){for(var e=this.rowSize,t=[],n=[],i=[],r=0;r<e;r++){for(var s=[],a=[],o=0;o<e;o++)s.push(o+r*e),a.push(r+o*e);t.push(s),t.push(a),n.push(r+e*r),i.push((e-1)*(r+1))}t.push(n),t.push(i),this.allRows=t,this.diagonalRows=[n,i]}},{key:"setCenterPosition",value:function(){this.rowSize%2===1?this.centerPosition=Math.floor(Math.pow(this.rowSize,2)/2):this.centerPosition=null}},{key:"setCornerPositions",value:function(){this.cornerPositions=[0,this.rowSize-1,Math.pow(this.rowSize,2)-this.rowSize,Math.pow(this.rowSize,2)-1]}}]),e}();a.a.render(r.a.createElement(m,{userSymbol:"X",helperSymbol:"O",helper:new g}),document.getElementById("main"))},8:function(e,t,n){e.exports=n(14)}},[[8,1,2]]]);
//# sourceMappingURL=main.a478b2f9.chunk.js.map