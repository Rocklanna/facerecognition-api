const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");


const PAT = 'b3fe854df6494e40847c2518274f21e8';
const USER_ID = 'rocklanna';       
const APP_ID = 'my-first-application';
const MODEL_ID = 'face-detection';
const IMAGE_URL = 'y';

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + PAT);



const handleApiCall = (req,res)=>{

   stub.PostModelOutputs(
    {
        user_app_id: {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        model_id: MODEL_ID,
        inputs: [
            { data: { image: { url: req.body.input, allow_duplicate_url: true } } }
        ]
    },
    metadata,
    (err, response) => {
        if (err) {
            throw new Error(err);
        }

        if (response.status.code !== 10000) {
            throw new Error("Post model outputs failed, status: " + response.status.description);
        }

       res.json(response);
    }

);

}

const handleImage = (req,res,db)=>{

	const {id} = req.body;

	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0].entries)
	})
	.catch(err=>res.status(400).json('unable to get entries'))
	}


module.exports ={
	handleImage: handleImage,
	handleApiCall :handleApiCall
}
