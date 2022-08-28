search similar motion using sentence bert embedding

Developed by kokhayas in 2022

This is a english debate topic Search system based on sentence similarity https://www.npmjs.com/package/@tensorflow-models/universal-sentence-encoder
It is implemented to run entirely on the client side.
Input sentence is embedded into vectors by using universal sentence autoencoder. Then, cosine similarity is calculated with 9914 motions. 
Top nth motions are shown in order. It can used to find semantically similar sentences. Unlike Tf-idf, tensorflowjs sentence bert model allows to find close sentence and has higher quality. It can grasp contextual meaning of the sentence and embedded into a vector.
original (9914, 512) float32 sentence vectors were more than 100MB, so I used top three digits of each vectors insead and used the same shape(9914, 512). It was compressed into 20MB, which is 6MB in GZIP, which is usable in website.
Users can search for semantically similar motions using ordinary English sentences as input.
9914 motions, including 486 national tournaments and 306 international tournaments
collected by UTDS are being used.
These sites are static web sites and do not collect user information.
Please feel free to use them for any purpose, including educational and research purposes.
Best wishes!

http://resources.tokyodebate.org/debate-motion/tips/

https://utds-motion-search-gather.onrender.com/

https://github.com/kokhayas/sbert_on_server
を用いてjsonデータが用意されている


https://huggingface.co/datasets/kokhayas/english-debate-motions-utds

huggingface上でデータセットとして提供しています
