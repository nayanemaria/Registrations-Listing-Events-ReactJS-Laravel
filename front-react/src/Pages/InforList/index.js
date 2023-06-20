import { SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Row, Col, Button, Input, Space, Table, Typography, Popconfirm } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import ModalComponent from '../../Components/ModalComponent';
import { ServiceUser } from '../../Services/serviceUser';
import {ServiceEvents} from '../../Services/serviceEvents';

export default function InforList(){
  const { Title } = Typography;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [paginationTable, setPaginationTable] = useState({
    current: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    showSizeChanger: true
});
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  const [eventsList, setEventsList] = useState([]);

  const searchInput = useRef(null);

  const [data, setData] = useState([]);

    useEffect(() => {
      getData();
      getEvents();
    }, []);
  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Procurar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Procurar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Apagar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Fechar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  let columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      ...getColumnSearchProps('nome'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
      ...getColumnSearchProps('cpf'),
    },
    {
      title: 'Evento',
      dataIndex: 'nome_evento',
      key: 'nome_evento',
      ...getColumnSearchProps('evento'),
    },
    {
      title: 'Ações',
      dataIndex: '',
      key: 'x',
      render: (text, record) =>{
          return(
            <Row className="buttons-actions">
            {renderUpdate(record)}
            {renderDelete(record)}
            </Row>
          )
      }
    },
  ];

  function getData(){
      ServiceUser.getAll().then((data)=>setData(data));
  }

        
    function renderUpdate(record){
      function onClickEdit(){
        setUserEdit({...record})
        setOpenModalEdit(true)
      }
      
      return(
        <>
          <Button
            style={{border: 'none', color: '#277FF2', marginRight: '5px'}}
            icon={<EditOutlined />}
            onClick={onClickEdit}
          >
          </Button>
        </>
      )
    }

  function renderDelete(record){
    function dlt(){
      ServiceUser.delete(record.id).then((data)=>setData(data));
    }

    return(
      <>
          <Popconfirm
            title="Deletar inscrição"
            description="Tem certeza de que deseja deletar esta inscrição?"
            onConfirm={dlt}
            okText="Sim"
            cancelText="Cancelar"
          >
            <Button
              style={{border: 'none'}}
              icon={<DeleteOutlined />}
              danger
            >
            </Button>
          </Popconfirm>
      </>
    )
  }

  function onChangePagination(pagination, filters, sorter){
    paginationTable.current = pagination.current
    paginationTable.pageSize = pagination.pageSize
    setPaginationTable(paginationTable)
  }
  
  function getEvents() {
    ServiceEvents.getAll().then((events) => {
      setEventsList(events);
    });
  }

  return (
    <Row className="row">
      <Col className="gutter-row" sm={24} md={24} lg={24}>
        <Typography>
          <Title className="title">Lista de Inscritos</Title>
        </Typography>
        <Table columns={columns} dataSource={data} onChange={onChangePagination} pagination={paginationTable}/>
      </Col>
      <ModalComponent getData={getData} open={openModalEdit} setOpen={setOpenModalEdit} userEdit={userEdit} eventsList={eventsList}/>
    </Row>
  );
};
