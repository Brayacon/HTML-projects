//Todo list App main.js.
//Bradburry Connel @2016 August 24th-25th. 

var data = (localStorage.getItem('todolist')) ? JSON.parse(localStorage.getItem('todolist')):{
	todo: [],
	completed: []

};

//console.log(data)

//Remove and Complete SVG
var removesvg = '<svg class = "nofill" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1" width="64px" height="64px"><g><path class= "fill" style="fill " d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z "/></g></svg>';
var completesvg = '<svg class= "nofill"  version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><circle class= "fill" cx="25" cy="25" r="25"/><polyline style="fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" points="38,15 22,33 12,25 "/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';

renderTodoList();

//user clicked on the add button
//ther is any text on the item field
document.getElementById('add').addEventListener('click', function() {
	var value = document.getElementById('item').value;
	if(value) {
		addItem(value); 
}

} );

document.getElementById('item').addEventListener('keydown', function(e) {
	var value = this.value;
	if (e.code === 'Enter' && value) {
		addItem(value);
	}
});

function addItem (value) {
		addItemToDOM(value); 
//		console.log("There was a value");
		
//     	puts blanks after value has been entered
		document.getElementById('item').value = '';

		data.todo.push(value);
		dataObjecUpdated();

}

function renderTodoList() {
	if (!data.todo.length && !data.completed.length) return;

	for(var i = 0; i < data.todo.length; i++) {
		var value = data.todo[i];
		addItemToDOM(value);
	}

	for (var j = 0; j < data.completed.length; j++) {
		var value = data.completed[i];
		addItemToDOM(value, true);
	}

}

function dataObjecUpdated() {
	localStorage.setItem('todolist', JSON.stringify(data));
}

function removeitem() {
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	var id = parent.id;
	var value = item.innerText;

	if (id === 'todo') {
		data.todo.splice(data.todo.indexOf(value), 1);
	}else{
		data.completed.splice(data.completed.indexOf(value), 1);
	}
	console.log(data)

	dataObjectUpdated();

	parent.removeChild(item);
}

function completeitem() {
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	var id = parent.id;
	var value = item.innerText;

	if (id === 'todo') {
		data.todo.splice(data.todo.indexOf(value), 1);
		data.completed.push(value);

	}else{
		data.completed.splice(data.completed.indexOf(value), 1);
		data.todo.push(value);
	}

	dataObjecUpdated();

	//check if the item should be added to complete to re-addedto new
	//var target;	
	var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

//	if (id == 'todo') {
		// it's a room item to be completed
//		target = document.getElementById('completed');
//	}
//	else {
		// It's a completed item to be re-done
//		target =  document.getElementById('todo');
//	}

	parent.removeChild(item);
	target.insertBefore(item, target.childNodes[0]);
}

//Add's items to the todo list.
function addItemToDOM(text, completed) {
	//if completed completed is done otherwise the 2nd after semicolon is done.
	var List = (completed) ? document.getElementById('completed'):document.getElementById('todo');

	var item = document.createElement('li');
	item.innerText = text;

	var buttons = document.createElement('div');
	buttons.classList.add('buttons');

	var remove = document.createElement('button');
	remove.classList.add('remove');
	remove.innerHTML =removesvg;

	//add click event for removing item.
	remove.addEventListener('click', removeitem);

	var complete = document.createElement('button');
	complete.classList.add('complete');
	complete.innerHTML =completesvg;

	//add click event for complete item
	complete.addEventListener('click', completeitem);

	buttons.appendChild(remove);
	buttons.appendChild(complete);
	item.appendChild(buttons);

// adds/appends activity on the latest time created from up eg. any activity you add will appear at top. 
	List.insertBefore(item, List.childNodes[0]);
}