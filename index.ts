export async function callElasticSearchLambda(endpoint, method, body?, contentType?){
    //const service = new MyService(client);
    //const elasticURIAddress = await service.papiClient.post("/addons/api/"+ client.AddonUUID + "/installation/getElasticURIAddress");
    //const domain = 'https://' + elasticURIAddress; 
    //const url = domain+'/'+ endpoint;

    const AWS = require("aws-sdk");
    var lambda = new AWS.Lambda();
    let params;
    
    if (body){
        const contentTypeValue = contentType? contentType : "application/json";
        params = {
            FunctionName: 'ElasticSearchLambda', 
            InvocationType: 'RequestResponse',
            Payload: {
                "endpoint":endpoint,
                "method":method,
                "body":body,
                "contentType": contentTypeValue
            }
        };
    }
    else{
        params = {
            FunctionName: 'ElasticSearchLambda', 
            InvocationType: 'RequestResponse',
            Payload: {
                "endpoint":endpoint,
                "method":method
              }
          };
    }

    params.Payload = JSON.stringify(params.Payload);

    console.log("f2 start call f3 lambda ElasticSearchLambda");
    let response = await lambda.invoke(params).promise();
    console.log("f2 end call f3 lambda ElasticSearchLambda");

    if (response.StatusCode==200){
        console.log("lambda invoke response: " + response.Payload);
        return {
            success:true,
            resultObject:JSON.parse(response.Payload)
        };
    }
    else {
        console.log("lambda invoke response: " + response.Payload);
        return {
            success:false,
            errorMessage:JSON.parse(response.Payload)
        };
    }
    
}