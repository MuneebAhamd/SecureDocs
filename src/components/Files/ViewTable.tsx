// import React from "react";
// import { Table } from "antd";
// import type { TableRowSelection } from "antd/es/table/interface";
// import checked from "../../assets/checked.png";
// import cross from "../../assets/cross.png";
// import { BsFillPersonFill } from "react-icons/bs";
// import data from "./data.json";
// import { useState } from "react";
// import { useParams } from "react-router-dom";

// const columnsdata = [
//   {
//     title: "File Name",
//     dataIndex: "fileName",
//   },
//   {
//     title: "File Size",
//     dataIndex: "fileSize",
//   },
//   {
//     title: "DateUploaded",
//     dataIndex: "dateUploaded",
//   },

//   {
//     title: "Status",
//     dataIndex: "status",
//     render: (status: any) => {
//       return status == true ? (
//         <img src={checked} className="headerLogo" alt="downloaded" />
//       ) : (
//         <img src={cross} className="headerLogo" alt="not downloaded" />
//       );
//     },
//   },

//   {
//     title: "Uploaded by",
//     dataIndex: "address",
//     render: () => {
//       return (
//         <div className="uploadedByDiv">
//           <h3 className="iconBg">
//             <BsFillPersonFill className="iconProfile" />
//           </h3>
//           <div>
//             <p className="tfname">Luana siren</p>
//             <p className="tsname">luanasiren@email.com</p>
//           </div>
//         </div>
//       );
//     },
//   },
//   {
//     key: "-",
//     dataIndex: "download",
//     render: () => {
//       return <button className="buttonTable">Download</button>;
//     },
//   },
// ];

// const ViewTable: React.FC = () => {
//   const params = useParams();
//   const type = params["type"];
//   console.log("type==>", type);

//   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

//   const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
//     console.log("selectedRowKeys changed: ", newSelectedRowKeys);
//     setSelectedRowKeys(newSelectedRowKeys);
//   };

//   const rowSelection: TableRowSelection<any> = {
//     selectedRowKeys,
//     onChange: onSelectChange,
//   };

//   return (
//     <Table
//       className="files-table"
//       pagination={false}
//       bordered={true}
//       rowSelection={rowSelection}
//       columns={columnsdata}
//       dataSource={
//         type === "tempered"
//           ? data.filter((el) => el.status === false)
//           : type === "verified"
//           ? data.filter((el) => el.status === true)
//           : data
//       }
//     />
//   );
// };

// export default ViewTable;

import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import checked from "../../assets/checked.png";
import cross from "../../assets/cross.png";
import { BsFillPersonFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";

interface FileData {
  fileName: string;
  fileSize: number;
  created_at: string;
  file_hash: string;
  tempered: boolean;
  wallet: string;
  download: string;
}

const ViewTable: React.FC = () => {
  //@ts-ignore
  const params: { type: string } = useParams();
  const type = params.type;

  const [data, setData] = useState<FileData[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://192.168.3.138:8000/api/files/");
      setData(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const downloadFile = (url: string, filename: string) => {
    axios({
      url,
      method: "GET",
      responseType: "blob", // Set the response type to 'blob'
    })
      .then((response) => {
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data])
        );
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.log("Error downloading file:", error);
      });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<FileData> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columnsdata = [
    {
      title: "File Name",
      dataIndex: "filename",
    },
    {
      title: "Date Uploaded",
      dataIndex: "created_at",
    },
    {
      title: "File Hash",
      dataIndex: "file_hash",
    },
    {
      title: "Status",
      dataIndex: "tempered",
      render: (status: boolean) => {
        return status ? (
          <img src={cross} className="headerLogo" alt="not downloaded" />
        ) : (
          <img src={checked} className="headerLogo" alt=" downloaded" />
        );
      },
    },
    {
      title: "Uploaded by",
      dataIndex: "wallet",
      render: (wallet: string) => {
        return (
          <div className="uploadedByDiv">
            <h3 className="iconBg">
              <BsFillPersonFill className="iconProfile" />
            </h3>
            <div>
              <p className="tfname">Luana Siren</p>
              {/* <p className="tsname">{wallet}</p> */}
            </div>
          </div>
        );
      },
    },
    {
      key: "download",
      dataIndex: "file_hash",
      render: (fileHash: string, record: FileData) => {
        return (
          <button
            className="buttonTable"
            onClick={() =>
              //@ts-ignore
              downloadFile(`https://ipfs.io/ipfs/${fileHash}`, record.filename)
            }
          >
            Download
          </button>
        );
      },
    },
  ];

  return (
    <Table
      className="files-table"
      pagination={false}
      bordered={true}
      rowSelection={rowSelection}
      columns={columnsdata}
      dataSource={
        type === "tempered"
          ? data.filter((el) => el.tempered)
          : type === "verified"
          ? data.filter((el) => !el.tempered)
          : data
      }
    />
  );
};

export default ViewTable;
