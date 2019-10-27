// barf.JSON("./content/data.json");
// Loads JSON file, creates a script tag with the proper application-Type at end of BODY, and shoots the JSON file content in it

  barf.JSON = (url) => {
  	const json = document.createElement("script");
    json.type  = "application/json",
  	const resJSON = fetch(url, {
  			method: "GET",
  			mode: "cors",
  			cache: "force-cache"
  		})
  		.then(r => r.text())
  		.then(data => json.textContent = data)
  		.then(content => document.getElementsByTagName("body")[0].appendChild(js))
  		.catch(e => console.log(e));
  	return resJSON;
  };
