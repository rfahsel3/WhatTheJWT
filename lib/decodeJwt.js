exports.decode = function (encodedJwt) {
  var atob = require("atob");
  var jwtComponents = encodedJwt.split(".");
  var componentCount = jwtComponents.length;
  if (componentCount != 3) {
    return "Not a valid JWT";
  }
  
  var firstComponentAsJwt = jwtComponents[0];
  var secondComponentAsJwt = jwtComponents[1];
  
  var firstComponentUnformatted = JSON.parse(atob(firstComponentAsJwt));
  var secondComponentUnformatted = JSON.parse(atob(secondComponentAsJwt));
  
  var printJwtComponent = function(jwtComponent) {
    var formattedJwt = "{ \r\n";
    var jwtKeys = Object.keys(jwtComponent);
    for (var i = 0; i < jwtKeys.length; i ++) {
      formattedJwt = formattedJwt + "\t" + jwtKeys[i] + " : " + jwtComponent[jwtKeys[i]] + "\r\n";
    }
    formattedJwt += "}";
    
    return formattedJwt;
  };
  
  return printJwtComponent(firstComponentUnformatted) 
    + ",\r\n" 
    + printJwtComponent(secondComponentUnformatted);
}
