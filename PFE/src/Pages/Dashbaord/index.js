import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getAdminStatic ,getAnnonce,gettreeannonce} from "../../API";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Link, Navigate, useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [statiques, setStatiques] = useState([]);
  const Navigate=useNavigate()

  useEffect(() => {
    getAdminStatic().then((res)=>{
      setStatiques(res);
    })
  }, []);
  console.log(statiques);

  const handlerdeconecter=()=>{
    localStorage.removeItem('id')
    localStorage.removeItem('token') 
    Navigate('/')
  }

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={1}>Dashboard</Typography.Title>
      <Link to={'/Clients'}>Clients</Link>
      <Link to={`/Annonces`}>Annonce</Link>
      {/* <Link to={`/Dashboard`}>Dashboard</Link> */}
      <button onClick={handlerdeconecter}>de conecter</button>
      
      
      <Space direction="horizontal">
      <DashboardCard
  icon={
    <ShoppingCartOutlined
      style={{
        color: "green",
        backgroundColor: "rgba(0,255,0,0.25)",
        borderRadius: 20,
        fontSize: 24,
        padding: 12,
      }}
    />
  }
  title={"Annonce Disponible"}
  value={statiques.statusdisponible}
/>

        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 12,
              }}
            />
          }
          title={"la sommes des Annonces"}
          value={statiques.annonces}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 12,
              }}
            />
          }
          title={"Nomber Des Users"}
          value={statiques.clients}
        />
        <DashboardCard
          icon={
            <DollarCircleOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 12,
              }}
            />
          }
          title={"Total Prix Des Annonces"}
          value={statiques.prix + " $ "}
        />
      </Space>
      <Space>
        <RecentOrders />
        <DashboardChart />
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    gettreeannonce().then((res) => {
      setDataSource(res);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
      width="400px"
        columns={[
          {
            title: "Title",
            dataIndex: "titre",
          },
          {
            title: "Description",
            dataIndex: "description",
          },
          {
            title: "Statut",
            dataIndex: "statut",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}



function DashboardChart() {
  const [announcementData, setAnnouncementData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getAnnonce().then((res) => {
      const announcementCounts = {};

      // Parse the date and count the number of announcements for each day
      res.forEach((annonce) => {
        const date = new Date(annonce.created_at);
        const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        if (!announcementCounts[day]) {
          announcementCounts[day] = 0;
        }

        announcementCounts[day]++;
      });

      // Convert the counts object to labels and data arrays
      const labels = Object.keys(announcementCounts);
      const data = Object.values(announcementCounts);

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Number of Announcements",
            data,
            backgroundColor: "rgba(255, 0, 0, 0.5)",
          },
        ],
      };

      setAnnouncementData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Number of Announcements per Day",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar options={options} data={announcementData} />
    </Card>
  );
}


export default Dashboard;
