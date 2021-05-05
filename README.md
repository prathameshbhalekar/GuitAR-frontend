# GuitAR

GuitAR is an web app which projects the chords for any song from our wide selection on to user's guitar on their screen so that all they have to do is press the highlighted strings to play the song.


https://user-images.githubusercontent.com/33856767/116863257-ac54bf00-ac23-11eb-897f-896acec13ef7.mp4



## Installation

Before working on frontend you will need to set up the backend. You can use our hosted backend or run your own backend for better performance. If you choose to host your own you can find it [here](https://github.com/prathameshbhalekar/GuitAR-Backend).

### Fork

Create your own copy of the project on GitHub. You can do this by clicking the Fork button  on the top right corner of the landing page of the repository.

### Clone

Note: For this you need to install [git](https://git-scm.com/downloads) on your machine

```bash
$ git clone https://github.com/YOUR_GITHUB_USER_NAME/GuitAR-frontend
```
where YOUR_GITHUB_USER_NAME is your GitHub handle.


### Set Backend Base URL
Note: Skip this step if you are using our backend.

1. Go to `src/Utils/axios.js`
2. Replace baseURL to your own URL.

```javascript
import axios from "axios"

const instance = axios.create({
    baseURL: "YOUR_BACKEND_URL_HERE"
})

export default instance
```
### Run the app

Now you can run GuitAR React application by following the steps below:

1. install dependencies by running the command below

```
$ npm install
```

2. run the app using the command below

```
$ npm start
```

3. go to the browser on http://localhost:3000/

## ScreenShots
![image](https://user-images.githubusercontent.com/33856767/116862600-a3172280-ac22-11eb-8653-3ab70cedb91f.png)
![login](https://user-images.githubusercontent.com/33856767/116862520-81b63680-ac22-11eb-8e26-822bccebcc74.png)
![allsongs](https://user-images.githubusercontent.com/33856767/116862500-79f69200-ac22-11eb-958b-2e2cf8ea5ac1.png)
![setup](https://user-images.githubusercontent.com/33856767/116862531-867aea80-ac22-11eb-8767-9545077b11d7.png)
![Learning Experience](https://user-images.githubusercontent.com/33856767/116862512-7e22af80-ac22-11eb-90b7-06d93e77358e.png)
![settings](https://user-images.githubusercontent.com/33856767/116862528-84b12700-ac22-11eb-8df7-edcefd4f9488.png)



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
The project is licensed under the MIT License. Learn more about it in the [LICENCE](https://github.com/prathameshbhalekar/GuitAR-frontend/blob/main/LICENSE) file.
