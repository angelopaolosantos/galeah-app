import { Table, Tag, Space, Button } from 'antd';
import { FileAddOutlined } from '@ant-design/icons'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Edit </a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'Room1',
    description: 'Room 1 Description',
    rate: 100,
  },
];

const Page = () => {
    return (
        <div>
            <Button type="primary" shape="round" icon={<FileAddOutlined />}>
          Create New Room
        </Button>
    <Table columns={columns} dataSource={data} />
    </div>
    )
}

export default Page