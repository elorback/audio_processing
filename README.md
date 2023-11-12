# Steps for completing Assignment 2

## Part 1
### 1. Download this git repository make sure you have install docker on your machine

### 2. cd into the parent directory run docker-compose up --build this will create a nginx server running flask along with an audio processing library

### 3. The flask endpoint i have written accepts audio files through a **POST** REQUEST ```localhost:8086/api/file_tempo``` the input name has to be ```my_audio_file```

### 4. Test this endpoint with the postman app you can download here https://www.postman.com/downloads/ 

### 5. If all is well use should see the response 

```
{
    "filename": "641693__theflyfishingfilmmaker__bluesy-violin-repeating-lick.wav",
    "overall_tempo": 97.09181213378906,
    "peak_1": 98.0,
    "peak_2": 92.0
}
```
![alt text](https://github.com/marvinh-csun/assignment_2_Fall2023/blob/main/postman%20example.png)
## Part 2

### 1. Create an app using any framework locally doesnt have to use docker just anything simple local application with a date store that will store the responses by calling the rest endpoint localhost:8086/api/file_tempo

### 2. Create a table view of all the files and store it into a html table

### 3. Create an export function that will export that table into microsoft excel format

### 4. I recommend sheet js for part 2.3 https://sheetjs.com/ up to you what ever tool you choose for the export

# Submission

# Github link to your effort in part 2 calling the rest endpoint and screen shot of the values you stored in your table
