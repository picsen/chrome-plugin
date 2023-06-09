document.getElementById("scrap").addEventListener('click', () => {
    console.log("Popup DOM fully loaded and parsed");

    function getTable() {
        //You can play with your DOM here or check URL against your regex
        //console.log('Tab script:');
        //console.log(document.body);
        //return document.body.innerHTML;
		//alert(document.querySelector('#screener-content').innerHTML);
		return document.querySelector('#screener-views-table > tbody > tr:nth-child(4) > td > table').outerHTML;
    }

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.scripting.executeScript({
        code: '(' + getTable + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
		//alert(results[0]);
		//document.querySelector('#preview').innerHTML = results[0];


		var area = document.createElement('div');
		area.innerHTML = results[0];
		var table = area.querySelector('table');
		//document.querySelector('#preview').innerHTML = table.outerHTML;

		var data = [];
		//alert(table.outerHTML);
		var rows = table.querySelectorAll('tr');
		//console.log(table);
		if( rows.length == 0 ) {
			return;
		}
		
		alert(rows.length + ' items copied clipboard.');
		//alert(table.rows.length);
		for (var r = 0, row; row = rows[r]; r++) {
		   //iterate through rows
		   //rows would be accessed using the "row" variable assigned in the for loop
		   var rowData = [];
		   var cols = row.querySelectorAll('td');
		   for (var c = 0; col = cols[c]; c++) {
			 //iterate through columns
			 //columns would be accessed using the "col" variable assigned in the for loop
			 rowData.push(col.innerText);
		   }  
		   data.push(rowData.join('\t'));
		}

		// copy clipboard
		var copyText = document.querySelector('#tsv');
		copyText.value = data.join('\n');

		copyText.select();
		copyText.setSelectionRange(0, 99999); /* For mobile devices */

		document.execCommand('copy');
		});
});

// import portfolio
document.getElementById("importPortfolio").addEventListener('click', () => {
    console.log("Popup DOM fully loaded and parsed");


	// async function getClipboardContents() {
	// 	try {
	// 	  const text = await navigator.clipboard.readText();
	// 	  alert('Pasted content: '+ text);
	// 	} catch (err) {
	// 	  alert('Failed to read clipboard contents: '+ err);
	// 	}
	//   }

	// getClipboardContents();

    function importData(tsv) {
        //You can play with your DOM here or check URL against your regex
        //console.log('Tab script:');
        //console.log(document.body);
        //return document.body.innerHTML;
		//alert(document.querySelector('#screener-content').innerHTML);
		var count = 0;
		if( tsv == null ) {
			return 0;
		}

		var lines = tsv.split('\n');
		if( lines.length == 0) {
			return 0;
		}

		for(var i = 0; i < lines.length; i++) {
			var line = lines[i];
			if( line.indexOf('\t') == -1) {
				continue;
			}

			var fields = line.split('\t');
			if( fields.length < 3) {
				continue;
			}

			document.querySelector("input[name='ticker" + count + "']").value = fields[0];
			document.querySelector("input[name='shares" + count + "']").value = fields[1];
			document.querySelector("input[name='price" + count + "']").value = fields[2];

			// 최대 갯수 이하시 자동 추가
			count++;
		}

		return 0;
    }

	// var copyText = document.querySelector('#tsv2');
	// copyText.focus();
	// //copyText.setSelectionRange(0, 99999); // For mobile devices
	// document.execCommand("paste");
	// // alert(copyText.value);

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
	// var tsv = copyText.value;

	var tsv = document.querySelector('#tsv2').value;
    chrome.scripting.executeScript({
        code: '(' + importData + ')(' + JSON.stringify(tsv) + ');' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
		//alert(results[0]);
		//document.querySelector('#preview').innerHTML = results[0];


		/*
		var area = document.createElement('div');
		area.innerHTML = results[0];
		var table = area.querySelector('table');
		//document.querySelector('#preview').innerHTML = table.outerHTML;

		var data = [];

		

		var rows = table.querySelectorAll('tr.table-dark-row-cp, tr.table-light-row-cp');
		if( rows.length == 0 ) {
			return;
		}
		
		alert(rows.length + ' items copied clipboard.');
		//alert(table.rows.length);
		for (var r = 0, row; row = rows[r]; r++) {
		   //iterate through rows
		   //rows would be accessed using the "row" variable assigned in the for loop
		   var rowData = [];
		   var cols = row.querySelectorAll('td');
		   for (var c = 0; col = cols[c]; c++) {
			 //iterate through columns
			 //columns would be accessed using the "col" variable assigned in the for loop
			 rowData.push(col.innerText);
		   }  
		   data.push(rowData.join('\t'));
		}

		// copy clipboard
		var copyText = document.querySelector('#tsv');
		copyText.value = data.join('\n');

		copyText.select();
		copyText.setSelectionRange(0, 99999); // For mobile devices

		document.execCommand('copy');
		*/
		});
});

document.getElementById("ajax").addEventListener('click', () => {
	var bkg = chrome.extension.getBackgroundPage();
	bkg.console.log('ajax');

	/*
	var investing = {'search_text': 'AAPL'};
	$.ajax({
		url:'https://kr.investing.com/search/service/searchTopBar',
		dataType:'json',
		type: 'POST',
		data: investing,
		success:function(data){
			debug(data);
		}
	});
	*/
});	


function removeAd() {
	//alert("removeAd");
	//You can play with your DOM here or check URL against your regex
	//console.log('Tab script:');
	//console.log(document.body);
	//return document.body.innerHTML;
	//alert(document.querySelector('#screener-content').innerHTML);
	// Seeking Alpha

	//document.querySelector("#content > div > div.d-h.Q-b8.Q-cp.Q-cs > div > article > div > div > div.gu-zG.gu-AH > div")

	/*
	if( document.querySelector('#content') != null ) {
		alert(document.querySelector('#content').outerHTML);
	}
	
	if( document.querySelector('#paywall') != null ) {
		document.querySelector('#paywall').hidden = true;
	}

	var articleSection = document.querySelector("div[data-test-id='article-section']");

	var contentContainer = document.querySelector("div[data-test-id='content-container']");
	
	// origin.setAttribute("data-test-id", "test");

	// origin.setAttribute("data-test-id", "test");
	
	if( document.querySelector("#temporary") == null ) {
		var newDiv = document.createElement('div');
		newDiv.id = "temporary";
		var style = "top: 90px; z-index: 100; width: 1040px; height: 700px; overflow-y:scroll; border: 5px solid yellow; background-color: #EEE; position: absolute;";
		style += "margin-left: " + Math.round((window.innerWidth - 1040)/2) + "px";
		newDiv.style = style;

		// close 버튼 추가
		//newDiv.appendChild("123");
		// 기사 내용 복사
		var clone = articleSection.cloneNode(true);
		newDiv.appendChild(clone);
		document.body.appendChild(newDiv);
	} else {
		document.body.removeChild(document.querySelector('#temporary'));
	}
	*/
	
	
	// return document.querySelector('#paywall').outerHTML;
}

document.getElementById("removeAd").addEventListener('click', () => {
	console.log("Popup DOM fully loaded and parsed");
	removeAd();
    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    /*
	chrome.scripting.executeScript({
		target : {tabId : 111},
        //code: '(' + removeAd + ')();' //argument here is a string but function.toString() returns function's code
		function: removeAd
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
		//alert(results[0]);
		//document.querySelector('#preview').innerHTML = results[0];	
	});
	*/
});