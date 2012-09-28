function AlgorithmsIO_SDK() {
    var debug=true;
    console.log("DEBUG201208181711: ***************** AlgorithmsIO_SDK instantiated");
    var api_url; 
    var api_token;

    this.version = function() {
            return "0.1";
    }

    this.getAPIURL = function() {
        return this.api_url;;
    }
    
    this.setAPIURL = function(url) {
        return this.api_url = url;
    }
    
    this.getToken = function() {
        // Returns the token that was originally used to get the JS SDK
        return this.api_token;
    }
    this.setToken = function(token) {
        // Returns the token that was originally used to get the JS SDK
        return this.api_token = token;
    } 
    this.getDataSource = function(datasource_id) {
        var turl = this.getAPIURL()+'/datasources/'+datasource_id+'?authToken='+this.getToken();
        var sdk = this;
        return $.getJSON(turl).pipe(function(result, status, xhr) {
            $.extend(result, {
                    getData: function(queryparams){
                        var datasetURL;
                        if (typeof queryparams != 'undefined') {
                            // Example limitrows=100
                            datasetURL = sdk.getAPIURL()+'/dataset/'+datasource_id+'?authToken='+sdk.getToken()+'&'+jQuery.param(queryparams);
                        } else {
                            datasetURL = sdk.getAPIURL()+'/dataset/'+datasource_id+'?authToken='+sdk.getToken();
                        }
                        return $.getJSON(datasetURL);
                        //alert("ERROR201208181626: getData method is not currently implemented");
                    },                    
                }
            );
            return result;
        });
    };
        
    this.saveDataSource = function(datasource_id, data) {
        this.debug("DEBUG201208211731: Saving Data Source "+datasource_id);
        this.debug(data);

        var myAjaxError = function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
          alert("ERROR"+errorThrown);
        };

        return $.ajax({
            type:       'POST',
            dataType:   'json',
            //crossDomain:  true,
            //url:        "flows/?authToken=&ts="+(0+new Date().getTime()),
            url:        this.getAPIURL()+'/datasources/'+datasource_id+'?authToken='+this.getToken(),
            //headers:    {"authToken": ""},
            //success:    myAjaxSuccess,
            //error:      myAjaxError,
            data:       {
                            api_version:  "0.1",
                            api_call: JSON.stringify(data)
                        },
        });
    };
        
    this.getAlgorithm = function(algorithm_id) {
        var turl = this.getAPIURL()+'/algorithms/'+algorithm_id+'?authToken='+this.getToken();
        return $.getJSON(turl).pipe(function(result) {
            $.extend(result, {
                    getSourceCode: function(){
                        alert("ERROR201208181627: getSourceCode method is not currently implemented");
                    },                    
                }
            );
            return result;
        });
    };    
    
    this.saveAlgorithm = function(algorithm_id, data) {
            if(!algorithm_id) {
                algorithm_id = "";
            }
            this.debug("DEBUG201208211731: Saving Algorithm "+algorithm_id);
            this.debug(data);
            
            var myAjaxError = function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR);
              console.log(textStatus);
              console.log(errorThrown);
              alert("ERROR201209031916: "+errorThrown+" || "+jqXHR["responseText"]);
            };
            
            return $.ajax({
                type:       'POST',
                dataType:   'json',
                //crossDomain:  true,
                //url:        "flows/?authToken=&ts="+(0+new Date().getTime()),
                url:        this.getAPIURL()+'/algorithms/'+algorithm_id+'?authToken='+this.getToken(),
                //headers:    {"authToken": ""},
                //success:    myAjaxSuccess,
                error:      myAjaxError,
                data:       {
                                api_version:  "0.1",
                                api_call: JSON.stringify(data)
                            },
            });
    };

    this.getVisualization = function(visualization_id) {
        var turl = this.getAPIURL()+'/visualizations/'+visualization_id+'?authToken='+this.getToken();
        return $.getJSON(turl).pipe(function(result) {
            $.extend(result, {
                    getSourceCode: function(){
                        alert("ERROR201209041628: getSourceCode method is not currently implemented");
                    },                    
                }
            );
            return result;
        });
    };    
    
    this.saveVisualization = function(visualization_id, data) {
            if(!visualization_id) {
                visualization_id = "";
            }
            this.debug("DEBUG201209041629: Saving visualization "+visualization_id);
            this.debug(data);
            
            var myAjaxError = function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR);
              console.log(textStatus);
              console.log(errorThrown);
              alert("ERROR201209041630: "+errorThrown+" || "+jqXHR["responseText"]);
            };
            
            return $.ajax({
                type:       'POST',
                dataType:   'json',
                //crossDomain:  true,
                //url:        "flows/?authToken=&ts="+(0+new Date().getTime()),
                url:        this.getAPIURL()+'/visualizations/'+visualization_id+'?authToken='+this.getToken(),
                //headers:    {"authToken": ""},
                //success:    myAjaxSuccess,
                error:      myAjaxError,
                data:       {
                                api_version:  "0.1",
                                api_call: JSON.stringify(data)
                            },
            })
    };

    this.saveJob = function(job_id, data) {
            // We are almost always creating a new job
            if(!job_id) {
                job_id = "";
            }
            this.debug("DEBUG201209091616: Saving Job");
            this.debug(data);
            
            var myAjaxError = function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR);
              console.log(textStatus);
              console.log(errorThrown);
              alert("ERROR201209091617: "+errorThrown+" || "+jqXHR["responseText"]);
            };
            
            return $.ajax({
                type:       'POST',
                dataType:   'json',
                url:        this.getAPIURL()+'/jobs/'+job_id+'?authToken='+this.getToken(),
                error:      myAjaxError,
                data:       {
                                api_version:  "0.1",
                                api_call: JSON.stringify(data)
                            },
            });
    };

    this.debug = function(text) {
        console.log(text);
    }
} 
