import React from "react";
import { Button, Table, Form, Modal, Pagination } from "react-bootstrap";
import Swal from 'sweetalert2';
import { FaSort } from 'react-icons/fa';

class Devs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            id_level: '',
            sexo: '',
            data_nascimento: '',
            idade: '',
            hobby: '',
            searchQuery: '',
            devs: [],
            filteredDevs: [],
            levels: [],
            modalOpened: false,
            currentPage: 1,
            devsPerPage: 10,
            sortBy: 'name',
            sortOrder: 'asc'
        }
    }

    componentDidMount() {
        this.buscarLevels();
    }

    buscarLevels = () => {
        fetch("http://127.0.0.1:8000/api/v1/levels")
            .then(response => response.json())
            .then(response => {
                const levels = response.data.sort((a, b) => a.name.localeCompare(b.name));
                this.setState({ levels }, () => {
                    this.buscarDev();
                });
            })
    }

    buscarDev = () => {
        fetch("http://127.0.0.1:8000/api/v1/devs")
            .then(response => response.json())
            .then(response => {
                const devs = response.data.map(dev => ({
                    ...dev,
                    level_name: this.findLevelName(dev.id_level)
                }));
                devs.sort((a, b) => a.name.localeCompare(b.name));
                this.setState({ devs, filteredDevs: devs });
            })
    }

    findLevelName = (id) => {
        const level = this.state.levels.find(level => level.id === id);
        return level ? level.name : '';
    }

    deletarDev = (id) => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Não, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch("http://127.0.0.1:8000/api/v1/devs/" + id, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            Swal.fire(
                                'Excluído!',
                                'O desenvolvedor foi excluído.',
                                'success'
                            );
                            this.buscarDev();
                        } else {
                            Swal.fire(
                                'Erro!',
                                'Houve um problema ao excluir o desenvolvedor.',
                                'error'
                            );
                        }
                    })
                    .catch(error => {
                        Swal.fire(
                            'Erro!',
                            'Houve um problema ao excluir o desenvolvedor.',
                            'error'
                        );
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelado',
                    'O desenvolvedor está seguro :)',
                    'error'
                );
            }
        });
    };

    editarDev = (id) => {
        fetch("http://127.0.0.1:8000/api/v1/devs/" + id, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    id_level: response.data.id_level,
                    sexo: response.data.sexo,
                    data_nascimento: response.data.data_nascimento,
                    idade: response.data.idade,
                    hobby: response.data.hobby
                });
                this.openModal();
            })
    }

    cadastrarDev = (dev) => {
        fetch("http://127.0.0.1:8000/api/v1/devs",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dev)
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        title: "Sucesso!",
                        text: "O desenvolvedor foi cadastrado com sucesso!",
                        icon: "success"
                    });
                    this.buscarDev();
                } else {
                    alert("Não foi possível adicionar o desenvolvedor!");
                }
            })
    }

    atualizarDev = (dev) => {
        fetch("http://127.0.0.1:8000/api/v1/devs/" + dev.id,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dev)
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        title: "Sucesso!",
                        text: "Os dados foram atualizados com sucesso!",
                        icon: "success"
                    });
                    this.buscarDev();
                } else {
                    alert("Não foi possível editar os dados do desenvolvedor!");
                }
            })
    }

    handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        this.setState({ searchQuery: query }, () => {
            const filteredDevs = this.state.devs.filter(dev =>
                dev.name.toLowerCase().includes(this.state.searchQuery)
            );
            this.setState({ filteredDevs });
        });
    }

    sortColumn = (column) => {
        const { sortBy, sortOrder } = this.state;
    
        if (column === sortBy) {
            this.setState({ sortOrder: sortOrder === 'asc' ? 'desc' : 'asc' });
        } else {
            if (column === 'name') {
                this.setState({ sortBy: column, sortOrder: 'asc' }, () => {
                    this.setState(prevState => ({
                        devs: prevState.devs.sort((a, b) => {
                            if (a.name === b.name) {
                                return sortOrder === 'asc' ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt);
                            }
                            return sortOrder === 'asc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
                        })
                    }));
                });
            } else {
                this.setState({ sortBy: column, sortOrder: 'asc' });
            }
        }
    };
    
    renderTabela() {
        const { filteredDevs, currentPage, devsPerPage, sortBy, sortOrder } = this.state;
        const indexOfLastDev = currentPage * devsPerPage;
        const indexOfFirstDev = indexOfLastDev - devsPerPage;
        let currentDevs = filteredDevs.slice(indexOfFirstDev, indexOfLastDev);

        currentDevs.sort((a, b) => {
            if (sortBy === 'name') {
                return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (sortBy === 'createdAt') {
                return sortOrder === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

        return (
            <div>
                <Form.Group className="mb-3" controlId="searchDevs">
                    <Form.Control type="text" placeholder="Buscar desenvolvedores" value={this.state.searchQuery} onChange={this.handleSearch} />
                </Form.Group>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th onClick={() => this.sortColumn('name')} style={{ cursor: 'pointer' }}>
                                Nome <FaSort />
                            </th>
                            <th>Nível</th>
                            <th style={{ float: "right" }}>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentDevs.map((dev) =>
                                <tr key={dev.id}>
                                    <td>{dev.id}</td>
                                    <td>{dev.name}</td>
                                    <td>{dev.level_name}</td>
                                    <td>
                                        <Button style={{ float: "right" }} variant="primary" onClick={() => this.editarDev(dev.id)}>Editar</Button>
                                        <Button style={{ float: "right", marginRight: "10px" }} variant="danger" onClick={() => this.deletarDev(dev.id)}>Excluir</Button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
                {this.renderPagination()}
            </div>
        )
    }

    renderPagination = () => {
        const { filteredDevs, currentPage, devsPerPage } = this.state;
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredDevs.length / devsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <Pagination>
                <Pagination.First onClick={() => this.setPage(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => this.setPage(currentPage - 1)} disabled={currentPage === 1} />
                {pageNumbers.map(number => (
                    <Pagination.Item key={number} active={number === currentPage} onClick={() => this.setPage(number)}>
                        {number}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => this.setPage(currentPage + 1)} disabled={currentPage === pageNumbers.length} />
                <Pagination.Last onClick={() => this.setPage(pageNumbers.length)} disabled={currentPage === pageNumbers.length} />
            </Pagination>
        );
    }

    setPage = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    }

    updateField = (field) => (e) => {
        this.setState({
            [field]: e.target.value
        });
    }

    submit() {
        if (this.state.id === 0) {
            const dev = {
                name: this.state.name,
                id_level: this.state.id_level,
                sexo: this.state.sexo,
                data_nascimento: this.state.data_nascimento,
                idade: this.state.idade,
                hobby: this.state.hobby
            }
            this.cadastrarDev(dev);
        } else {
            const dev = {
                id: this.state.id,
                name: this.state.name,
                id_level: this.state.id_level,
                sexo: this.state.sexo,
                data_nascimento: this.state.data_nascimento,
                idade: this.state.idade,
                hobby: this.state.hobby
            }
            this.atualizarDev(dev);
        }
        this.handleClose();
    }

    reset = () => {
        this.setState({
            id: 0,
            name: '',
            id_level: '',
            sexo: '',
            data_nascimento: '',
            idade: '',
            hobby: ''
        })
        this.openModal();
    }

    handleClose = () => {
        this.setState({
            modalOpened: false
        })
    }

    openModal = () => {
        this.setState({
            modalOpened: true
        })
    }

    render() {
        return (
            <div className="container">
                <Modal show={this.state.modalOpened} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastro de Desenvolvedores</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" required placeholder="Digite o nome: " value={this.state.name} onChange={this.updateField('name')} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Nível</Form.Label>
                                <Form.Select aria-label="Default select example" value={this.state.id_level} onChange={this.updateField('id_level')}>
                                    <option>Selecione o nível</option>
                                    {this.state.levels.map(level => (
                                        <option key={level.id} value={level.id}>{level.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Sexo</Form.Label>
                                <Form.Select aria-label="Default select example" value={this.state.sexo} onChange={this.updateField('sexo')} required>
                                    <option>Selecione o sexo</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Nascimento</Form.Label>
                                <Form.Control type="date" value={this.state.data_nascimento} onChange={this.updateField('data_nascimento')} required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Idade</Form.Label>
                                <Form.Control type="number" required placeholder="Digite sua idade: " value={this.state.idade} onChange={this.updateField('idade')} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Hobby</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Nos conte seu hobby:" value={this.state.hobby} onChange={this.updateField('hobby')} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="button" onClick={() => { this.submit() }}>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="m-2">
                    <Button variant="primary" type="button" onClick={() => { this.reset() }}>
                        Novo
                    </Button>
                </div>
                {this.renderTabela()}
            </div>
        )
    }
}

export default Devs;
