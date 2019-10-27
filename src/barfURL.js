// barf.URL(); get URL Query Parameters
// https://example.com?item='album'&artist='favBand'
// barf.URL('item'); > will provide the 'album' value
// barf.URL('artist'); > will provide the 'favBand' value
// setting the barf.URL function this particular way prevents overwiting the default 'barf();' 

barf = {
	URL: (item) => {
		let svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
		return svalue ? svalue[1] : svalue;
	}
};
