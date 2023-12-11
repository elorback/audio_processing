import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Table } from 'react-bootstrap';
import * as XLSX from 'xlsx';

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
  
        const dataOutput = await response.json();
        setData([...data, dataOutput]);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    XLSX.writeFile(workbook, 'excel_sheet.xlsx');
  };

  const renderTableHeader = () => {
    if (data.length === 0) return null;

    return Object.keys(data[0]).map((key, index) => (
      <th key={index}>{key}</th>
    ));
  };

  const renderTableBody = () => {
    if (data.length === 0) return null;

    return data.map((item, index) => (
      <tr key={index}>
        {Object.values(item).map((value, subIndex) => (
          <td key={subIndex}>{value}</td>
        ))}
      </tr>
    ));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
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
        {data.length !== 0 && (
          <Card.Footer>
            <Button onClick={exportToExcel}>Export to Excel</Button>
          </Card.Footer>
        )}
      </Card>
      <br/>
      <div>
        <br/>
        {data.length !== 0 && (
          <Table responsive>
            <thead>
              <tr>
                {renderTableHeader()}
                
              </tr>
            </thead>
            <tbody>
         {renderTableBody()}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default ExcelSheet;
