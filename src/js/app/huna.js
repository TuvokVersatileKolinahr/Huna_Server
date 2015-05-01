/**
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
 * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 */
(function(){

  if (typeof window.huna === "undefined"){
    window.huna = true;
    // override console.error and log it too
    console = console || {};
    console.oldError = console.error || function(){};
    try{
      console.log("Initializing HunaJS");

      console.error = function(err){
        window.onerror(err);
        console.oldError(err);
      };

      // get old error handler
      var oldErrHandler = window.onerror;
      window.onerror = function(err, script, line, col, cause){
        console.oldError(err, script, line, col, cause);
        // harvest as much information as we need...
        var json = {
          error: err,
          script: script,
          line: line,
          col: col,
          cause: cause,
          navigator: {
            appname: window.navigator.appName,
            appversion: window.navigator.appVersion,
            language: window.navigator.language,
            cpu: window.navigator.oscpu,
            platform: window.navigator.plaform,
            product: window.navigator.product,
            productsub: window.navigator.productSub,
            useragent: window.navigator.userAgent,
            availHeight: window.screen.availHeight,
            availWidth: window.screen.availWidth
          }

          // log original error to console
          //window['console'].error(err);
        };

        var r = new XMLHttpRequest();
        r.onabort = function(e){
          console.log("onabort");
          console.oldError("XHR to HunaJS failed due to abort " + this.status);
          e.preventDefault();
          e.stopPropagation();
          return false;
        };
        r.onerror = function(e){
          console.log("onerror");
          console.oldError("XHR to HunaJS failed " + this.status);
          e.preventDefault();
          e.stopPropagation();
          return false;
        };
        r.ontimeout = function(e){
          console.log("ontimeout");
          console.oldError("XHR to HunaJS failed due to timeout " + this.status);
          e.preventDefault();
          e.stopPropagation();
          return false;
        };
        r.onreadystatechange = function(e) {
          if (this.readyState == 4){
            console.log("XHR succeeded " + this.status);
          }
        };
        r.open('post', 'http://huna.tuvok.nl/interceptor', true);
        r.setRequestHeader('Content-type','application/json; charset=utf-8');
        r.send(JSON.stringify(json)); 
      };

    }catch(err){
      console.info("huna.js failed due to: ");
      if(typeof err === "string") { console.info(err);}else{console.dir(err);}
    }
  }

  return false;

})();