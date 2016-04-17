
function Item() {
	this.addToDocument = function(){
		document.body.appendChild(this.item);	
	};
}

function Label() {
	this.createLabel = function(text,id){
		var label = document.createElement("p");
		label.setAttribute("id",id);
		var labeltext = document.createTextNode(text);
		label.appendChild(labeltext);
		this.item = label;
	},
	this.setText = function(text){
		this.item.innerHTML = text;
	};
}

function Button() {
	this.createButton = function(text,id){
		var button = document.createElement("button");
		button.setAttribute("id",id);
		var buttontxt = document.createTextNode(text);
		button.appendChild(buttontxt);
		this.item = button;
	},
	this.addClickEventHandler = function(handler,args){
		this.item.onmouseup= function() { handler(args); }
	};
}
function Dropdown(){
	this.createDropdown = function(dict, id, selected){
		var dropdown = document.createElement("select");
		dropdown.setAttribute("id",id);
		var selectList = document.createElement
		for (var i = 0; i < dict.length; i++){
			var option = document.createElement("option");
			option.setAttribute("value",dict[i].value);
			option.text = dict[i].text;
			dropdown.appendChild(option);
		}
		this.item = dropdown;
	},
	this.getSelected = function(){
		return this.item.options[this.item.selectedIndex].value;
	};
}

function Div(){
	this.createDiv = function(id){
		var div = document.createElement("div");
		div.setAttribute("id",id);
		this.item = div;
	},
	this.addChild = function(child){
		this.item.appendChild(child);
	},
	this.setClass = function(cname){
		this.item.className = cname; 
	};
}
