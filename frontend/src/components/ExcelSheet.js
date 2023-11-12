import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';

function ExcelSheet() {
  const [data, setData] = useState([]);
  const [file_name, setFileName] = useState(null);

  const handleUpload = async () => {
    if (file_name !== null) {
      const inputData = new FormData();
      inputData.append('my_audio_file', file_name);
  
      try {
        const response = await fetch('http://localhost:8086/api/file_tempo', {
          method: 'POST',
          body: inputData,
        });
  
        if (!response.ok) {
          throw new Error('Could not post data');
        }
  console.log(inputData)
        const dataOutput = await response.json(); // Use await to get the JSON data
        setData([...data, dataOutput]);
      } catch (err) {
        console.error(err);
      }
    }
  };


  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Adjust the height as needed
      }}
    >
      <Card style={{ height: '300px', width: '250px', padding: '5px' }}>
        <Card.Title>Add Data To the ExcelSheet</Card.Title>
        <Card.Header>This is the header</Card.Header>
        <Card.Body>
          Please Upload a File
          <input type='file' onChange={handleFileChange} accept='.wav'></input>
          <Button style={{ marginTop: '5px', padding: '5px' }} onClick={handleUpload}>
            Upload
          </Button>
        </Card.Body>
      </Card>
      <div>
  {data.map((_data, index) => (
    <Card key={index}>
      <Card.Body>
        filename: {_data.filename}<br/>
        overall_tempo: {_data.overall_tempo}<br/>
        peak_1: {_data.peak_1}<br/>
        peak_2: {_data.peak_2}<br/>
      </Card.Body>
    </Card>
  ))}
</div>

    </div>
  );
}

export default ExcelSheet;
