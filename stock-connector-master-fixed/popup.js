var patterns = {
	'finance.yahoo.com': /.*finance.yahoo.com\/quote\/([^\/\?]+)([\/\?].*)?/gi,
	'macrotrends.net': /.*macrotrends.net\/stocks\/charts\/([^\/\?]+)([\/\?].*)?/gi,
	'seekingalpha.com': /.*seekingalpha.com\/symbol\/([^\/\?]+)([\/\?].*)?/gi,
	'morningstar.com': /.*morningstar.com\/stocks\/[^\/\?]+\/([^\/\?]+)([\/\?].*)?/gi,
	'finviz.com': /.*finviz.com\/quote.ashx\?t=([^&]+)(&.*)?/gi,
	'nasdaq.com': /.*nasdaq.com\/market-activity\/stocks\/([^\/\?]+)([\/\?].*)?/gi,
	'digrin.com': /.*digrin.com\/stocks\/detail\/([^\/\?]+)([\/\?].*)?/gi,
	'gurufocus.com': /.*gurufocus.com\/stock\/([^\/\?]+)([\/\?].*)?/gi,
	'dividendinvestor.com': /.*dividendinvestor.com\/dividend-history-detail\/([^\/\?]+)([\/\?].*)?/gi,
	'tipranks.com':	/.*tipranks.com\/stocks\/([^\/\?]+)([\/\?].*)?/gi
}

function debug(s) {
	var d = $('#debug');
	//d.html(d.html() + '\n' + s);
}

function fetchSymbol(url) {
	var symbol = null;

	for(var k in patterns) {
		if (patterns.hasOwnProperty(k)) {
			debug('k:' + k);
			if (url.match(k)) {
				if(url.search(patterns[k]) == -1 ) {
					return null;
				}

				symbol = url.replace(patterns[k], '$1');
				return symbol;
			}
		}
	}

	return null;

	/*
	if (url.match('finance.yahoo.com')) {
		symbol = url.replace(/.*finance.yahoo.com\/quote\/([^\/\?]+)([\/\?].*)?/gi, '$1');
	}
	if (url.match('macrotrends.net')) {
		symbol = url.replace(/.*macrotrends.net\/stocks\/charts\/([^\/\?]+)([\/\?].*)?/gi, '$1');
	}
	if (url.match('seekingalpha.com')) {
		symbol = url.replace(/.*seekingalpha.com\/symbol\/([^\/\?]+)([\/\?].*)?/gi, '$1');
	}
	if (url.match('morningstar.com')) {
		symbol = url.replace(/.*morningstar.com\/stocks\/[^\/\?]+\/([^\/\?]+)([\/\?].*)?/gi, '$1');
	}
	if (url.match('finviz.com')) {
		symbol = url.replace(/.*finviz.com\/quote.ashx\?t=([^&]+)(&.*)?/gi, '$1');
	}
	if (url.match('nasdaq.com')) {
		symbol = url.replace(/.*nasdaq.com\/market-activity\/stocks\/([^\/\?]+)([\/\?].*)?/gi, '$1');
	}
	if (url.match('digrin.com')) {
		symbol = url.replace(/.*digrin.com\/stocks\/detail\/([^\/\?]+)([\/\?].*)?/gi, '$1');
	}
	if (url.match('gurufocus.com')) {
		symbol = url.replace(/.*gurufocus.com\/stock\/([^\/\?]+)([\/\?].*)?/gi, '$1');
	}

	return symbol.toUpperCase();
	*/
}

function makeDisabledAll() {
	$('a').each(function(){
		var $a = $(this);
		$a.addClass('disabled');
	});
}

var tab_title = '';
function display_h1 (results){
  h1 = results;
  //document.querySelector("#id1").innerHTML = "<p>tab title: " + tab_title + "</p><p>dom h1: " + h1 + "</p>";
  alert(results);
}

chrome.tabs.query(
	{ active: true, currentWindow: true },
	function callback(tabs) {
		
		// 초기 설정
		$('#tsv2').hide();
		$('#importPortfolio').hide();
		$('#removeAd').hide();
		

		var url = tabs[0].url;
		if(url.indexOf('finviz.com/screener.ashx') == -1) {
			// TODO: 화이트 리스트로 가능한지 확인
			$('#tsv').hide();
			$('#scrap').hide();

			if(url.indexOf('finviz.com/portfolio.ashx?v=2') > -1) {
				$('#tsv2').show();
				$('#importPortfolio').show();
			} else if(url.indexOf('seekingalpha.com/news') > -1 || url.indexOf('seekingalpha.com/article') > -1) {
				$('#removeAd').show();
			}			
			
		}

		if( typeof url === 'undefined') {
			makeDisabledAll();
			return;
		}

		var symbol = fetchSymbol(url);
		if( symbol == null ) {
			makeDisabledAll();
			return;
		}

		$('a').each(function(){
			var $a = $(this);
			$a.attr(
				'href',
				$a.attr('href').replace(/_XXX_/g, symbol.toUpperCase()).replace(/_xxx_/g, symbol.toLowerCase())
			);
		});

		/*
		chrome.tabs.executeScript(tab.id, {
			code: 'document.querySelector(".snapshot-table2").textContent'
		  }, display_h1);
		*/
	}
);

document.addEventListener('DOMContentLoaded', function () {
	//dumpBookmarks();
  });
